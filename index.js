// ============ DATA ============
// Login users: their own array, separate from the orders.
const users = [
  { email: "user@gmail.com", password: "123456" },
  { email: "manager@store.rw", password: "manager123" },
  { email: "cashier@store.rw", password: "cashier123" }
];

// Single source of truth: everything on the dashboard is built from this array.
const orders = [
  { product: "Laptop",              price: 800000, quantity: 2,  status: "Pending",   inStock: true  },
  { product: "Desk Chair",          price: 100000, quantity: 3,  status: "Delivered", inStock: false },
  { product: "Monitor",             price: 250000, quantity: 1,  status: "Shipped",   inStock: true  },
  { product: "Wireless Mouse",      price: 15000,  quantity: 10, status: "Delivered", inStock: true  },
  { product: "Mechanical Keyboard", price: 60000,  quantity: 4,  status: "Pending",   inStock: false },
  { product: "Office Desk",         price: 180000, quantity: 2,  status: "Shipped",   inStock: true  },
  { product: "Printer",             price: 220000, quantity: 1,  status: "Cancelled", inStock: true  },
  { product: "Smartphone",          price: 450000, quantity: 3,  status: "Pending",   inStock: true  },
  { product: "USB Flash Drive",     price: 8000,   quantity: 25, status: "Delivered", inStock: true  },
  { product: "Desk Lamp",           price: 25000,  quantity: 6,  status: "Shipped",   inStock: false },
  { product: "Tablet",              price: 380000, quantity: 2,  status: "Cancelled", inStock: false },
  { product: "Headphones",          price: 70000,  quantity: 5,  status: "Pending",   inStock: true  }
];

const statusStyles = {
  Pending: "bg-amber-100 text-amber-800",
  Shipped: "bg-sky-100 text-sky-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-stone-200 text-stone-700"
};

// ============ ELEMENTS ============
const loginView = document.querySelector("#login-view");
const dashboardView = document.querySelector("#dashboard-view");
const loginForm = document.querySelector("#loginForm");
const errorMessage = document.querySelector("#errorMessage");

const searchInput = document.querySelector("#search");
const statusSelect = document.querySelector("#status");
const outOfStockBox = document.querySelector("#outOfStock");
const list = document.querySelector("#list");
const resultCount = document.querySelector("#resultCount");
const orderForm = document.querySelector("#order-form");

// ============ LOGIN ============
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  // find() returns the first user whose email AND password both match, or undefined
  const match = users.find(function (user) {
    return user.email === email && user.password === password;
  });

  if (match) {
    errorMessage.textContent = "";
    loginForm.reset();
    loginView.classList.add("hidden");
    dashboardView.classList.remove("hidden");
    showOrders();
  } else {
    errorMessage.classList.add("text-red-500");
    errorMessage.textContent = "Incorrect email or password, please try again.";
  }
});

// ============ STATISTICS ============
function formatRWF(amount) {
  return Math.round(amount).toLocaleString("en-US") + " RWF";
}

function showStats() {
  const totalRevenue = orders.reduce(function (sum, order) {
    return sum + order.price * order.quantity;
  }, 0);

  const pendingCount = orders.reduce(function (count, order) {
    return order.status === "Pending" ? count + 1 : count;
  }, 0);

  const averageValue = orders.length === 0 ? 0 : totalRevenue / orders.length;

  document.querySelector("#stat-revenue").textContent = formatRWF(totalRevenue);
  document.querySelector("#stat-pending").textContent = pendingCount;
  document.querySelector("#stat-average").textContent = formatRWF(averageValue);
}

// ============ FILTERS + SEARCH ============
function getVisibleOrders() {
  const selectedStatus = statusSelect.value;
  const onlyOutOfStock = outOfStockBox.checked;
  const searchText = searchInput.value.trim().toLowerCase();

  return orders.filter(function (order) {
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;
    const matchesStock = !onlyOutOfStock || !order.inStock;
    const matchesSearch = order.product.toLowerCase().includes(searchText);
    return matchesStatus && matchesStock && matchesSearch;
  });
}

