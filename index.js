// ---- Data ----
const orders = [
  { name: "Laptop",       price: 800000, qty: 2, status: "Pending",   inStock: true  },
  { name: "Desk Chair",   price: 100000, qty: 3, status: "Delivered", inStock: false },
  { name: "Monitor",      price: 250000, qty: 1, status: "Shipped",   inStock: true  },
  { name: "Phone",        price: 600000, qty: 2, status: "Shipped",   inStock: true  },
  { name: "Printer",      price: 300000, qty: 1, status: "Pending",   inStock: true  },
  { name: "Tablet",       price: 450000, qty: 2, status: "Delivered", inStock: true  },
  { name: "Headphones",   price: 80000,  qty: 3, status: "Delivered", inStock: true  },
  { name: "Webcam",       price: 60000,  qty: 2, status: "Pending",   inStock: false },
  { name: "Desk",         price: 150000, qty: 2, status: "Shipped",   inStock: true  },
  { name: "Router",       price: 90000,  qty: 2, status: "Delivered", inStock: true  },
  { name: "Keyboard",     price: 50000,  qty: 4, status: "Delivered", inStock: true  },
  { name: "External SSD", price: 85000,  qty: 4, status: "Pending",   inStock: true  }
];

// ---- Helpers ----
const $ = id => document.getElementById(id);
const rwf = n => Math.round(n).toLocaleString("en-US") + " RWF";
const escapeHtml = s => s.replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---- Summary cards (always based on all orders) ----
function renderStats() {
  const revenue = orders.reduce((sum, o) => sum + o.price * o.qty, 0);
  const pending = orders.filter(o => o.status === "Pending").length;
  $("revenue").textContent = rwf(revenue);
  $("pending").textContent = pending;
  $("average").textContent = rwf(orders.length ? revenue / orders.length : 0);
}

// ---- Table (respects search, status and stock filters) ----
function renderTable() {
  const term = $("search").value.trim().toLowerCase();
  const status = $("status").value;
  const outOnly = $("outOnly").checked;

  const visible = orders.filter(o =>
    o.name.toLowerCase().includes(term) &&
    (status === "all" || o.status === status) &&
    (!outOnly || !o.inStock)
  );

  $("count").textContent = `Showing ${visible.length} of ${orders.length} orders`;

  $("rows").innerHTML = visible.length
    ? visible.map(o => `
      <tr>
        <td class="name">${escapeHtml(o.name)}</td>
        <td>${rwf(o.price)}</td>
        <td>${o.qty}</td>
        <td>${rwf(o.price * o.qty)}</td>
        <td><span class="badge ${o.status}">${o.status}</span></td>
        <td class="${o.inStock ? "" : "out"}">${o.inStock ? "In stock" : "Out of stock"}</td>
      </tr>`).join("")
    : `<tr><td colspan="6" class="empty">No orders match your filters. Clear the search or change the status.</td></tr>`;
}

// ---- Add order ----
function addOrder() {
  const name = $("name").value.trim();
  const price = Number($("price").value);
  const qty = parseInt($("qty").value, 10);

  if (!name || !(price > 0) || !(qty > 0)) {
    alert("Enter a product name, a unit price above 0, and a quantity of at least 1.");
    return;
  }

  orders.unshift({ name, price, qty, status: "Pending", inStock: true });
  $("name").value = $("price").value = $("qty").value = "";
  $("name").focus();
  renderStats();
  renderTable();
}

// ---- Events ----
$("addBtn").addEventListener("click", addOrder);
["name", "price", "qty"].forEach(id =>
  $(id).addEventListener("keydown", e => { if (e.key === "Enter") addOrder(); }));
$("search").addEventListener("input", renderTable);
$("status").addEventListener("change", renderTable);
$("outOnly").addEventListener("change", renderTable);

renderStats();
renderTable();
