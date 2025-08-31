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
<input type="range" id="qualityInput" class="form-range" min="0.1" max="1" step="0.1" value="0.9" />
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
let originalFileSize = 0;
let lastChangedInput = null;
const formatFileSize = (bytes) => {
if (bytes === 0) return '0 Bytes';
const k = 1024;
const sizes = ['Bytes', 'KB', 'MB', 'GB'];
const i = Math.floor(Math.log(bytes) / Math.log(k));
return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
const updateDimensions = (changedInput) => {
if (!maintainAspect.checked || !originalAspectRatio) return;
if (changedInput === 'width') {
const newHeight = Math.round(widthInput.value / originalAspectRatio);
heightInput.value = newHeight;
} else if (changedInput === 'height') {
const newWidth = Math.round(heightInput.value * originalAspectRatio);
widthInput.value = newWidth;
}
};
const updatePlaceholders = () => {
originalPlaceholder.style.display = originalImage.src ? 'none' : 'block';
resizedPlaceholder.style.display = (preview.src && !preview.classList.contains('d-none')) ? 'none' : 'block';
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
const resizedDataUrl = canvas.toDataURL("image/jpeg", quality);
preview.onload = () => {
preview.classList.remove("d-none");
updatePlaceholders();
};
preview.src = resizedDataUrl;
downloadBtn.classList.remove("d-none");
downloadBtn.dataset.url = resizedDataUrl;
resizedDimensions.textContent = `${newWidth} × ${newHeight} px`;
const resizedFileSize = Math.round((resizedDataUrl.length - 22) * 3 / 4);
resizedSize.textContent = formatFileSize(resizedFileSize);
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
const fileNameParts = originalFileName.split('.');
const fileExtension = fileNameParts.length > 1 ? fileNameParts.pop() : '';
const fileNameWithoutExt = fileNameParts.join('.');
downloadBtn.dataset.originalName = fileNameWithoutExt;
downloadBtn.dataset.extension = fileExtension;
originalFileSize = file.size;
originalSize.textContent = formatFileSize(originalFileSize);
originalInfo.style.display = 'block';
const reader = new FileReader();
reader.onload = e => {
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
lastChangedInput = 'width';
updateDimensions('width');
updatePreview();
});
heightInput.addEventListener("input", () => {
lastChangedInput = 'height';
updateDimensions('height');
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
const originalName = downloadBtn.dataset.originalName || 'resized';
const extension = downloadBtn.dataset.extension ? `.${downloadBtn.dataset.extension}` : '.jpg';
link.download = `${originalName}_${width}x${height}${extension}`;
link.click();
});
updatePlaceholders();
});
```

