Assets\Utils\Bingo.js:
```js
const BINGO = {
PieValue: "3.14159",
DriveConfig: {
apiKey: "AIzaSyAiHNvKrnISSw4z0wCMiyE8ttWrMsX9cBg",
clientId: "8114939294-q088idvqfcll7bfpr12c5v60dhgdgl0p.apps.googleusercontent.com",
clientSecret: "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",
scopes: ["https:
redirectUri: "http:
refreshToken: "YOUR_REFRESH_TOKEN",
accessToken: "YOUR_TEMP_ACCESS_TOKEN",
},
SheetConfig: {
url: "https:
},
WhatsAppNumber: "918459481200"
};
export default BINGO;
```

Assets\Utils\cdn.html:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
crossorigin="anonymous" referrerpolicy="no-referrer" />
```


---

After finishing all code summary of Assets
index.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ganesh Chougale Portfolio</title>
<script>
fetch('./Assets/Utils/cdn.html')
.then(response => response.text())
.then(data => document.head.insertAdjacentHTML('beforeend', data));
</script>
<link rel="stylesheet" href="./style.css">
</head>
<body>
<header class="hero-header text-white text-center py-4">
<div class="container">
<h1 class="display-4">Ganesh Chougale <small class="text-muted fs-5 d-block mt-2">Like to keep things <span
id="typewriter-text" style="font-weight: 900;">simple</span></small></h1>
<nav class="navbar navbar-expand-lg">
<div class="container-fluid">
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse justify-content-center" id="navbarNav">
<ul class="navbar-nav">
<li class="nav-item">
<a class="nav-link" href="#about">About</a>
</li>
<li class="nav-item">
<a class="nav-link" href="#projects">Projects</a>
</li>
<li class="nav-item">
<a class="nav-link" href="#contact">Contact</a>
</li>
</ul>
</div>
</div>
</nav>
</div>
</header>
<main class="container my-5">
<section id="hero" class="text-center bg-light p-5 rounded shadow-sm mb-5">
<h2 class="display-5 mb-3">Welcome to My Portfolio!</h2>
<p class="lead mb-4">I'm a passionate developer creating engaging & scalable solutions.</p>
<a href="#projects" class="btn btn-primary btn-lg">View My Work</a>
</section>
<section id="about" class="bg-white p-5 rounded shadow-sm mb-5">
<h2 class="text-center mb-4">About Me</h2>
<p>Hello! I'm Ganesh Chougale, 
<strong>A programming agnostic</strong>, a budding developer from Kolhapur, Maharashtra. I enjoy building
scalable products. I'm currently expanding my skills in front-end & back-end development and
looking for opportunities to contribute to exciting projects.</p>
<p>My skills include <strong>FrontEnd</strong>: Vanilla JS, React, Angular; and <strong>BackEnd</strong>: Java Spring Boot, Node, .NET EF. I'm always eager to learn new technologies. I love using Python for computer vision, and JavaScript & shell scripts for automation & custom scripting.</p>
</section>
<section id="projects" class="bg-white p-5 rounded shadow-sm mb-5">
<h2 class="text-center mb-4">My Projects</h2>
<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
<div class="col">
<div class="card h-100">
<div class="card-body">
<h3 class="card-title text-center">Virtual Keyboard</h3>
<p class="card-text">Hands-on project (literally! I need to raise them for this) – check out
my Cam Virtual Keyboard! 👋</p>
<div class="ratio ratio-16x9 mb-3 project-video-container">
<iframe 
src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7336260755597451266?compact=1"
allowfullscreen
title="Embedded LinkedIn Post">
</iframe>
</div>
<div class="text-center">
<a href="https://www.linkedin.com/posts/ganesh-chougale-512449215_learnbydoing-opensource-activity-7336260798459097088-zz6W?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZZQ54BebFnJeFxBKof8YI_PnySJ-S78xw"
target="_blank" class="btn btn-outline-primary btn-sm">LinkedIn Post</a>
<a href="https://github.com/Ganesh-Chougale/Virtual-Keyboard-using-Mediapipe"
target="_blank" class="btn btn-outline-secondary btn-sm">GitHub Repo</a>
</div>
</div>
</div>
</div>
<div class="col">
<div class="card h-100">
<div class="card-body">
<h3 class="card-title text-center">Full-Stack Product Store Application</h3>
<p class="card-text">Fully functioning MERN stack product store application with all CRUD
features.</p>
<div class="ratio ratio-16x9 mb-3 project-video-container">
<iframe 
src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7298645556669685763?compact=1"
allowfullscreen
title="Embedded LinkedIn Post">
</iframe>
</div>
<div class="text-center">
<a href="https://www.linkedin.com/posts/ganesh-chougale-512449215_webdevelopment-mernstack-javascript-activity-7298645657362276352-tE1Y?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZZQ54BebFnJeFxBKof8YI_PnySJ-S78xw"
target="_blank" class="btn btn-outline-primary btn-sm">LinkedIn Post</a>
<a href="https://github.com/Ganesh-Chougale/Product_Store" target="_blank"
class="btn btn-outline-secondary btn-sm">GitHub Repo</a>
</div>
</div>
</div>
</div>
</div>
</section>
<section id="contact" class="bg-white p-5 rounded shadow-sm">
<h2 class="text-center mb-4">Get in Touch</h2>
<p class="text-center">I'm always open to new collaborations and opportunities. Feel free to reach out!</p>
<div class="text-center mt-4 d-flex flex-wrap justify-content-center gap-3">
<a href="mailto:gchougale32@gmail.com" class="btn btn-dark btn-lg" aria-label="Email Ganesh">
<i class="fas fa-envelope"></i>
</a>
<a href="tel:+918459481200" class="btn btn-dark btn-lg" aria-label="Call Ganesh">
<i class="fas fa-phone"></i>
</a>
<a href="http://linkedin.com/in/ganesh-chougale-512449215" target="_blank" class="btn btn-dark btn-lg"
aria-label="LinkedIn Profile">
<i class="fab fa-linkedin"></i>
</a>
<a href="https://github.com/Ganesh-Chougale" target="_blank" class="btn btn-dark btn-lg"
aria-label="GitHub Profile">
<i class="fab fa-github"></i>
</a>
<a href="https://ganesh-chougale.github.io/" target="_blank" class="btn btn-dark btn-lg"
aria-label="Home Page">
<i class="fas fa-home"></i>
</a>
</div>
<a href="./SubPages/Tools.html" target="_blank" class="btn btn-sm tools-link" aria-label="Tools"
style="float: right;">
<h2><i class="fas fa-star-half-alt fa-spin"></i></h2>
</a>
</section>
</main>
<footer class="bg-dark text-white text-center py-3 mt-5">
<p class="mb-0">© 2025 Ganesh Chougale. All rights reserved.</p>
</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
crossorigin="anonymous"></script>
<script src="./script.js"></script>
</body>
</html>
```

script.js:
```js
document.addEventListener('DOMContentLoaded', function() {
const yearParagraph = document.querySelector('footer .mb-0');
if (yearParagraph) {
yearParagraph.textContent = `© ${new Date().getFullYear()} Ganesh Chougale. All rights reserved.`;
}
const words = ["simple", "concise"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter-text');
function type() {
if (!typewriterElement) return;
currentWord = words[i];
if (isDeleting) {
typewriterElement.textContent = currentWord.substring(0, j - 1);
j--;
} else {
typewriterElement.textContent = currentWord.substring(0, j + 1);
j++;
}
let typeSpeed = 150;
if (isDeleting) {
typeSpeed = 75;
}
if (!isDeleting && j === currentWord.length) {
typeSpeed = 1000;
isDeleting = true;
} else if (isDeleting && j === 0) {
isDeleting = false;
i = (i + 1) % words.length;
typeSpeed = 500;
}
setTimeout(type, typeSpeed);
}
type();
});
```

