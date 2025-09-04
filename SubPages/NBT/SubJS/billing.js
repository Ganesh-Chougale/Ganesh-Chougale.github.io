import { sendToSheet, fetchFromSheet, sendToWhatsApp, showStatus } from "./utils.js";

export function initBilling() {
  const form = document.getElementById("billingForm");
  const tableBody = document.querySelector("#billingTable tbody");
  const refreshBtn = document.getElementById("refreshBilling");
  const addCustomerBtn = document.getElementById("addBillingCustomer");
  const customerSelect = document.getElementById("billingCustomer");

  if (!form) return;

  // Save form
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
