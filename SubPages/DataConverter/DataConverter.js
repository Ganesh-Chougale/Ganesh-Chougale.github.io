/* DataConverter.js */
document.addEventListener("DOMContentLoaded", () => {
  const inputFile = document.getElementById("inputFile");
  const previewOptions = document.getElementById("previewOptions");
  const previewRadios = document.getElementById("previewRadios");
  const resultContainer = document.getElementById("resultContainer");
  const outputText = document.getElementById("outputText");
  const textButtons = document.getElementById("textButtons");
  const downloadBtn = document.getElementById("downloadBtn");
  const copyBtn = document.getElementById("copyBtn");
  const tableContainer = document.getElementById("tableContainer");
  const tableHead = document.getElementById("tableHead");
  const tableBody = document.getElementById("tableBody");
  const exportMarkdownBtn = document.getElementById("exportMarkdownBtn");
  const exportExcelBtn = document.getElementById("exportExcelBtn");

  const pasteContainer = document.getElementById("pasteContainer");
  const pasteInput = document.getElementById("pasteInput");
  const pasteBtn = document.getElementById("pasteBtn");
  const modeUpload = document.getElementById("modeUpload");
  const modePaste = document.getElementById("modePaste");
  const uploadContainer = document.getElementById("uploadContainer");

  let fileType = "";        // 'csv' or 'json'
  let parsedData = [];
  let rawText = "";
  let currentPreview = "";

  // --- CSV/JSON helpers (unchanged) ---
  function parseCSVLine(line) {
    const res = [];
    let cur = "", inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        res.push(cur); cur = "";
      } else cur += ch;
    }
    res.push(cur);
    return res.map(s => s.trim());
  }

  function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");
    if (!lines.length) return [];
    const headers = parseCSVLine(lines[0]);
    const rows = lines.slice(1).map(line => {
      const vals = parseCSVLine(line);
      const obj = {};
      headers.forEach((h, i) => obj[h.trim()] = vals[i] ?? "");
      return obj;
    });
    return rows;
  }

  function flattenForCSV(obj) {
    const result = {};
    function recurse(curr, prefix) {
      if (Array.isArray(curr)) {
        result[prefix] = JSON.stringify(curr);
        return;
      }
      if (typeof curr === "object" && curr !== null) {
        for (const key in curr) {
          if (!Object.prototype.hasOwnProperty.call(curr, key)) continue;
          const value = curr[key];
          const newKey = prefix ? `${prefix}.${key}` : key;
          if (value && typeof value === "object" && !Array.isArray(value)) recurse(value, newKey);
          else if (Array.isArray(value)) result[newKey] = JSON.stringify(value);
          else result[newKey] = value;
        }
      } else result[prefix] = curr;
    }
    recurse(obj, "");
    return result;
  }

  function normalizeJSON(rawJson) {
    if (Array.isArray(rawJson)) {
      if (rawJson.every(item => item && typeof item === "object" && !Array.isArray(item))) return rawJson;
      else return rawJson.map(item => (item && typeof item === "object") ? item : { value: item });
    } else if (rawJson && typeof rawJson === "object") return [rawJson];
    else return [{ value: rawJson }];
  }

  function convertToCSV(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return "";
    const flat = arr.map(flattenForCSV);
    const headersSet = new Set();
    flat.forEach(obj => Object.keys(obj).forEach(k => headersSet.add(k)));
    const headers = Array.from(headersSet);
    const lines = flat.map(obj => headers.map(h => `"${String(obj[h] ?? "").replace(/"/g, '""')}"`).join(","));
    return [headers.join(","), ...lines].join("\n");
  }

  function downloadBlob(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[m]);
  }

  // --- Detect CSV or JSON ---
  function detectType(text) {
    try { JSON.parse(text); return "json"; }
    catch { return "csv"; }
  }

  // --- Handle Input Mode Toggle ---
  document.querySelectorAll('input[name="inputMode"]').forEach(radio => {
    radio.addEventListener("change", () => {
      if (modeUpload.checked) {
        uploadContainer.classList.remove("d-none");
        pasteContainer.classList.add("d-none");
      } else {
        uploadContainer.classList.add("d-none");
        pasteContainer.classList.remove("d-none");
      }
    });
  });

  // --- Process Pasted Text ---
  pasteBtn.addEventListener("click", () => {
    const text = pasteInput.value.trim();
    if (!text) return alert("Nothing to paste!");
    rawText = text;
    fileType = detectType(text);
    try {
      parsedData = fileType === "csv" ? parseCSV(text) : normalizeJSON(JSON.parse(text));
    } catch (err) {
      alert("Error parsing input: " + err.message);
      return;
    }
    showPreviewOptions();
  });

  // --- Existing File Upload Handler ---
  inputFile.addEventListener("change", () => {
    if (!inputFile.files.length) return;
    const file = inputFile.files[0];
    rawText = ""; parsedData = []; fileType = "";
    if (file.name.toLowerCase().endsWith(".csv")) fileType = "csv";
    else if (file.name.toLowerCase().endsWith(".json")) fileType = "json";
    else { alert("Only CSV or JSON supported"); inputFile.value = ""; return; }

    const reader = new FileReader();
    reader.onload = e => {
      rawText = e.target.result;
      try {
        parsedData = fileType === "csv" ? parseCSV(rawText) : normalizeJSON(JSON.parse(rawText));
      } catch (err) { alert("Error parsing file: " + err.message); return; }
      showPreviewOptions();
    };
    reader.readAsText(file);
  });

  // --- Show Preview Options & Render ---
  function showPreviewOptions() {
    previewOptions.classList.remove("d-none");
    resultContainer.classList.remove("d-none");

    const other = fileType === "csv" ? "json" : "csv";
    previewRadios.innerHTML = `
      <input type="radio" class="btn-check" name="preview" id="optOther" autocomplete="off" value="${other}" checked>
      <label class="btn btn-outline-primary" for="optOther">${other.toUpperCase()}</label>
      <input type="radio" class="btn-check" name="preview" id="optTable" autocomplete="off" value="table">
      <label class="btn btn-outline-primary" for="optTable">TABLE</label>
    `;

    document.querySelectorAll('input[name="preview"]').forEach(r => r.addEventListener("change", updatePreview));

    updatePreview();
  }

  // --- Update Preview (same as before) ---
  function updatePreview() {
    const chosen = document.querySelector('input[name="preview"]:checked')?.value;
    if (!chosen) return;
    currentPreview = chosen;

    outputText.classList.add("d-none");
    textButtons.classList.add("d-none");
    tableContainer.classList.add("d-none");

    if (chosen === "table") {
      renderTable(parsedData);
      tableContainer.classList.remove("d-none");
    } else if (chosen === "json") {
      outputText.value = JSON.stringify(parsedData, null, 2);
      outputText.classList.remove("d-none");
      textButtons.classList.remove("d-none");
      downloadBtn.dataset.ext = "json";
    } else if (chosen === "csv") {
      outputText.value = convertToCSV(parsedData);
      outputText.classList.remove("d-none");
      textButtons.classList.remove("d-none");
      downloadBtn.dataset.ext = "csv";
    }
  }

  function renderTable(data) {
    if (!Array.isArray(data) || !data.length) {
      tableHead.innerHTML = "";
      tableBody.innerHTML = "<tr><td colspan='100%' class='text-center'>No data</td></tr>";
      return;
    }
    const flat = data.map(flattenForCSV);
    const headersSet = new Set();
    flat.forEach(obj => Object.keys(obj).forEach(k => headersSet.add(k)));
    const headers = Array.from(headersSet);
    tableHead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>`;
    tableBody.innerHTML = flat.map(row => `<tr>${headers.map(h => `<td>${escapeHtml(String(row[h] ?? ""))}</td>`).join("")}</tr>`).join("");
  }

  // --- Download / Copy ---
  downloadBtn.addEventListener("click", () => {
    if (!outputText.value) return alert("Nothing to download");
    const name = (inputFile.files[0]?.name || "file").split(".")[0];
    const ext = downloadBtn.dataset.ext || "txt";
    const mime = ext === "json" ? "application/json" : "text/csv";
    downloadBlob(outputText.value, `${name}.${ext}`, mime);
  });

  copyBtn.addEventListener("click", async () => {
    if (!outputText.value) return;
    try { await navigator.clipboard.writeText(outputText.value); alert("Copied!"); }
    catch { outputText.select(); document.execCommand("copy"); alert("Copied!"); }
  });

  // --- Export Markdown / Excel ---
  exportMarkdownBtn.addEventListener("click", () => {
    const rows = tableBody.querySelectorAll("tr");
    if (!rows.length) return alert("No table to export");
    const headers = [...tableHead.querySelectorAll("th")].map(th => th.innerText.trim());
    const md = [
      `| ${headers.join(" | ")} |`,
      `| ${headers.map(() => '---').join(" | ")} |`,
      ...[...rows].map(tr => {
        const cells = [...tr.querySelectorAll("td")].map(td => td.innerText.replace(/\|/g, '\\|').trim());
        return `| ${cells.join(" | ")} |`;
      })
    ].join("\n");
    downloadBlob(md, "table.md", "text/markdown");
  });

  exportExcelBtn.addEventListener("click", () => {
    const headers = [...tableHead.querySelectorAll("th")].map(th => th.innerText.trim());
    const rows = [...tableBody.querySelectorAll("tr")].map(tr => [...tr.querySelectorAll("td")].map(td => td.innerText.trim()));
    if (!rows.length) return alert("No table to export");
    const ws_data = [headers, ...rows];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table.xlsx");
  });
});