style.css:
```css
header::before{
background-image: url("./Assets/Images/ocean_view.jpg");
background-size: cover; 
background-position: center center;
background-repeat: no-repeat;
}
.hero-header {
background-image: url("./Assets/Images/ocean_view.jpg");
background-size: cover; 
background-position: center center;
background-repeat: no-repeat;
position: relative;
overflow: hidden;
min-height: 300px; 
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
}
.hero-header::before {
content: '';
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5); 
z-index: 1;
}
.hero-header .container {
position: relative;
z-index: 2;
}
.hero-header .text-muted {
color: rgba(255, 255, 255, 0.9) !important; 
text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); 
}
.hero-header .navbar-nav .nav-link {
color: rgba(255, 255, 255, 0.9) !important; 
font-weight: bold; 
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6); 
}
.hero-header .navbar-nav .nav-link:hover {
color: #e0e0e0 !important; 
}
@keyframes backgroundZoom {
0% {
background-size: cover;
}
50% {
background-size: 110%;
}
100% {
background-size: cover;
}
}
@media (max-width: 991px) { 
.hero-header {
min-height: 250px; 
padding-top: 30px; 
padding-bottom: 30px;
background-size: 115%; 
}
}
@media (max-width: 767px) { 
.hero-header {
min-height: 200px;
padding-top: 20px;
padding-bottom: 20px;
background-size: 125%; 
}
.hero-header h1 {
font-size: 2.5rem; 
}
.hero-header .text-muted {
font-size: 0.9rem !important; 
}
}
.btn-primary {
background-color: #007bff;
border-color: #007bff;
}
.btn-primary:hover {
background-color: #0056b3;
border-color: #0056b3;
}
html {
scroll-behavior: smooth;
}
.btn-dark {
background-color: #343a40;
border-color: #343a40;
}
.btn-dark:hover {
background-color: #1d2124;
border-color: #1d2124;
}
.btn-lg i {
font-size: 1.5rem;
}
```


---

After finishing all code summary of .
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
<script>
fetch('../../Assets/Utils/cdn.html')
.then(response => response.text())
.then(data => document.head.insertAdjacentHTML('beforeend', data));
</script>
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
outputText.select();
document.execCommand('copy');
alert("Content copied to clipboard!");
}
});
});
```

SubPages\FileDiffer\FileDiffer.css:
```css

```

SubPages\FileDiffer\FileDiffer.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>File Differ</title>
<script>
fetch('../../Assets/Utils/cdn.html')
.then(response => response.text())
.then(data => document.head.insertAdjacentHTML('beforeend', data));
</script>
</head>
<body class="p-4">
<div class="container">
<h1 class="mb-3">File Differ Test</h1>
<button id="testBtn" class="btn btn-primary">Run Test</button>
<pre id="output" class="mt-3 p-2 bg-light border"></pre>
</div>
<p>not completed</p>
<script type="module" src="FileDiffer.js"></script>
</body>
</html>
```

SubPages\FileDiffer\FileDiffer.js:
```js
import BINGO from "../../Assets/Utils/Bingo.js";
document.getElementById("testBtn").addEventListener("click", () => {
const out = document.getElementById("output");
out.textContent = `PieValue is ${BINGO.PieValue}`;
});
```

SubPages\ImageResizer\ImageResizer.css:
```css
#preview {
max-height: 300px;
object-fit: contain;
}
.preview-container {
border: 2px dashed #dee2e6;
border-radius: 0.5rem;
background-color: #f8f9fa;
min-height: 200px;
display: flex;
align-items: center;
justify-content: center;
padding: 20px;
margin-bottom: 10px;
position: relative;
transition: all 0.3s ease;
overflow: hidden;
}
.preview-container:hover {
border-color: #adb5bd;
background-color: #f1f3f5;
}
.placeholder-content {
text-align: center;
color: #6c757d;
padding: 20px;
width: 100%;
}
.placeholder-icon {
font-size: 3rem;
margin-bottom: 1rem;
color: #adb5bd;
display: block;
}
.placeholder-content p {
margin: 0;
font-size: 0.9rem;
}
.preview-container img {
max-width: 100%;
max-height: 300px;
object-fit: contain;
display: block;
margin: 0 auto;
}
.preview-container img.d-none {
display: none;
}
.preview-container img:not(.d-none) + .placeholder-content {
display: none;
}
#originalPreview, #preview {
max-width: 100%;
max-height: 300px;
object-fit: contain;
}
#originalPreview.d-none,
#preview.d-none {
display: none;
}
#originalInfo, #resizedInfo {
background-color: #f8f9fa;
padding: 10px;
border-radius: 0.25rem;
margin-top: 10px;
font-size: 0.9em;
}
#originalInfo p, #resizedInfo p {
margin: 0.3rem 0;
}
```

