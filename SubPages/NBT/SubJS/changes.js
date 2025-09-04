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

  // Save form
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

  // Refresh button
  if (refreshBtn) refreshBtn.addEventListener("click", loadRecords);

  // Add new customer
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

  // Add new paper
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

  // Load records into table
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
