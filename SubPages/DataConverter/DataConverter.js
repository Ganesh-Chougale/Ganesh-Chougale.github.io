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

  let fileType = "";        // 'csv' or 'json' (original uploaded)
  let parsedData = [];      // array of objects (normalized)
  let rawText = "";         // original file text
  let currentPreview = "";  // 'csv' | 'json' | 'table'

  // --- helpers ---
  function parseCSVLine(line) {
    const res = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        res.push(cur);
        cur = "";
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
        // store arrays as JSON string
        result[prefix] = JSON.stringify(curr);
        return;
      }
      if (typeof curr === "object" && curr !== null) {
        for (const key in curr) {
          if (!Object.prototype.hasOwnProperty.call(curr, key)) continue;
          const value = curr[key];
          const newKey = prefix ? `${prefix}.${key}` : key;
          if (value && typeof value === "object" && !Array.isArray(value)) {
            recurse(value, newKey);
          } else if (Array.isArray(value)) {
            result[newKey] = JSON.stringify(value);
          } else {
            result[newKey] = value;
          }
        }
      } else {
        result[prefix] = curr;
      }
    }
    recurse(obj, "");
    return result;
  }

  function normalizeJSON(rawJson) {
    if (Array.isArray(rawJson)) {
      if (rawJson.every(item => item && typeof item === "object" && !Array.isArray(item))) {
        return rawJson;
      } else {
        return rawJson.map(item => (item && typeof item === "object") ? item : { value: item });
      }
    } else if (rawJson && typeof rawJson === "object") {
      return [rawJson];
    } else {
      return [{ value: rawJson }];
    }
  }

  function convertToCSV(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return "";
    const flat = arr.map(flattenForCSV);
    const headersSet = new Set();
    flat.forEach(obj => Object.keys(obj).forEach(k => headersSet.add(k)));
    const headers = Array.from(headersSet);
    const lines = flat.map(obj =>
      headers.map(h => `"${String(obj[h] ?? "").replace(/"/g, '""')}"`).join(",")
    );
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

  // --- UI setup after file chosen ---
  inputFile.addEventListener("change", () => {
    if (!inputFile.files.length) return;
    const file = inputFile.files[0];
    rawText = "";
    parsedData = [];
    fileType = "";

    if (file.name.toLowerCase().endsWith(".csv")) fileType = "csv";
    else if (file.name.toLowerCase().endsWith(".json")) fileType = "json";
    else { alert("Only CSV or JSON supported"); inputFile.value = ""; return; }

    const reader = new FileReader();
    reader.onload = e => {
      rawText = e.target.result;
      try {
        if (fileType === "csv") {
          parsedData = parseCSV(rawText);
        } else {
          const json = JSON.parse(rawText);
          parsedData = normalizeJSON(json);
        }
      } catch (err) {
        console.error(err);
        alert("Error parsing file: " + err.message);
        return;
      }

      // build preview radio toggles
      previewOptions.classList.remove("d-none");
      resultContainer.classList.remove("d-none");

      const other = fileType === "csv" ? "json" : "csv";
      const otherLabel = other.toUpperCase();
      // default select converted view (other) per your request
      previewRadios.innerHTML = `
        <input type="radio" class="btn-check" name="preview" id="optOther" autocomplete="off" value="${other}" checked>
        <label class="btn btn-outline-primary" for="optOther">${otherLabel}</label>

        <input type="radio" class="btn-check" name="preview" id="optTable" autocomplete="off" value="table">
        <label class="btn btn-outline-primary" for="optTable">TABLE</label>
      `;

      // attach change listeners to radios
      document.querySelectorAll('input[name="preview"]').forEach(r => {
        r.addEventListener("change", updatePreview);
      });

      // initial render (converted)
      updatePreview();
    };
    reader.readAsText(file);
  });

  // update preview based on chosen radio
  function updatePreview() {
    const chosen = document.querySelector('input[name="preview"]:checked')?.value;
    if (!chosen) return;
    currentPreview = chosen;

    // hide all first
    outputText.classList.add("d-none");
    textButtons.classList.add("d-none");
    tableContainer.classList.add("d-none");

    if (chosen === "table") {
      renderTable(parsedData);
      tableContainer.classList.remove("d-none");
    } else if (chosen === "json") {
      // converting CSV -> JSON: parsedData already is array of objects
      const pretty = JSON.stringify(parsedData, null, 2);
      outputText.value = pretty;
      outputText.classList.remove("d-none");
      textButtons.classList.remove("d-none");
      downloadBtn.dataset.ext = "json";
    } else if (chosen === "csv") {
      // converting JSON -> CSV
      const csv = convertToCSV(parsedData);
      outputText.value = csv;
      outputText.classList.remove("d-none");
      textButtons.classList.remove("d-none");
      downloadBtn.dataset.ext = "csv";
    }
  }

  function renderTable(data) {
    if (!Array.isArray(data) || data.length === 0) {
      tableHead.innerHTML = "";
      tableBody.innerHTML = "<tr><td colspan='100%' class='text-center'>No data</td></tr>";
      return;
    }
    const flat = data.map(flattenForCSV);
    const headersSet = new Set();
    flat.forEach(obj => Object.keys(obj).forEach(k => headersSet.add(k)));
    const headers = Array.from(headersSet);
    tableHead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>`;
    tableBody.innerHTML = flat.map(row =>
      `<tr>${headers.map(h => `<td>${escapeHtml(String(row[h] ?? ""))}</td>`).join("")}</tr>`
    ).join("");
  }

  // basic HTML escape for table cells
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (m) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
    });
  }

  // download text (CSV/JSON)
  downloadBtn.addEventListener("click", () => {
    if (!outputText.value) return alert("Nothing to download");
    const name = (inputFile.files[0]?.name || "file").split(".")[0];
    const ext = downloadBtn.dataset.ext || "txt";
    const mime = ext === "json" ? "application/json" : "text/csv";
    downloadBlob(outputText.value, `${name}.${ext}`, mime);
  });

  // copy text
  copyBtn.addEventListener("click", async () => {
    if (!outputText.value) return;
    try {
      await navigator.clipboard.writeText(outputText.value);
      alert("Copied to clipboard!");
    } catch (err) {
      outputText.select();
      document.execCommand("copy");
      alert("Copied!");
    }
  });

  // export markdown from displayed table
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

  // export excel using SheetJS
  exportExcelBtn.addEventListener("click", () => {
    const headers = [...tableHead.querySelectorAll("th")].map(th => th.innerText.trim());
    const rows = [...tableBody.querySelectorAll("tr")].map(tr =>
      [...tr.querySelectorAll("td")].map(td => td.innerText.trim())
    );
    if (!rows.length) return alert("No table to export");
    const ws_data = [headers, ...rows];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table.xlsx");
  });

});