SubPages\ImageResizer\ImageResizer.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Image Resizer</title>
<script>
fetch('../../Assets/Utils/cdn.html')
.then(res => res.text())
.then(data => document.head.insertAdjacentHTML('beforeend', data));
</script>
<link rel="stylesheet" href="ImageResizer.css" />
</head>
<body>
<div class="container my-5">
<h2 class="text-center mb-4">Image Resizer</h2>
<div class="mb-3">
<input type="file" id="inputImage" class="form-control" accept="image/*" />
</div>
<div class="row mb-4">
<div class="col-md-6">
<h5>Original</h5>
<div class="preview-container">
<div id="originalPlaceholder" class="placeholder-content">
<i class="bi bi-card-image placeholder-icon"></i>
<p>Upload an image to see the original</p>
</div>
<img id="originalPreview" class="img-fluid rounded shadow-sm d-none" alt="Original Preview" />
</div>
<div id="originalInfo" class="mt-2">
<p>Dimensions: <span id="originalDimensions">-</span></p>
<p>File Size: <span id="originalSize">-</span></p>
</div>
</div>
<div class="col-md-6">
<h5>Resized</h5>
<div class="preview-container">
<div id="resizedPlaceholder" class="placeholder-content">
<i class="bi bi-arrow-left-right placeholder-icon"></i>
<p>Adjust settings to see the resized version</p>
</div>
<img id="preview" class="img-fluid rounded shadow-sm d-none" alt="Resized Preview" />
</div>
<div id="resizedInfo" class="mt-2">
<p>Dimensions: <span id="resizedDimensions">-</span></p>
<p>File Size: <span id="resizedSize">-</span></p>
</div>
</div>
</div>
<div class="row g-3 mb-4">
<div class="col-md-5">
<label for="widthInput" class="form-label">Width (px)</label>
<input type="number" id="widthInput" class="form-control" min="1" />
</div>
<div class="col-md-5">
<label for="heightInput" class="form-label">Height (px)</label>
<input type="number" id="heightInput" class="form-control" min="1" />
</div>
<div class="col-md-2 d-flex align-items-end">
<div class="form-check form-switch">
<input class="form-check-input" type="checkbox" id="maintainAspect" checked>
<label class="form-check-label" for="maintainAspect">Lock Ratio</label>
</div>
</div>
<div class="col-12">
<label for="qualityInput" class="form-label">Quality: <span id="qualityLabel">90%</span></label>
<input type="range" id="qualityInput" class="form-range" min="0" max="1" step="0.01" value="0.9" />
</div>
</div>
<div class="text-center">
<button id="downloadBtn" class="btn btn-success d-none">Download Resized Image</button>
</div>
<canvas id="canvas" class="d-none"></canvas>
</div>
<script src="ImageResizer.js"></script>
</body>
</html>
```

SubPages\ImageResizer\ImageResizer.js:
```js
document.addEventListener("DOMContentLoaded", () => {
const inputImage = document.getElementById("inputImage");
const originalPreview = document.getElementById("originalPreview");
const preview = document.getElementById("preview");
const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const qualityInput = document.getElementById("qualityInput");
const qualityLabel = document.getElementById("qualityLabel");
const downloadBtn = document.getElementById("downloadBtn");
const maintainAspect = document.getElementById("maintainAspect");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const originalDimensions = document.getElementById("originalDimensions");
const originalSize = document.getElementById("originalSize");
const originalInfo = document.getElementById("originalInfo");
const originalPlaceholder = document.getElementById("originalPlaceholder");
const resizedPlaceholder = document.getElementById("resizedPlaceholder");
const resizedDimensions = document.getElementById("resizedDimensions");
const resizedSize = document.getElementById("resizedSize");
let originalImage = new Image();
let originalAspectRatio = 0;
let lastChangedInput = null;
const formatFileSize = (bytes) => {
if (bytes === 0) return "0 Bytes";
const k = 1024;
const sizes = ["Bytes", "KB", "MB", "GB"];
const i = Math.floor(Math.log(bytes) / Math.log(k));
return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
const dataURLtoBlob = (dataURL) => {
const byteString = atob(dataURL.split(",")[1]);
const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
const ab = new ArrayBuffer(byteString.length);
const ia = new Uint8Array(ab);
for (let i = 0; i < byteString.length; i++) {
ia[i] = byteString.charCodeAt(i);
}
return new Blob([ab], { type: mimeString });
};
const updateDimensions = (changedInput) => {
if (!maintainAspect.checked || !originalAspectRatio) return;
if (changedInput === "width") {
const newHeight = Math.round(widthInput.value / originalAspectRatio);
heightInput.value = newHeight;
} else if (changedInput === "height") {
const newWidth = Math.round(heightInput.value * originalAspectRatio);
widthInput.value = newWidth;
}
};
const updatePlaceholders = () => {
originalPlaceholder.style.display = originalImage.src ? "none" : "block";
resizedPlaceholder.style.display =
preview.src && !preview.classList.contains("d-none")
? "none"
: "block";
};
const updatePreview = () => {
if (!originalImage.src) return;
const newWidth = parseInt(widthInput.value) || originalImage.width;
const newHeight = parseInt(heightInput.value) || originalImage.height;
const quality = parseFloat(qualityInput.value);
canvas.width = newWidth;
canvas.height = newHeight;
ctx.clearRect(0, 0, canvas.width, canvas.height);
try {
ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
let ext = (downloadBtn.dataset.extension || "jpg").toLowerCase();
let outputFormat = "image/jpeg"; 
if (ext === "png") outputFormat = "image/png";
else if (ext === "webp") outputFormat = "image/webp";
const resizedDataUrl = canvas.toDataURL(outputFormat, quality);
preview.onload = () => {
preview.classList.remove("d-none");
updatePlaceholders();
};
preview.src = resizedDataUrl;
downloadBtn.classList.remove("d-none");
downloadBtn.dataset.url = resizedDataUrl;
downloadBtn.dataset.outputFormat = outputFormat;
resizedDimensions.textContent = `${newWidth} × ${newHeight} px`;
const resizedBlob = dataURLtoBlob(resizedDataUrl);
resizedSize.textContent = formatFileSize(resizedBlob.size);
} catch (error) {
console.error("Error resizing image:", error);
preview.classList.add("d-none");
updatePlaceholders();
}
};
inputImage.addEventListener("change", () => {
const file = inputImage.files[0];
if (!file) return;
const originalFileName = file.name;
const fileNameParts = originalFileName.split(".");
const fileExtension =
fileNameParts.length > 1 ? fileNameParts.pop().toLowerCase() : "jpg";
const fileNameWithoutExt = fileNameParts.join(".");
downloadBtn.dataset.originalName = fileNameWithoutExt;
downloadBtn.dataset.extension = fileExtension;
originalSize.textContent = formatFileSize(file.size);
originalInfo.style.display = "block";
const reader = new FileReader();
reader.onload = (e) => {
originalImage.onload = () => {
widthInput.value = originalImage.width;
heightInput.value = originalImage.height;
originalAspectRatio = originalImage.width / originalImage.height;
originalDimensions.textContent = `${originalImage.width} × ${originalImage.height} px`;
originalPreview.src = e.target.result;
originalPreview.classList.remove("d-none");
updatePreview();
updatePlaceholders();
};
originalImage.src = e.target.result;
};
reader.readAsDataURL(file);
});
qualityInput.addEventListener("input", () => {
const quality = Math.round(qualityInput.value * 100);
qualityLabel.textContent = `${quality}%`;
updatePreview();
});
widthInput.addEventListener("input", () => {
lastChangedInput = "width";
updateDimensions("width");
updatePreview();
});
heightInput.addEventListener("input", () => {
lastChangedInput = "height";
updateDimensions("height");
updatePreview();
});
maintainAspect.addEventListener("change", () => {
if (maintainAspect.checked && lastChangedInput) {
updateDimensions(lastChangedInput);
updatePreview();
}
});
downloadBtn.addEventListener("click", () => {
const link = document.createElement("a");
link.href = downloadBtn.dataset.url;
const width = widthInput.value;
const height = heightInput.value;
const originalName = downloadBtn.dataset.originalName || "resized";
let ext = (downloadBtn.dataset.extension || "jpg").toLowerCase();
if (!["jpg", "jpeg", "png", "webp"].includes(ext)) ext = "jpg";
link.download = `${originalName}_${width}x${height}.${ext}`;
link.click();
});
updatePlaceholders();
});
```

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

SubPages\Sequencer\Sequencer.css:
```css
body {
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
min-height: 100vh; 
background-color: #e9ecef;
margin: 0;
color: #343a40;
box-sizing: border-box; 
}
.game-container {
text-align: center;
width: 95%;
max-width: 1400px;
padding: 20px;
position: relative; 
top: 0; 
margin: 0 auto; 
z-index: 1; 
}
.game-area {
display: flex;
flex-wrap: nowrap;
gap: 20px;
margin-bottom: 20px;
height: calc(100vh - 300px);
position: relative;
z-index: 1;
}
.table-container {
flex: 1;
min-width: 49%;
overflow: auto;
background: white;
border-radius: 8px;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
padding: 15px;
}
.tiles-container {
flex: 1;
min-width: 49%;
display: flex;
flex-direction: column;
background: white;
border-radius: 8px;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
padding: 15px;
}
.table-responsive {
width: 100%;
overflow-x: auto;
overflow-y: auto;
min-height: 300px;
max-height: 70vh;
}
.headings-container {
display: inline-grid;
gap: 5px;
width: 100%;
margin-bottom: 5px;
}
.heading-tile {
font-weight: bold;
padding: 10px;
background-color: #f8f9fa;
border: 1px solid #dee2e6;
border-radius: 0.25rem;
box-shadow: 0 1px 2px rgba(0,0,0,0.05);
text-align: center;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}
.drop-zones-container {
display: inline-grid;
gap: 5px;
min-height: 200px;
width: 100%;
}
.drop-zone {
border: 1px dashed #ced4da;
min-height: 50px;
min-width: 100px;
display: flex;
justify-content: center;
align-items: center;
background-color: #e9ecef;
border-radius: 0.25rem;
transition: background-color 0.2s ease, border-color 0.2s ease;
padding: 5px;
text-align: center;
word-break: break-word;
}
.drop-zone.highlight {
background-color: #d1e7dd;
border-color: #198754;
}
.drop-zone.error {
background-color: #f8d7da;
border-color: #dc3545;
}
.shuffled-tiles-container {
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
gap: 10px;
min-height: 300px;
padding: 15px;
max-height: 70vh;
overflow-y: auto;
align-content: flex-start;
}
.tile {
padding: 10px 15px;
background-color: #0d6efd;
color: white;
border-radius: 0.25rem;
cursor: grab;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
transition: transform 0.2s ease-in-out, background-color 0.2s ease;
animation: popIn 0.3s ease-out forwards;
animation-delay: var(--animation-delay, 0s);
max-width: 200px;
word-break: break-word;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
}
.tile:active {
cursor: grabbing;
transform: scale(1.05);
}
.tile.correct {
background-color: #198754;
}
.tile.incorrect {
background-color: #dc3545;
}
.game-controls {
position: relative;
z-index: 10;
margin-top: 20px;
padding: 15px;
background: white;
border-radius: 8px;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.btn {
position: relative;
z-index: 5;
margin: 0 5px;
}
.feedback-message {
position: relative;
z-index: 5;
font-weight: bold;
text-align: center;
margin: 20px 0;
padding: 15px;
border-radius: 8px;
}
@keyframes popIn {
0% {
transform: scale(0.5);
opacity: 0;
}
80% {
transform: scale(1.05);
opacity: 1;
}
100% {
transform: scale(1);
opacity: 1;
}
}
.hidden {
display: none !important;
}
@media (max-width: 768px) {
.game-area {
flex-direction: column;
}
.table-container, .tiles-container {
width: 100%;
max-width: 100%;
}
.shuffled-tiles-container {
max-height: 300px;
}
}
```

SubPages\Sequencer\Sequencer.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Sequencer Memory Booster</title>
<script>
fetch('../../Assets/Utils/cdn.html')
.then(response => response.text())
.then(data => document.head.insertAdjacentHTML('beforeend', data));
</script>
<link rel="stylesheet" href="./Sequencer.css" />
</head>
<body>
<div class="container game-container">
<h3 class="text-center mb-2 text-primary">Sequencer Memory Booster</h3>
<div id="csv-input-section" class="card card-body shadow-sm mb-4">
<h2 class="text-center mb-3">Load Game Data</h2>
<div class="row mb-3">
<div class="col-md-6">
<label for="csvPasteArea" class="form-label">Paste CSV Data:</label>
<textarea
id="csvPasteArea"
class="form-control mb-2"
rows="5"
placeholder="Paste your CSV data here..."
></textarea>
<button id="loadCsvPasteBtn" class="btn btn-secondary w-100">
Load from Paste
</button>
</div>
<div class="col-md-6">
<label for="csvFileInput" class="form-label"
>Upload CSV File:</label
>
<input
type="file"
id="csvFileInput"
accept=".csv"
class="form-control mb-2"
/>
<button id="loadCsvFileBtn" class="btn btn-primary w-100">
Load from File
</button>
</div>
</div>
<div id="csv-feedback" class="alert mt-3 hidden" role="alert"></div>
</div>
<div id="game-elements-section" class="hidden">
<div class="mode-selection d-flex justify-content-center mb-4 gap-2">
<button id="learningModeBtn" class="btn btn-success">
Learning Mode
</button>
<button id="gameModeBtn" class="btn btn-info">Game Mode</button>
<button id="solveFirstColumnBtn" class="btn btn-secondary">
Solve 1st Column
</button>
<button id="submitBtn" class="btn btn-primary">Submit</button>
<button id="restartBtn" class="btn btn-warning">
<i class="bi bi-arrow-clockwise"></i>Reset
</button>
</div>
<div class="game-area row">
<div class="col-md-6">
<div class="table-container card card-body shadow-sm">
<h3 class="text-center mb-3">Table</h3>
<div class="table-responsive">
<div id="headings-container" class="headings-container"></div>
<div
id="drop-zones-container"
class="drop-zones-container bg-light p-3 rounded"
></div>
</div>
</div>
</div>
<div class="col-md-6">
<div class="tiles-container card card-body shadow-sm">
<h3 class="text-center mb-3">Tiles</h3>
<div
id="shuffled-tiles-container"
class="shuffled-tiles-container"
></div>
</div>
</div>
</div>
<div
id="feedback-message"
class="feedback-message mt-4 alert hidden"
role="alert"
></div>
</div>
</div>
<script
src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
crossorigin="anonymous"
></script>
<script type="module" src="./Sequencer_JSs/app.js"></script>
<script type="module" src="./Sequencer_JSs/dataLoader.js"></script>
<script type="module" src="./Sequencer_JSs/gameLogic.js"></script>
<script type="module" src="./Sequencer_JSs/tileGenerator.js"></script>
<script type="module" src="./Sequencer_JSs/uiManager.js"></script>
</body>
</html>
```

SubPages\Sequencer\Sequencer_JSs\app.js:
```js
import { dataLoader } from './dataLoader.js';
import { tileGenerator } from './tileGenerator.js';
import { gameLogic } from './gameLogic.js';
import { uiManager } from './uiManager.js';
const csvInputSection = document.getElementById('csv-input-section');
const gameElementsSection = document.getElementById('game-elements-section');
const csvFileInput = document.getElementById('csvFileInput');
const loadCsvFileBtn = document.getElementById('loadCsvFileBtn');
const csvPasteArea = document.getElementById('csvPasteArea');
const loadCsvPasteBtn = document.getElementById('loadCsvPasteBtn');
const csvFeedback = document.getElementById('csv-feedback');
const solveFirstColumnBtn = document.getElementById('solveFirstColumnBtn'); 
let gameData = null;
let allGameTiles = [];
let loadedTileRows = new Set();
function initApp() {
gameLogic.init(tileGenerator, uiManager);
setupEventListeners();
gameElementsSection.classList.add('hidden');
csvInputSection.classList.remove('hidden');
console.log("App initialized.");
}
function showCsvFeedback(message, type = 'error') {
csvFeedback.textContent = message;
csvFeedback.className = `alert mt-3 alert-${type === 'success' ? 'success' : 'danger'}`;
csvFeedback.classList.remove('hidden');
}
function hideCsvFeedback() {
csvFeedback.textContent = '';
csvFeedback.className = 'alert mt-3 hidden';
}
async function initializeGame(csvString) {
try {
uiManager.clearGameArea();
hideCsvFeedback();
showCsvFeedback('Loading game data...', 'info');
gameData = await dataLoader.loadCsvData(csvString);
if (!gameData || !gameData.data || gameData.data.length === 0) {
throw new Error("Invalid CSV data or no data rows found. Please check your input.");
}
gameData.originalCsvString = csvString;
const generatedElements = tileGenerator.generateTilesAndDropZones(gameData.data);
allGameTiles = generatedElements.shuffledTiles;
uiManager.renderHeadings(gameData.headers);
uiManager.renderDropZones(gameData.data, tileGenerator.createDropZoneElement);
loadedTileRows.clear();
for (let i = 0; i < gameData.data.length; i++) {
loadedTileRows.add(i);
}
renderVisibleTiles();
addDragDropListeners();
csvInputSection.classList.add('hidden');
gameElementsSection.classList.remove('hidden');
gameLogic.setMode('learning'); 
hideCsvFeedback();
console.log("Game initialized successfully with all CSV data.");
} catch (error) {
console.error("Error initializing game:", error);
showCsvFeedback(error.message || "An error occurred while loading the game.");
gameElementsSection.classList.add('hidden');
csvInputSection.classList.remove('hidden');
}
}
function renderVisibleTiles() {
const visibleTiles = allGameTiles.filter(tile => loadedTileRows.has(tile.originalRow));
uiManager.renderShuffledTiles(
visibleTiles,
tileGenerator.createTileElement.bind(tileGenerator)
);
console.log(`Rendered ${visibleTiles.length} visible tiles into the shuffled-tiles-container.`);
}
function addDragDropListeners() {
const shuffledTilesContainer = document.getElementById('shuffled-tiles-container');
const dropZonesContainer = document.getElementById('drop-zones-container');
if (gameLogic.handleDragStartBound) {
shuffledTilesContainer.removeEventListener('dragstart', gameLogic.handleDragStartBound);
dropZonesContainer.removeEventListener('dragover', gameLogic.handleDragOverBound);
dropZonesContainer.removeEventListener('dragleave', gameLogic.handleDragLeaveBound);
dropZonesContainer.removeEventListener('drop', gameLogic.handleDropBound);
dropZonesContainer.removeEventListener('dragstart', gameLogic.handleDropZoneDragStartBound);
}
gameLogic.handleDragStartBound = gameLogic.handleDragStart.bind(gameLogic);
gameLogic.handleDragOverBound = gameLogic.handleDragOver.bind(gameLogic);
gameLogic.handleDragLeaveBound = gameLogic.handleDragLeave.bind(gameLogic);
gameLogic.handleDropBound = gameLogic.handleDrop.bind(gameLogic);
gameLogic.handleDropZoneDragStartBound = handleDropZoneDragStart.bind(gameLogic);
shuffledTilesContainer.addEventListener('dragstart', gameLogic.handleDragStartBound);
dropZonesContainer.addEventListener('dragover', gameLogic.handleDragOverBound);
dropZonesContainer.addEventListener('dragleave', gameLogic.handleDragLeaveBound);
dropZonesContainer.addEventListener('drop', gameLogic.handleDropBound);
dropZonesContainer.addEventListener('dragstart', gameLogic.handleDropZoneDragStartBound);
console.log("Drag and drop listeners added.");
}
function handleDropZoneDragStart(event) {
if (event.target.classList.contains('tile') && this.mode === 'learning') {
gameLogic.handleDragStart(event);
} else {
event.preventDefault(); 
}
}
function solveFirstColumn() {
if (!gameData || !gameData.data || gameData.data.length === 0) {
uiManager.showFeedback("No game data loaded to solve.", 'info');
return;
}
uiManager.clearGameArea(); 
uiManager.renderHeadings(gameData.headers); 
uiManager.renderDropZones(gameData.data, tileGenerator.createDropZoneElement);
const firstColumnTiles = tileGenerator.allTiles.filter(tile => tile.originalCol === 0);
firstColumnTiles.sort((a, b) => a.originalRow - b.originalRow);
firstColumnTiles.forEach(tileData => {
const dropZone = document.querySelector(`.drop-zone[data-row="${tileData.originalRow}"][data-col="0"]`);
const tileElement = tileGenerator.createTileElement(tileData);
if (dropZone && tileElement) {
const currentTileElementInPool = document.querySelector(`#shuffled-tiles-container [data-id="${tileData.id}"]`);
if (currentTileElementInPool) {
currentTileElementInPool.remove();
}
if (dropZone.firstChild) {
gameLogic.returnTileToPool(dropZone.firstChild);
}
dropZone.appendChild(tileElement);
tileElement.classList.add('placed', 'correct'); 
gameLogic.placedTiles.set(tileData.id, {
element: tileElement,
expectedRow: tileData.originalRow,
expectedCol: tileData.originalCol,
actualRow: tileData.originalRow,
actualCol: 0 
});
}
});
const remainingTiles = tileGenerator.allTiles.filter(tile =>
!gameLogic.placedTiles.has(tile.id)
);
uiManager.renderShuffledTiles(remainingTiles, tileGenerator.createTileElement.bind(tileGenerator));
uiManager.showFeedback("First column tiles sorted and placed!", 'success');
console.log("First column solved.");
uiManager.submitBtn.classList.remove('hidden');
uiManager.restartBtn.classList.remove('hidden');
}
function setupEventListeners() {
loadCsvFileBtn.addEventListener('click', () => {
const file = csvFileInput.files[0];
if (file) {
const reader = new FileReader();
reader.onload = (e) => initializeGame(e.target.result);
reader.onerror = () => showCsvFeedback("Error reading file. Please try again.");
reader.readAsText(file);
} else {
showCsvFeedback("Please select a CSV file to upload.");
}
});
loadCsvPasteBtn.addEventListener('click', () => {
const csvString = csvPasteArea.value.trim();
if (csvString) {
initializeGame(csvString);
} else {
showCsvFeedback("Please paste CSV data into the text area.");
}
});
document.getElementById('learningModeBtn').addEventListener('click', () => {
gameLogic.setMode('learning');
if (gameData) {
loadedTileRows.clear();
for (let i = 0; i < gameData.data.length; i++) {
loadedTileRows.add(i);
}
renderVisibleTiles();
uiManager.renderDropZones(gameData.data, tileGenerator.createDropZoneElement);
addDragDropListeners();
}
});
document.getElementById('gameModeBtn').addEventListener('click', () => {
gameLogic.setMode('game');
if (gameData) {
uiManager.renderDropZones(gameData.data, tileGenerator.createDropZoneElement);
gameLogic.placedTiles.clear();
gameLogic.completedRows.clear();
loadedTileRows.clear(); 
for (let i = 0; i < gameData.data.length; i++) {
loadedTileRows.add(i);
}
renderVisibleTiles(); 
addDragDropListeners();
}
});
solveFirstColumnBtn.addEventListener('click', solveFirstColumn);
document.getElementById('submitBtn').addEventListener('click', () => {
gameLogic.handleSubmit();
});
document.getElementById('restartBtn').addEventListener('click', () => {
if (gameData && gameData.originalCsvString) {
initializeGame(gameData.originalCsvString);
} else {
gameElementsSection.classList.add('hidden');
csvInputSection.classList.remove('hidden');
showCsvFeedback("No game data loaded. Please load CSV data to restart.");
}
});
console.log("All main event listeners setup.");
}
document.addEventListener('DOMContentLoaded', initApp);
```

SubPages\Sequencer\Sequencer_JSs\dataLoader.js:
```js
export const dataLoader = {
async loadCsvData(csvString) {
if (!csvString) {
console.error("No CSV string provided.");
return null;
}
const lines = csvString.trim().split('\n');
if (lines.length < 2) {
console.error("CSV must contain at least a header and one data row.");
return null;
}
const headers = lines[0].split(',').map(header => header.trim());
const dataRows = lines.slice(1).map(line => {
const values = line.split(',').map(value => value.trim());
const rowObject = {};
headers.forEach((header, index) => {
rowObject[header] = values[index];
});
return rowObject;
});
return {
headers: headers,
data: dataRows,
originalCsvString: csvString 
};
}
};
```

SubPages\Sequencer\Sequencer_JSs\gameLogic.js:
```js
export const gameLogic = {
mode: 'learning',
placedTiles: new Map(),
score: 0,
completedRows: new Set(),
uiManager: null,
tileGenerator: null,
loadMoreTilesCallback: null,
init(tileGenerator, uiManager, loadMoreTilesCallback) {
this.tileGenerator = tileGenerator;
this.uiManager = uiManager;
this.loadMoreTilesCallback = loadMoreTilesCallback;
this.placedTiles.clear();
this.completedRows.clear();
this.score = 0;
console.log("GameLogic initialized. Mode:", this.mode);
},
setMode(mode) {
this.mode = mode;
this.placedTiles.clear();
this.completedRows.clear();
this.score = 0;
this.uiManager.hideFeedback();
this.uiManager.setMode(mode);
document.querySelectorAll('.drop-zone').forEach(dropZone => {
if (dropZone.firstChild) {
this.uiManager.shuffledTilesContainer.appendChild(dropZone.firstChild);
dropZone.firstChild.classList.remove('placed', 'correct', 'incorrect', 'dragging');
}
dropZone.classList.remove('highlight', 'error'); 
});
console.log(`Switched to ${mode} mode.`);
},
handleDragStart(event) {
if (this.mode === 'game' && event.target.closest('.drop-zone')) {
event.preventDefault(); 
console.log("Drag from dropzone prevented in GameMode.");
return;
}
event.dataTransfer.setData('text/plain', event.target.dataset.id);
event.target.classList.add('dragging');
console.log("Drag started:", event.target.dataset.id);
},
handleDragOver(event) {
event.preventDefault();
if (event.target.classList.contains('drop-zone')) {
event.target.classList.add('highlight');
}
},
handleDragLeave(event) {
event.target.classList.remove('highlight');
},
handleDrop(event) {
event.preventDefault();
event.target.classList.remove('highlight');
const tileId = event.dataTransfer.getData('text/plain');
const tileElement = document.querySelector(`[data-id="${tileId}"]`);
if (!tileElement) {
console.warn("Dropped tile element not found:", tileId);
return;
}
const dropZone = event.target.closest('.drop-zone');
if (!dropZone) {
console.warn("No drop zone found for drop event.");
return;
}
const dropZoneRow = parseInt(dropZone.dataset.row);
const dropZoneCol = parseInt(dropZone.dataset.col);
if (dropZone.hasChildNodes()) {
const existingTile = dropZone.firstChild;
if (existingTile.dataset.id !== tileId) { 
console.log(`Returning existing tile ${existingTile.dataset.id} from ${dropZoneRow},${dropZoneCol} to pool.`);
this.returnTileToPool(existingTile);
} else {
tileElement.classList.remove('dragging');
return;
}
}
dropZone.appendChild(tileElement);
tileElement.classList.add('placed');
tileElement.classList.remove('dragging');
console.log(`Tile ${tileId} dropped into row ${dropZoneRow}, col ${dropZoneCol}.`);
const originalTileData = this.tileGenerator.allTiles.find(t => t.id === tileId);
if (!originalTileData) {
console.error("Original tile data not found in tileGenerator.allTiles for ID:", tileId);
return;
}
const tilePlacementData = {
element: tileElement,
expectedRow: originalTileData.originalRow,
expectedCol: originalTileData.originalCol,
actualRow: dropZoneRow,
actualCol: dropZoneCol
};
this.placedTiles.set(tileId, tilePlacementData);
if (this.mode === 'game') {
this.checkPlacement(tileId);
this.checkRowCompletion(dropZoneRow);
} else {
this.highlightCorrectPlacement(tileId);
}
},
checkPlacement(tileId) {
const tileData = this.placedTiles.get(tileId);
if (!tileData) {
console.warn("No tile data found in placedTiles for ID:", tileId);
return false;
}
const isCorrect = tileData.expectedRow === tileData.actualRow &&
tileData.expectedCol === tileData.actualCol;
if (isCorrect) {
tileData.element.classList.add('correct');
tileData.element.classList.remove('incorrect');
} else {
tileData.element.classList.add('incorrect');
tileData.element.classList.remove('correct');
}
return isCorrect;
},
checkRowCompletion(row) {
if (this.completedRows.has(row)) {
console.log(`Row ${row + 1} already marked as completed correctly. Skipping check.`);
return;
}
const rowDropZones = document.querySelectorAll(`.drop-zone[data-row="${row}"]`);
console.log(`Checking row ${row + 1}. Total dropzones in row: ${rowDropZones.length}.`);
const isRowFullyOccupied = Array.from(rowDropZones).every(zone => zone.hasChildNodes());
console.log(`Row ${row + 1} fully occupied: ${isRowFullyOccupied}`);
if (isRowFullyOccupied) {
let allTilesInRowCorrect = true;
Array.from(rowDropZones).forEach(dropZone => {
const tileElement = dropZone.firstChild;
if (tileElement) {
const tileId = tileElement.dataset.id;
const isTileCorrect = this.checkPlacement(tileId);
if (!isTileCorrect) {
allTilesInRowCorrect = false;
console.log(`Tile ${tileId} in row ${row + 1} is incorrect.`);
}
} else {
allTilesInRowCorrect = false;
console.error(`Logic error: Dropzone in row ${row + 1} was empty, but isRowFullyOccupied was true.`);
}
});
if (allTilesInRowCorrect) {
this.completedRows.add(row);
this.score += 100;
this.uiManager.showFeedback(`Row ${row + 1} completed correctly! Score: ${this.score}`, 'success');
console.log(`Row ${row + 1} completed correctly. Score: ${this.score}. Calling loadMoreTilesCallback.`);
const totalDropZones = document.querySelectorAll('.drop-zone').length;
const numCols = this.tileGenerator.headers && Object.keys(this.tileGenerator.headers).length > 0 ?
this.tileGenerator.headers.length :
0;
const totalRowsInGame = (numCols > 0) ? (totalDropZones / numCols) : 0;
if (this.completedRows.size === totalRowsInGame && totalRowsInGame > 0) {
this.uiManager.showFeedback(`Congratulations! All rows completed! Final Score: ${this.score}`, 'success');
console.log("All rows completed!");
if (this.mode === 'game') {
}
}
} else {
this.uiManager.showFeedback(`Row ${row + 1} is filled, but some tiles are incorrect.`, 'error');
console.log(`Row ${row + 1} is filled, but incorrect.`);
}
}
},
highlightCorrectPlacement(tileId) {
const tileData = this.placedTiles.get(tileId);
if (!tileData) return;
const isCorrect = tileData.expectedRow === tileData.actualRow &&
tileData.expectedCol === tileData.actualCol;
if (isCorrect) {
tileData.element.classList.add('correct');
tileData.element.classList.remove('incorrect');
tileData.element.classList.remove('placed'); 
} else {
tileData.element.classList.add('incorrect');
tileData.element.classList.remove('correct');
tileData.element.classList.remove('placed'); 
}
},
handleSubmit() {
if (this.mode !== 'game') {
this.uiManager.showFeedback("Submit is only available in Game Mode.", 'info');
return;
}
let totalCorrectTiles = 0;
let totalPlacedTiles = 0;
const allDropZones = document.querySelectorAll('.drop-zone');
allDropZones.forEach(dropZone => {
if (dropZone.hasChildNodes()) {
totalPlacedTiles++;
const tileElement = dropZone.firstChild;
const tileId = tileElement.dataset.id;
if (this.checkPlacement(tileId)) {
totalCorrectTiles++;
}
}
});
if (totalPlacedTiles === 0) {
this.uiManager.showFeedback("No tiles placed yet. Drag and drop tiles into the table!", 'info');
return;
}
const totalPossibleTiles = document.querySelectorAll('.drop-zone').length;
if (totalCorrectTiles === totalPossibleTiles) {
this.uiManager.showFeedback(`Fantastic! All ${totalCorrectTiles} tiles placed are correct! Final Score: ${this.score}`, 'success');
} else {
this.uiManager.showFeedback(`You got ${totalCorrectTiles} out of ${totalPossibleTiles} tiles correct. Keep trying! Score: ${this.score}`, 'error');
}
console.log(`Submit clicked. Total placed: ${totalPlacedTiles}, Total correct: ${totalCorrectTiles}, Total possible: ${totalPossibleTiles}`);
},
returnTileToPool(tileElement) {
const shuffledTilesContainer = document.getElementById('shuffled-tiles-container');
if (shuffledTilesContainer) {
shuffledTilesContainer.appendChild(tileElement);
tileElement.classList.remove('placed', 'correct', 'incorrect', 'dragging');
this.placedTiles.delete(tileElement.dataset.id);
console.log(`Tile ${tileElement.dataset.id} returned to pool.`);
}
}
};
```

SubPages\Sequencer\Sequencer_JSs\tileGenerator.js:
```js
export const tileGenerator = {
allTiles: [],
currentShuffledTiles: [],
headers: [],
generateTilesAndDropZones(data) {
this.allTiles = [];
this.headers = Object.keys(data[0] || {});
const correctPlacements = [];
data.forEach((row, rowIndex) => {
Object.entries(row).forEach(([header, value], colIndex) => {
const tileId = `tile-${rowIndex}-${header}`;
const tileData = {
id: tileId,
value: value,
originalRow: rowIndex,
originalHeader: header,
originalCol: colIndex,
row: rowIndex,
col: colIndex
};
this.allTiles.push(tileData);
correctPlacements.push({
expectedValue: value,
expectedRow: rowIndex,
expectedCol: colIndex,
tileId: tileId,
header: header
});
});
});
this.currentShuffledTiles = [...this.allTiles];
this.shuffleCurrentTiles();
console.log(`Generated ${this.allTiles.length} tiles`);
return { 
shuffledTiles: this.currentShuffledTiles, 
correctPlacements,
headers: this.headers
};
},
shuffleCurrentTiles() {
for (let i = this.currentShuffledTiles.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[this.currentShuffledTiles[i], this.currentShuffledTiles[j]] = 
[this.currentShuffledTiles[j], this.currentShuffledTiles[i]];
}
},
createTileElement(tileData, index) {
const tileDiv = document.createElement('div');
tileDiv.classList.add('tile');
tileDiv.setAttribute('draggable', 'true');
tileDiv.dataset.id = tileData.id;
tileDiv.dataset.row = tileData.row;
tileDiv.dataset.col = tileData.col;
tileDiv.textContent = tileData.value;
tileDiv.title = tileData.value;
tileDiv.style.setProperty('--animation-delay', `${index * 0.05}s`);
return tileDiv;
},
createDropZoneElement(row, col) {
const dropZoneDiv = document.createElement('div');
dropZoneDiv.classList.add('drop-zone');
dropZoneDiv.dataset.row = row;
dropZoneDiv.dataset.col = col;
dropZoneDiv.dataset.accepts = `tile-${row}-*`;
return dropZoneDiv;
},
createHeadingElement(heading) {
const headingDiv = document.createElement('div');
headingDiv.classList.add('heading-tile');
headingDiv.textContent = heading;
headingDiv.title = heading;
return headingDiv;
}
};
```

SubPages\Sequencer\Sequencer_JSs\uiManager.js:
```js
export const uiManager = {
headingsContainer: document.getElementById('headings-container'),
dropZonesContainer: document.getElementById('drop-zones-container'),
shuffledTilesContainer: document.getElementById('shuffled-tiles-container'),
feedbackMessage: document.getElementById('feedback-message'),
submitBtn: document.getElementById('submitBtn'),
restartBtn: document.getElementById('restartBtn'),
renderHeadings(headers) {
this.headingsContainer.innerHTML = '';
this.headingsContainer.style.gridTemplateColumns = `repeat(${headers.length},minmax(80px,1fr))`;
headers.forEach(header => {
const headingDiv = document.createElement('div');
headingDiv.classList.add('heading-tile');
headingDiv.textContent = header;
this.headingsContainer.appendChild(headingDiv);
});
console.log(`Rendered headings for ${headers.length} columns.`);
},
renderDropZones(data, createDropZoneElement) {
this.dropZonesContainer.innerHTML = '';
if (!data || data.length === 0) return;
const numRows = data.length;
const numCols = Object.keys(data[0]).length;
this.dropZonesContainer.style.gridTemplateColumns = `repeat(${numCols},minmax(80px,1fr))`;
this.dropZonesContainer.style.gridTemplateRows = `repeat(${numRows},auto)`;
for (let row = 0; row < numRows; row++) {
for (let col = 0; col < numCols; col++) {
const dropZone = createDropZoneElement(row, col);
this.dropZonesContainer.appendChild(dropZone);
}
}
console.log(`Rendered ${numRows} rows and ${numCols} columns of dropzones.`);
},
renderShuffledTiles(shuffledTiles, createTileElement) {
this.shuffledTilesContainer.innerHTML = '';
shuffledTiles.forEach((tileData, index) => {
const tileElement = createTileElement(tileData, index);
this.shuffledTilesContainer.appendChild(tileElement);
});
console.log(`Rendered ${shuffledTiles.length} shuffled tiles into the pool.`);
},
clearGameArea() {
this.headingsContainer.innerHTML = '';
this.dropZonesContainer.innerHTML = '';
this.shuffledTilesContainer.innerHTML = '';
this.hideFeedback();
console.log("Game area cleared. Button visibility now managed by setMode or specific functions.");
},
showFeedback(message, type = 'info') {
this.feedbackMessage.textContent = message;
this.feedbackMessage.className = 'alert'; 
switch (type.toLowerCase()) {
case 'success':
this.feedbackMessage.classList.add('alert-success');
break;
case 'error':
this.feedbackMessage.classList.add('alert-danger');
break;
case 'info':
default:
this.feedbackMessage.classList.add('alert-info');
}
this.feedbackMessage.classList.remove('hidden');
},
hideFeedback() {
this.feedbackMessage.textContent = '';
this.feedbackMessage.className = 'alert hidden';
},
setMode(mode) {
if (mode === 'game') {
this.submitBtn.classList.remove('hidden');
this.restartBtn.classList.remove('hidden');
console.log("Submit and Restart buttons shown (Game Mode).");
} else { 
this.submitBtn.classList.add('hidden'); 
this.restartBtn.classList.remove('hidden');
console.log("Submit button hidden, Restart button visible (Learning Mode).");
}
}
};
```

SubPages\Tools.css:
```css
body {
background-color: #f8f9fa;
}
.password-container {
display: flex;
justify-content: center;
align-items: center;
min-height: 80vh;
text-align: center;
}
.tool-card {
transition: transform 0.2s;
}
.tool-card:hover {
transform: translateY(-5px);
}
@keyframes shake {
0% { transform: translateX(0); }
25% { transform: translateX(-5px); }
50% { transform: translateX(5px); }
75% { transform: translateX(-5px); }
100% { transform: translateX(0); }
}
.shake {
animation: shake 0.4s;
}
```

SubPages\Tools.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Developer Tools</title>
<script>
fetch('../Assets/Utils/cdn.html')
.then(response => response.text())
.then(data => document.head.insertAdjacentHTML('beforeend', data));
</script>
<link rel="stylesheet" href="../style.css">
<link rel="stylesheet" href="Tools.css">
</head>
<body>
<div id="password-protection" class="password-container">
<div class="card p-4 shadow-sm" style="max-width: 400px; width: 100%;">
<h4 class="card-title text-center mb-4">Enter Password to Access Personal Tools</h4>
<div class="mb-3">
<input type="password" class="form-control" id="passwordInput" placeholder="Enter value of PI">
</div>
<button class="btn btn-primary" id="submitPassword">Access Tools</button>
<p id="passwordError" class="text-danger mt-3 d-none">Incorrect password. Please try again.</p>
</div>
</div>
<div id="tools-content" class="container my-5 d-none">
<h1 class="text-center mb-5">My Developer Tools & Utilities</h1>
<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
<div class="col">
<div class="card h-100 tool-card">
<div class="card-body text-center">
<i class="fas fa-language fa-3x mb-3 text-primary"></i>
<h5 class="card-title">Vocabulary Translator</h5>
<p class="card-text">English, Marathi & Hindi translator.</p>
<a href="./Vocabulary/Vocabulary.html" class="btn btn-outline-primary mt-3">Go to Tool</a>
</div>
</div>
</div>
<div class="col">
<div class="card h-100 tool-card">
<div class="card-body text-center">
<i class="fas fa-brain fa-3x mb-3 text-success"></i>
<h5 class="card-title">Sequencer Memory Booster</h5>
<p class="card-text">Boost your memory and cognitive skills by arranging sequences from CSV data.</p>
<a href="./Sequencer/Sequencer.html" class="btn btn-outline-success mt-3">Go to Tool</a>
</div>
</div>
</div>
<div class="col">
<div class="card h-100 tool-card">
<div class="card-body text-center">
<i class="fas fa-file-code fa-3x mb-3 text-danger"></i>
<h5 class="card-title">Text Data Converter</h5>
<p class="card-text">Convert between CSV, JSON.</p>
<a href="./DataConverter/DataConverter.html" class="btn btn-outline-danger mt-3">Go to Tool</a>
</div>
</div>
</div>
<div class="col">
<div class="card h-100 tool-card">
<div class="card-body text-center">
<i class="fas fa-image fa-3x mb-3 text-info"></i>
<h5 class="card-title">Image Resizer</h5>
<p class="card-text">Resize image dimensions & compress file size.</p>
<a href="./ImageResizer/ImageResizer.html" class="btn btn-outline-info mt-3">Go to Tool</a>
</div>
</div>
</div>
<div class="col">
<div class="card h-100 tool-card">
<div class="card-body text-center">
<i class="fas fa-newspaper fa-3x mb-3 text-dark"></i>
<h5 class="card-title">Newspaper Business Tracker</h5>
<p class="card-text">Track billing, retail sales & changes easily.</p>
<a href="./NBT/NBT.html" class="btn btn-outline-dark mt-3">Go to Tool</a>
</div>
</div>
</div>
<div class="col">
<div class="card h-100 tool-card">
<div class="card-body text-center">
<i class="fas fa-code-branch fa-3x mb-3 text-warning"></i>
<h5 class="card-title">File Differ</h5>
<p class="card-text">Coming soon.</p>
<a href="./FileDiffer/FileDiffer.html" class="btn btn-outline-warning mt-3">Go to Tool</a>
</div>
</div>
</div>
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script type="module" src="Tools.js"></script>
</body>
</html>
```

