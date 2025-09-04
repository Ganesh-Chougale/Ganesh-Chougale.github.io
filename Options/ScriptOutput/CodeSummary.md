SubPages\NBT\NBT.css:
```css
details summary {
cursor: pointer;
padding: 0.5rem;
background: #f8f9fa;
border: 1px solid #dee2e6;
border-radius: 5px;
}
details[open] summary {
background: #e9ecef;
font-weight: bold;
}
form input, form textarea {
max-width: 500px;
}
```

SubPages\NBT\NBT.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Newspaper Business Tracker</title>
<script>
fetch('../../Assets/Utils/cdn.html')
.then(r => r.text())
.then(d => document.head.insertAdjacentHTML('beforeend', d));
</script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>
<link rel="stylesheet" href="NBT.css" />
</head>
<body class="container my-5">
<h2 class="text-center mb-4">📰 Newspaper Business Tracker</h2>
<details class="mb-3">
<summary class="h5">Billing</summary>
<form id="billingForm" class="mt-3">
<div class="input-group mb-2">
<select class="form-select selectpicker" data-live-search="true" multiple id="billingCustomer" name="customer[]">
</select>
<button class="btn btn-outline-secondary" type="button" id="addBillingCustomer">+ New Customer</button>
</div>
<div class="input-group mb-2">
<input type="date" class="form-control" name="date" id="billingDate" required>
<button class="btn btn-outline-secondary" type="button" onclick="document.getElementById('billingDate').value = new Date().toISOString().split('T')[0]">📅 Today</button>
</div>
<input type="number" class="form-control mb-2" name="amount" placeholder="Amount Paid" required>
<input type="number" class="form-control mb-2" name="advance" placeholder="Advance (if any)">
<textarea class="form-control mb-2" name="description" rows="2" placeholder="Description / Notes"></textarea>
<button class="btn btn-primary">Save Billing</button>
</form>
<div class="mt-3">
<button class="btn btn-sm btn-outline-primary" id="refreshBilling">🔄 Refresh Records</button>
<table class="table table-sm table-striped mt-2" id="billingTable">
<thead><tr><th>Customer</th><th>Date</th><th>Amount</th><th>Advance</th><th>Description</th></tr></thead>
<tbody></tbody>
</table>
</div>
</details>
<details class="mb-3">
<summary class="h5">Retail Sell</summary>
<form id="retailForm" class="mt-3">
<div class="input-group mb-2">
<select class="form-select selectpicker" data-live-search="true" multiple id="retailCustomer" name="customer[]">
</select>
<button class="btn btn-outline-secondary" type="button" id="addRetailCustomer">+ New Customer</button>
</div>
<div class="input-group mb-2">
<input type="date" class="form-control" name="date" id="retailDate" required>
<button class="btn btn-outline-secondary" type="button" onclick="document.getElementById('retailDate').value = new Date().toISOString().split('T')[0]">📅 Today</button>
</div>
<input type="number" class="form-control mb-2" name="amount" placeholder="Total Amount" required>
<input type="number" class="form-control mb-2" name="paid" placeholder="Paid Amount" required>
<input type="number" class="form-control mb-2" name="remaining" placeholder="Remaining" readonly>
<textarea class="form-control mb-2" name="description" rows="2" placeholder="Description / Notes"></textarea>
<button class="btn btn-success">Save Retail</button>
</form>
<div class="mt-3">
<button class="btn btn-sm btn-outline-success" id="refreshRetail">🔄 Refresh Records</button>
<table class="table table-sm table-striped mt-2" id="retailTable">
<thead><tr><th>Customer</th><th>Date</th><th>Amount</th><th>Paid</th><th>Remaining</th><th>Description</th></tr></thead>
<tbody></tbody>
</table>
</div>
</details>
<details class="mb-3">
<summary class="h5">New Changes</summary>
<form id="changesForm" class="mt-3">
<div class="input-group mb-2">
<select class="form-select selectpicker" data-live-search="true" multiple id="changesCustomer" name="customer[]">
</select>
<button class="btn btn-outline-secondary" type="button" id="addChangesCustomer">+ New Customer</button>
</div>
<div class="input-group mb-2">
<input type="date" class="form-control" name="date" id="changesDate" required>
<button class="btn btn-outline-secondary" type="button" onclick="document.getElementById('changesDate').value = new Date().toISOString().split('T')[0]">📅 Today</button>
</div>
<div class="input-group mb-2">
<select class="form-select selectpicker" data-live-search="true" id="paperSelect" name="paper">
</select>
<button class="btn btn-outline-secondary" type="button" id="addPaper">+ New Paper</button>
</div>
<textarea class="form-control mb-2" name="description" rows="3" placeholder="Describe the change"></textarea>
<button class="btn btn-warning">Save Change</button>
</form>
<div class="mt-3">
<button class="btn btn-sm btn-outline-warning" id="refreshChanges">🔄 Refresh Records</button>
<table class="table table-sm table-striped mt-2" id="changesTable">
<thead><tr><th>Customer</th><th>Date</th><th>Paper</th><th>Description</th></tr></thead>
<tbody></tbody>
</table>
</div>
</details>
<div id="status" class="mt-4 text-center text-muted"></div>
<script type="module" src="NBT.js"></script>
</body>
</html>
```

SubPages\NBT\NBT.js:
```js
import { initBilling } from "./SubJS/billing.js";
import { initRetail } from "./SubJS/retail.js";
import { initChanges } from "./SubJS/changes.js";
document.addEventListener("DOMContentLoaded", () => {
initBilling();
initRetail();
initChanges();
});
```

SubPages\NBT\SubJS\billing.js:
```js
import { sendToSheet, fetchFromSheet, sendToWhatsApp, showStatus } from "./utils.js";
export function initBilling() {
const form = document.getElementById("billingForm");
const tableBody = document.querySelector("#billingTable tbody");
const refreshBtn = document.getElementById("refreshBilling");
const addCustomerBtn = document.getElementById("addBillingCustomer");
const customerSelect = document.getElementById("billingCustomer");
if (!form) return;
form.addEventListener("submit", async e => {
e.preventDefault();
const data = Object.fromEntries(new FormData(form).entries());
try {
await sendToSheet(data, "billing");
showStatus("Billing saved ✅");
const message = `🧾 *Billing Record*
👤 Customer: ${data["customer[]"]}
📅 Date: ${data.date}
💰 Amount: ₹${data.amount}
💵 Advance: ₹${data.advance || 0}
📝 Note: ${data.description || "-"}`;
sendToWhatsApp(message);
form.reset();
loadRecords();
} catch (err) {
console.error(err);
showStatus("Error saving billing ❌", true);
}
});
if (refreshBtn) refreshBtn.addEventListener("click", loadRecords);
if (addCustomerBtn) {
addCustomerBtn.addEventListener("click", () => {
const name = prompt("Enter new customer name:");
if (name) {
const option = new Option(name, name, true, true);
customerSelect.add(option);
$(customerSelect).selectpicker("refresh");
}
});
}
async function loadRecords() {
const rows = await fetchFromSheet("billing");
tableBody.innerHTML = rows
.map(
r => `<tr>
<td>${r.Customer}</td>
<td>${r.Date}</td>
<td>${r.Amount}</td>
<td>${r.Advance}</td>
<td>${r.Description}</td>
</tr>`
)
.join("");
}
loadRecords();
}
```

SubPages\NBT\SubJS\changes.js:
```js
import { sendToSheet, fetchFromSheet, sendToWhatsApp, showStatus } from "./utils.js";
export function initChanges() {
const form = document.getElementById("changesForm");
const tableBody = document.querySelector("#changesTable tbody");
const refreshBtn = document.getElementById("refreshChanges");
const addCustomerBtn = document.getElementById("addChangesCustomer");
const addPaperBtn = document.getElementById("addPaper");
const customerSelect = document.getElementById("changesCustomer");
const paperSelect = document.getElementById("paperSelect");
if (!form) return;
form.addEventListener("submit", async e => {
e.preventDefault();
const data = Object.fromEntries(new FormData(form).entries());
try {
await sendToSheet(data, "changes");
showStatus("Change saved ✅");
const message = `📰 *Change Record*
👤 Customer: ${data["customer[]"]}
📅 Date: ${data.date}
🗞️ Paper: ${data.paper}
📝 Change: ${data.description || "-"}`;
sendToWhatsApp(message);
form.reset();
loadRecords();
} catch (err) {
console.error(err);
showStatus("Error saving change ❌", true);
}
});
if (refreshBtn) refreshBtn.addEventListener("click", loadRecords);
if (addCustomerBtn) {
addCustomerBtn.addEventListener("click", () => {
const name = prompt("Enter new customer name:");
if (name) {
const option = new Option(name, name, true, true);
customerSelect.add(option);
$(customerSelect).selectpicker("refresh");
}
});
}
if (addPaperBtn) {
addPaperBtn.addEventListener("click", () => {
const paper = prompt("Enter new paper name:");
if (paper) {
const option = new Option(paper, paper, true, true);
paperSelect.add(option);
$(paperSelect).selectpicker("refresh");
}
});
}
async function loadRecords() {
const rows = await fetchFromSheet("changes");
tableBody.innerHTML = rows
.map(
r => `<tr>
<td>${r.Customer}</td>
<td>${r.Date}</td>
<td>${r.Paper}</td>
<td>${r.Description}</td>
</tr>`
)
.join("");
}
loadRecords();
}
```

SubPages\NBT\SubJS\retail.js:
```js
import { sendToSheet, fetchFromSheet, sendToWhatsApp, showStatus } from "./utils.js";
export function initRetail() {
const form = document.getElementById("retailForm");
const tableBody = document.querySelector("#retailTable tbody");
const refreshBtn = document.getElementById("refreshRetail");
const addCustomerBtn = document.getElementById("addRetailCustomer");
const customerSelect = document.getElementById("retailCustomer");
if (!form) return;
const paidInput = form.querySelector("[name=paid]");
const amountInput = form.querySelector("[name=amount]");
const remainingInput = form.querySelector("[name=remaining]");
[amountInput, paidInput].forEach(input =>
input.addEventListener("input", () => {
const amount = parseFloat(amountInput.value) || 0;
const paid = parseFloat(paidInput.value) || 0;
remainingInput.value = amount - paid;
})
);
form.addEventListener("submit", async e => {
e.preventDefault();
const data = Object.fromEntries(new FormData(form).entries());
try {
await sendToSheet(data, "retail");
showStatus("Retail saved ✅");
const message = `🏪 *Retail Record*
👤 Customer: ${data["customer[]"]}
📅 Date: ${data.date}
💰 Total: ₹${data.amount}
💵 Paid: ₹${data.paid}
💳 Remaining: ₹${data.remaining}
📝 Note: ${data.description || "-"}`;
sendToWhatsApp(message);
form.reset();
remainingInput.value = "";
loadRecords();
} catch (err) {
console.error(err);
showStatus("Error saving retail ❌", true);
}
});
if (refreshBtn) refreshBtn.addEventListener("click", loadRecords);
if (addCustomerBtn) {
addCustomerBtn.addEventListener("click", () => {
const name = prompt("Enter new customer name:");
if (name) {
const option = new Option(name, name, true, true);
customerSelect.add(option);
$(customerSelect).selectpicker("refresh");
}
});
}
async function loadRecords() {
const rows = await fetchFromSheet("retail");
tableBody.innerHTML = rows
.map(
r => `<tr>
<td>${r.Customer}</td>
<td>${r.Date}</td>
<td>${r.Amount}</td>
<td>${r.Paid}</td>
<td>${r.Remaining}</td>
<td>${r.Description}</td>
</tr>`
)
.join("");
}
loadRecords();
}
```

SubPages\NBT\SubJS\utils.js:
```js
import BINGO from "../../Assets/Utils/Bingo.js";
export async function sendToSheet(data, type) {
try {
const res = await fetch(`${BINGO.SheetConfig.url}?type=${type}`, {
method: "POST",
body: JSON.stringify(data),
headers: { "Content-Type": "application/json" }
});
return await res.json();
} catch (err) {
console.error("Error sending to sheet:", err);
}
}
export async function fetchFromSheet(type) {
try {
const res = await fetch(`${BINGO.SheetConfig.url}?type=${type}`);
return await res.json();
} catch (err) {
console.error("Error fetching from sheet:", err);
return [];
}
}
export function sendToWhatsApp(message, number = BINGO.WhatsAppNumber) {
if (!number) {
console.error("WhatsApp number not set in Bingo.js");
return;
}
const encodedMsg = encodeURIComponent(message);
const url = `https:
window.open(url, "_blank");
}
export function showStatus(msg, isError = false) {
const status = document.getElementById("status");
if (!status) return;
status.textContent = msg;
status.className = isError ? "text-danger" : "text-success";
setTimeout(() => (status.textContent = ""), 3000);
}
```

