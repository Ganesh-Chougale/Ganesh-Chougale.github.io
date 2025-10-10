SubPages\DataConverter\DataConverter.css:
```css
#resultContainer {
  margin-top: 1rem;
}
#outputText {
  font-family: 'Consolas', 'Courier New', monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
}
#downloadBtn, #copyBtn {
  font-size: 0.85rem;
}
```

SubPages\DataConverter\DataConverter.html:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Text File Converter</title>
    <!-- CDN Links -->
    <script>
        fetch('../../Assets/Utils/cdn.html')
        .then(response => response.text())
        .then(data => document.head.insertAdjacentHTML('beforeend', data));
    </script>
    <!-- CDN Links -->
    <link rel="stylesheet" href="DataConverter.css" />
  </head>
  <body>
    <div class="container my-5">
      <h2 class="mb-4 text-center">Text File Converter</h2>
      <div class="mb-3">
        <input type="file" id="inputFile" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="outputFormat">Convert to:</label>
        <select id="outputFormat" class="form-select">
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>
      </div>
      <button id="convertBtn" class="btn btn-primary mb-4">Convert</button>
      <div id="resultContainer" class="d-none position-relative">
        <div class="d-flex justify-content-end mb-2 gap-2">
          <button id="downloadBtn" class="btn btn-success btn-sm">
            Download
          </button>
          <button id="copyBtn" class="btn btn-secondary btn-sm">Copy</button>
        </div>
        <textarea
          id="outputText"
          class="form-control"
          rows="15"
          readonly
        ></textarea>
      </div>
    </div>
    <script src="DataConverter.js"></script>
  </body>
</html>
```

SubPages\DataConverter\DataConverter.js:
```js
document.addEventListener("DOMContentLoaded", () => {
  const inputFile = document.getElementById("inputFile");
  const outputFormat = document.getElementById("outputFormat");
  const convertBtn = document.getElementById("convertBtn");
  const outputText = document.getElementById("outputText");
  const resultContainer = document.getElementById("resultContainer");
  const downloadBtn = document.getElementById("downloadBtn");
  const copyBtn = document.getElementById("copyBtn");
  function updateOutputOptions(detectedFormat) {
    for (let option of outputFormat.options) {
      option.disabled = option.value === detectedFormat;
    }
    if (outputFormat.value === detectedFormat) {
      for (let option of outputFormat.options) {
        if (!option.disabled) {
          outputFormat.value = option.value;
          break;
        }
      }
    }
  }
  inputFile.addEventListener("change", () => {
    if (!inputFile.files.length) return;
    const file = inputFile.files[0];
    let detected = "";
    if (file.name.endsWith(".csv")) detected = "csv";
    else if (file.name.endsWith(".json")) detected = "json";
    else {
      alert("Unsupported file type! Only CSV and JSON are supported.");
      inputFile.value = "";
      return;
    }
    updateOutputOptions(detected);
  });
  function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");
    const headers = lines[0].split(",");
    return lines.slice(1).map(line => {
      const values = line.split(",");
      const obj = {};
      headers.forEach((h, i) => obj[h.trim()] = values[i]?.trim() || "");
      return obj;
    });
  }
  function convertToCSV(jsonArr) {
    if (!Array.isArray(jsonArr) || !jsonArr.length) return "";
    const headers = Object.keys(jsonArr[0]);
    const lines = jsonArr.map(obj => headers.map(h => `"${String(obj[h] || '').replace(/"/g, '""')}"`).join(","));
    return [headers.join(","), ...lines].join("\n");
  }
  function flattenForCSV(obj) {
    if (Array.isArray(obj)) return obj.map(flattenForCSV);
    const result = {};
    function recurse(curr, prefix) {
      for (let key in curr) {
        if (curr.hasOwnProperty(key)) {
          const value = curr[key];
          const newKey = prefix ? `${prefix}.${key}` : key;
          if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            recurse(value, newKey);
          } else {
            result[newKey] = value;
          }
        }
      }
    }
    recurse(obj, "");
    return result;
  }
  convertBtn.addEventListener("click", () => {
    if (!inputFile.files.length) return alert("Please select a file!");
    const file = inputFile.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target.result;
      let result = "";
      try {
        if (file.name.endsWith(".csv")) {
          const json = parseCSV(text);
          result = outputFormat.value === "json" 
            ? JSON.stringify(json, null, 2) 
            : text;
        } else if (file.name.endsWith(".json")) {
          const json = JSON.parse(text);
          result = outputFormat.value === "csv" 
            ? convertToCSV(Array.isArray(json) ? json.map(flattenForCSV) : [flattenForCSV(json)]) 
            : JSON.stringify(json, null, 2);
        }
        outputText.value = result;
        resultContainer.classList.remove("d-none");
      } catch (err) {
        alert("Error converting file: " + err.message);
        console.error(err);
      }
    };
    reader.readAsText(file);
  });
  downloadBtn.addEventListener("click", () => {
    if (!inputFile.files.length) return;
    const originalName = inputFile.files[0].name;
    const baseName = originalName.substring(0, originalName.lastIndexOf(".")) || "file";
    const extension = outputFormat.value;
    const mimeType = extension === 'json' ? 'application/json' : 'text/csv';
    const blob = new Blob([outputText.value], { type: `${mimeType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
  copyBtn.addEventListener("click", async () => {
    if (!outputText.value) return;
    try {
      await navigator.clipboard.writeText(outputText.value);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Copy failed", err);
      // Fallback for older browsers
      outputText.select();
      document.execCommand('copy');
      alert("Content copied to clipboard!");
    }
  });
});
```