SubPages\Tools.js:
```js
import BINGO from "../Assets/Utils/Bingo.js"; 
document.addEventListener('DOMContentLoaded', function () {
const correctPassword = BINGO.PieValue;
const passwordInput = document.getElementById('passwordInput');
const submitPasswordBtn = document.getElementById('submitPassword');
const passwordProtectionDiv = document.getElementById('password-protection');
const card = passwordProtectionDiv.querySelector(".card");
const toolsContentDiv = document.getElementById('tools-content');
const passwordError = document.getElementById('passwordError');
if (sessionStorage.getItem('accessGranted') === 'true') {
passwordProtectionDiv.classList.add('d-none');
toolsContentDiv.classList.remove('d-none');
}
function handleIncorrectPassword() {
passwordInput.value = '';
passwordError.classList.remove('d-none');
card.classList.add('shake');
setTimeout(() => card.classList.remove('shake'), 400);
setTimeout(() => passwordError.classList.add('d-none'), 3000);
}
submitPasswordBtn.addEventListener('click', function () {
submitPasswordBtn.disabled = true;
setTimeout(() => { submitPasswordBtn.disabled = false; }, 1000);
if (passwordInput.value === correctPassword) {
passwordProtectionDiv.classList.add('d-none');
toolsContentDiv.classList.remove('d-none');
sessionStorage.setItem('accessGranted', 'true');
} else {
handleIncorrectPassword();
}
});
passwordInput.addEventListener('keypress', function (event) {
if (event.key === 'Enter') {
submitPasswordBtn.click();
}
});
});
```

