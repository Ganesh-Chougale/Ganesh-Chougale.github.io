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

  // Auto-calc remaining
  [amountInput, paidInput].forEach(input =>
    input.addEventListener("input", () => {
      const amount = parseFloat(amountInput.value) || 0;
      const paid = parseFloat(paidInput.value) || 0;
      remainingInput.value = amount - paid;
    })
  );

  // Save form
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

  // Refresh button
  if (refreshBtn) refreshBtn.addEventListener("click", loadRecords);

  // Add new customer
  if (addCustomerBtn) {
    addCustomerBtn.addEventListener("click", () => {
      const name = prompt("Enter new customer name:");
      if (name) {
        const option = new Option(name, name, true, true);
        customerSelect.add(option);
        // Refresh bootstrap-select
        $(customerSelect).selectpicker("refresh");
      }
    });
  }

  // Load records into table
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
