// Sample orders
const orders = [
  { product: "Laptop", price: 800000, quantity: 2, status: "Pending", inStock: true },
  { product: "Desk Chair", price: 100000, quantity: 3, status: "Delivered", inStock: false },
  { product: "Mouse", price: 15000, quantity: 10, status: "Shipped", inStock: true },
  { product: "Keyboard", price: 60000, quantity: 4, status: "Pending", inStock: false },
  { product: "Monitor", price: 250000, quantity: 2, status: "Delivered", inStock: true },
  { product: "USB Hub", price: 30000, quantity: 6, status: "Cancelled", inStock: true },
  { product: "Standing Desk", price: 450000, quantity: 1, status: "Shipped", inStock: false },
  { product: "Webcam", price: 45000, quantity: 5, status: "Pending", inStock: true },
  { product: "Headphones", price: 180000, quantity: 3, status: "Delivered", inStock: true },
  { product: "Office Lamp", price: 25000, quantity: 8, status: "Cancelled", inStock: false },
  { product: "Laptop Stand", price: 35000, quantity: 7, status: "Shipped", inStock: true },
  { product: "Printer", price: 320000, quantity: 1, status: "Delivered", inStock: true }
];

// Show only the orders that match ALL the filters
function showOrders() {
  const search = document.getElementById("search").value.toLowerCase();
  const status = document.getElementById("status").value;
  const onlyOutOfStock = document.getElementById("outOfStock").checked;

  const result = orders.filter(o => {
    const matchSearch = o.product.toLowerCase().includes(search);
    const matchStatus = status === "All Statuses" || o.status === status;
    const matchStock = !onlyOutOfStock || o.inStock === false;
    return matchSearch && matchStatus && matchStock;
  });

  let html = "";
  result.forEach(o => {
    html += `<tr class="border-t">
      <td class="p-2">${o.product}</td>
      <td class="p-2">${o.price}</td>
      <td class="p-2">${o.quantity}</td>
      <td class="p-2">${o.status}</td>
      <td class="p-2">${o.inStock ? "In stock" : "Out of stock"}</td>
    </tr>`;
  });

  document.getElementById("list").innerHTML = html;
}

// Show the table as soon as the page opens
showOrders();