SubPages\Vocabulary\Vocabulary.css:
```css
body {
background-color: #e9ecef;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.container {
max-width: 800px;
}
h1.text-primary {
font-weight: 700;
}
.card {
border: none;
border-radius: 0.75rem;
}
.form-control-lg {
border-radius: 0.5rem;
}
.btn-lg {
border-radius: 0.5rem;
}
#marathiOutput,
#hindiOutput,
#englishOutput {
font-size: 1.1rem;
font-weight: 500;
line-height: 1.5;
word-wrap: break-word;
overflow-wrap: break-word;
}
#marathiResultContainer,
#hindiResultContainer,
#englishResultContainer {
padding: 1rem;
border-left: 5px solid;
border-radius: 0.25rem;
color: #333;
box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
min-height: 120px;
display: flex;
flex-direction: column;
}
#marathiResultContainer {
border-color: #FF6F00;
background-color: rgba(255, 111, 0, 0.08);
}
#marathiResultContainer h5 {
color: #FF6F00;
margin-bottom: 0.5rem;
}
#hindiResultContainer {
border-color: #5A2377;
background-color: rgba(90, 35, 119, 0.08);
}
#hindiResultContainer h5 {
color: #5A2377;
margin-bottom: 0.5rem;
}
#englishResultContainer {
border-color: #1565C0;
background-color: rgba(21, 101, 192, 0.08);
}
#englishResultContainer h5 {
color: #1565C0;
margin-bottom: 0.5rem;
}
#errorMessage, #loadingMessage, #noResultFound {
font-style: italic;
font-weight: 500;
text-align: center;
width: 100%;
}
#errorMessage {
color: #dc3545;
}
#loadingMessage .spinner-border {
color: #007bff !important;
}
.spinner-border {
width: 2rem;
height: 2rem;
}
#translationOutput {
padding-right: 0;
}
#csvOutputDisplay { 
font-family: 'Consolas', 'Menlo', monospace; 
font-size: 1rem;
padding: 0.75rem 1rem;
background-color: #f8f9fa; 
border: 1px solid #dee2e6; 
border-radius: 0.5rem;
white-space: nowrap; 
overflow-x: auto; 
cursor: copy; 
color: #212529;
min-height: 48px; 
display: flex; 
align-items: center; 
}
.container .card:first-of-type {
margin-bottom: 1rem !important; 
}
.card .mb-4 { 
margin-bottom: 1rem !important;
}
.card .mt-4 { 
margin-top: 1rem !important;
}
.text-center.mt-5 { 
margin-top: 2rem !important;
}
#copyFeedback {
z-index: 10; 
font-size: 0.85rem;
padding: 0.25em 0.6em;
border-radius: 0.25rem;
white-space: nowrap;
}
@media (max-width: 767.98px) {
.col-12.col-md-4 {
margin-bottom: 1rem !important;
}
#marathiOutput,
#hindiOutput,
#englishOutput {
font-size: 1.25rem;
}
}
@media (max-width: 575.98px) {
.form-label.fs-5 {
font-size: 1.1rem !important;
}
.form-control-lg {
font-size: 1rem;
padding: 0.75rem 1rem;
}
.card-title {
font-size: 1.5rem;
}
}
```