// ============ SHOW THE ORDERS ============
function showOrders() {
  const visibleOrders = getVisibleOrders();
  list.innerHTML = "";

  if (visibleOrders.length === 0) {
    list.innerHTML =
      '<tr><td colspan="6" class="px-4 py-6 text-center text-stone-600">No orders match your search or filters.</td></tr>';
  }

  visibleOrders.forEach(function (order) {
    const row = document.createElement("tr");
    row.className = "border-t border-stone-200";

    // textContent so typed text can never be treated as HTML
    const nameCell = document.createElement("td");
    nameCell.className = "px-4 py-3 font-medium";
    nameCell.textContent = order.product;
    row.appendChild(nameCell);

    const stockLabel = order.inStock
      ? '<span class="text-stone-700">In stock</span>'
      : '<span class="font-medium text-red-700">Out of stock</span>';

    row.insertAdjacentHTML("beforeend", `
      <td class="px-4 py-3">${formatRWF(order.price)}</td>
      <td class="px-4 py-3">${order.quantity}</td>
      <td class="px-4 py-3">${formatRWF(order.price * order.quantity)}</td>
      <td class="px-4 py-3">
        <span class="rounded-full px-2 py-1 text-xs font-medium ${statusStyles[order.status]}">${order.status}</span>
      </td>
      <td class="px-4 py-3">${stockLabel}</td>
    `);

    list.appendChild(row);
  });

  resultCount.textContent = `Showing ${visibleOrders.length} of ${orders.length} orders`;
  showStats();
}

searchInput.addEventListener("input", showOrders);
statusSelect.addEventListener("change", showOrders);
outOfStockBox.addEventListener("change", showOrders);

// ============ ADD ORDER FORM ============
orderForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const productName = document.querySelector("#product-name").value.trim();
  const unitPrice = document.querySelector("#unit-price").value.trim();
  const quantityText = document.querySelector("#quantity").value.trim();

  if (productName === "") {
    alert("Enter product name");
    return;
  }
  if (unitPrice === "") {
    alert("Enter price");
    return;
  }
  if (quantityText === "") {
    alert("Enter quantity");
    return;
  }

  // Inputs give back text, so convert to real numbers before using them
  const price = Number(unitPrice);
  const quantity = Number(quantityText);

  if (isNaN(price) || price <= 0) {
    alert("Price must be greater than 0");
    return;
  }
  if (isNaN(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
    alert("Quantity must be a whole number greater than 0");
    return;
  }

  orders.push({
    product: productName,
    price: price,
    quantity: quantity,
    status: "Pending",
    inStock: true
  });

  orderForm.reset();
  showOrders();
});

// const loginForm = document.querySelector("#loginForm");
// const errorMessage = document.querySelector("#errorMessage");
// loginForm.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const loginView = document.querySelector("#login-view");
//     const dashboardView = document.querySelector("#dashboard-view");

//     const email = document.querySelector("#email").value;
//     const password = document.querySelector("#password").value;

//     if (email === "user@gmail.com" && password === "123456") {
//         errorMessage.classList.remove("text-red-500");
//         errorMessage.classList.add("text-green-500");
//         errorMessage.textContent = "Login successfull";
//     } else {
//         errorMessage.classList.remove("text-green-500");
//         errorMessage.classList.add("text-red-500");
//         errorMessage.textContent = "Incorrect email or password, Please try again";
//     }
// });

// if (match) {
//     errorMessage.textContent = "";
//     loginForm.reset();
//     loginView.classList.add("hidden");           
//     dashboardView.classList.remove("hidden");    
//     showOrders();                               
// } else {
//     errorMessage.classList.add("text-red-500");
//     errorMessage.textContent = "Incorrect email or password, please try again.";
// }
// // order form

// const form = document.getElementById("order-form");
// form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const productName = document.getElementById("product-name").value;
//     const unitPrice = document.getElementById("unit-price").value;
//     const quantity = document.getElementById("quantity").value;

//     if (productName === "") {
//         alert("Enter Product name");
//         return;
//     }

//     if (unitPrice === "") {
//         alert("Enter price");
//         return;
//     }

//     if (quantity === "") {
//         alert("Enter quantity");
//         return;
//     }

//     const price = Number(unitPrice);
//     const quantityy = Number(quantity);

//     if (price <= 0) {
//         alert("Price must be greater than 0");
//         return;
//     }

//     if (quantityy <= 0) {
//         alert("Quantity must be greater than 0");
//         return;
//     }

//     const newOrder = {
//         productName: productName,
//         price: unitPrice,
//         quantityy: quantity,
//         status: "Pending",
//         inStock: true
//     };
//     orders.push(newOrder);

// });