SubPages\Vocabulary\Vocabulary.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Universal Vocabulary Translator - Ganesh Chougale</title>
<script>
fetch('../../Assets/Utils/cdn.html')
.then(response => response.text())
.then(data => document.head.insertAdjacentHTML('beforeend', data));
</script>
<link rel="stylesheet" href="Vocabulary.css">
</head>
<body>
<div class="container my-3">
<div class="card p-4 shadow-sm mb-5">
<div class="mb-3">
<input type="text" class="form-control form-control-lg" id="universalInput" placeholder="Type any word to translate..." autofocus>
</div>
<div id="loadingMessage" class="text-center mt-3 d-none">
<div class="spinner-border text-primary" role="status">
<span class="visually-hidden">Loading...</span>
</div>
<p class="mt-2 text-muted">Translating...</p>
</div>
<p id="errorMessage" class="text-danger text-center mt-3 d-none"></p>
</div>
<div class="card p-4 shadow-sm">
<h3 class="card-title mb-4">Translations:</h3>
<div class="row" id="translationOutput">
<div class="col-12 col-md-4 mb-3 d-none" id="marathiResultContainer">
<h5 class="text-primary"><i class="fas fa-language me-2"></i> Marathi:</h5>
<p id="marathiOutput" class="lead ms-2"></p>
</div>
<div class="col-12 col-md-4 mb-3 d-none" id="hindiResultContainer">
<h5 class="text-success"><i class="fas fa-language me-2"></i> Hindi:</h5>
<p id="hindiOutput" class="lead ms-2"></p>
</div>
<div class="col-12 col-md-4 mb-3 d-none" id="englishResultContainer">
<h5 class="text-info"><i class="fas fa-language me-2"></i> English:</h5>
<p id="englishOutput" class="lead ms-2"></p>
</div>
<div class="col-12 d-none" id="noResultFoundContainer"> <p id="noResultFound" class="text-muted text-center mt-3 d-none">No translation found for the entered word.</p>
</div>
</div>
<div id="csvOutputContainer" class="mt-4 p-3 border rounded bg-light d-none">
<h5 class="mb-3">CSV Output</h5>
<div id="csvOutputDisplay" class="text-muted"></div>
<span id="copyFeedback" class="position-absolute translate-middle-x badge bg-success d-none" style="bottom: -15px; left: 50%;">Copied!</span>
</div>
</div>
<div class="text-center mt-5">
<a href="../Tools.html" class="btn btn-secondary btn-lg">
<i class="fas fa-arrow-left me-2"></i> Back to Tools
</a>
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
crossorigin="anonymous"></script>
<script src="Vocabulary.js"></script>
</body>
</html>
```

SubPages\Vocabulary\Vocabulary.js:
```js
document.addEventListener("DOMContentLoaded", () => {
const universalInput = document.getElementById("universalInput");
const marathiResultContainer = document.getElementById(
"marathiResultContainer"
);
const hindiResultContainer = document.getElementById("hindiResultContainer");
const englishResultContainer = document.getElementById(
"englishResultContainer"
);
const marathiOutput = document.getElementById("marathiOutput");
const hindiOutput = document.getElementById("hindiOutput");
const englishOutput = document.getElementById("englishOutput");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");
const noResultFound = document.getElementById("noResultFound");
const noResultFoundContainer = document.getElementById(
"noResultFoundContainer"
);
const csvOutputContainer = document.getElementById("csvOutputContainer"); 
const csvOutputDisplay = document.getElementById("csvOutputDisplay"); 
const copyFeedback = document.getElementById("copyFeedback");
function toCapitalCase(str) {
return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
let debounceTimer;
const debounce = (func, delay) => {
clearTimeout(debounceTimer);
debounceTimer = setTimeout(func, delay);
};
async function fetchTranslation(text, targetLang) {
if (!text || text.trim() === "") {
return "";
}
const url = `https:
text
)}`;
try {
const response = await fetch(url);
if (!response.ok) {
throw new Error(`HTTP error! Status: ${response.status}`);
}
const data = await response.json();
if (data && data[0] && Array.isArray(data[0][0]) && data[0][0][0]) {
return data[0][0][0]; 
} else if (data && data[0] && typeof data[0][0] === "string") {
return data[0][0]; 
} else {
console.warn("Unexpected API response structure:", data);
return ""; 
}
} catch (error) {
console.error(`Error translating to ${targetLang}:`, error);
return ""; 
}
}
function displayResults(translations, originalWord) {
marathiResultContainer.classList.add("d-none");
hindiResultContainer.classList.add("d-none");
englishResultContainer.classList.add("d-none");
noResultFound.classList.add("d-none");
if (noResultFoundContainer) {
noResultFoundContainer.classList.add("d-none");
}
errorMessage.classList.add("d-none");
csvOutputContainer.classList.add("d-none"); 
let hasTranslation = false;
let marathiTrans = "";
let hindiTrans = "";
let englishTrans = "";
if (translations.marathi && translations.marathi !== "") {
marathiOutput.textContent = translations.marathi;
marathiResultContainer.classList.remove("d-none");
marathiTrans = translations.marathi;
hasTranslation = true;
}
if (translations.hindi && translations.hindi !== "") {
hindiOutput.textContent = translations.hindi;
hindiResultContainer.classList.remove("d-none");
hindiTrans = translations.hindi;
hasTranslation = true;
}
if (translations.english && translations.english !== "") {
englishOutput.textContent = translations.english;
englishResultContainer.classList.remove("d-none");
englishTrans = translations.english;
hasTranslation = true;
}
if (hasTranslation) {
csvOutputDisplay.textContent = `${toCapitalCase(
translations.english
)}, ${marathiTrans}, ${hindiTrans}`;
csvOutputContainer.classList.remove("d-none"); 
} else if (originalWord.trim() !== "") {
noResultFound.classList.remove("d-none");
if (noResultFoundContainer) {
noResultFoundContainer.classList.remove("d-none");
}
csvOutputContainer.classList.add("d-none"); 
}
if (!hasTranslation && originalWord.trim() === "") {
csvOutputDisplay.textContent = "";
}
}
async function handleTranslation() {
const text = universalInput.value.trim();
if (text === "") {
displayResults({}); 
noResultFound.classList.add("d-none");
if (noResultFoundContainer) {
noResultFoundContainer.classList.add("d-none");
}
errorMessage.classList.add("d-none");
loadingMessage.classList.add("d-none");
csvOutputContainer.classList.add("d-none"); 
csvOutputDisplay.textContent = ""; 
return;
}
loadingMessage.classList.remove("d-none");
errorMessage.classList.add("d-none");
noResultFound.classList.add("d-none");
if (noResultFoundContainer) {
noResultFoundContainer.classList.add("d-none");
}
csvOutputContainer.classList.add("d-none"); 
csvOutputDisplay.textContent = ""; 
try {
const translations = {};
const targetLanguages = ["en", "mr", "hi"];
const promises = targetLanguages.map((target) =>
fetchTranslation(text, target).then((result) => ({ target, result }))
);
const results = await Promise.all(promises);
results.forEach(({ target, result }) => {
if (target === "mr") translations.marathi = result;
if (target === "hi") translations.hindi = result;
if (target === "en") translations.english = result;
});
displayResults(translations, text);
} catch (error) {
console.error("Overall translation error:", error);
errorMessage.textContent =
"An error occurred during translation. Please try again.";
errorMessage.classList.remove("d-none");
displayResults({}); 
csvOutputContainer.classList.add("d-none"); 
csvOutputDisplay.textContent = ""; 
} finally {
loadingMessage.classList.add("d-none");
}
}
csvOutputContainer.addEventListener("click", async () => {
const textToCopy = csvOutputDisplay.textContent;
if (textToCopy) {
try {
await navigator.clipboard.writeText(textToCopy);
copyFeedback.classList.remove("d-none");
setTimeout(() => {
copyFeedback.classList.add("d-none");
}, 1500); 
} catch (err) {
console.error("Failed to copy text: ", err);
}
}
});
universalInput.addEventListener("input", () => {
debounce(handleTranslation, 500);
});
});
```

