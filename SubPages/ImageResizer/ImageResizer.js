document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
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

  // Info display elements
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

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Convert dataURL → Blob (for accurate file size)
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

  // Update dimensions while maintaining aspect ratio
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

  // Show/hide placeholders
  const updatePlaceholders = () => {
    originalPlaceholder.style.display = originalImage.src ? "none" : "block";
    resizedPlaceholder.style.display =
      preview.src && !preview.classList.contains("d-none")
        ? "none"
        : "block";
  };

  // Update preview with current settings
  const updatePreview = () => {
    if (!originalImage.src) return;

    const newWidth = parseInt(widthInput.value) || originalImage.width;
    const newHeight = parseInt(heightInput.value) || originalImage.height;
    const quality = parseFloat(qualityInput.value);

    // Update canvas with new dimensions
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    try {
      ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);

      // Pick correct format from original extension
      let ext = (downloadBtn.dataset.extension || "jpg").toLowerCase();
      let outputFormat = "image/jpeg"; // default
      if (ext === "png") outputFormat = "image/png";
      else if (ext === "webp") outputFormat = "image/webp";

      // PNG ignores quality param, JPEG/WEBP use it
      const resizedDataUrl = canvas.toDataURL(outputFormat, quality);

      // Update preview
      preview.onload = () => {
        preview.classList.remove("d-none");
        updatePlaceholders();
      };
      preview.src = resizedDataUrl;

      // Store for download
      downloadBtn.classList.remove("d-none");
      downloadBtn.dataset.url = resizedDataUrl;
      downloadBtn.dataset.outputFormat = outputFormat;

      // Update resized info
      resizedDimensions.textContent = `${newWidth} × ${newHeight} px`;
      const resizedBlob = dataURLtoBlob(resizedDataUrl);
      resizedSize.textContent = formatFileSize(resizedBlob.size);
    } catch (error) {
      console.error("Error resizing image:", error);
      preview.classList.add("d-none");
      updatePlaceholders();
    }
  };

  // Event Listeners
  inputImage.addEventListener("change", () => {
    const file = inputImage.files[0];
    if (!file) return;

    // Store original filename + extension
    const originalFileName = file.name;
    const fileNameParts = originalFileName.split(".");
    const fileExtension =
      fileNameParts.length > 1 ? fileNameParts.pop().toLowerCase() : "jpg";
    const fileNameWithoutExt = fileNameParts.join(".");

    // Store for download
    downloadBtn.dataset.originalName = fileNameWithoutExt;
    downloadBtn.dataset.extension = fileExtension;

    // Display original file info
    originalSize.textContent = formatFileSize(file.size);
    originalInfo.style.display = "block";

    // Load and display original image
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

  // Update quality label
  qualityInput.addEventListener("input", () => {
    const quality = Math.round(qualityInput.value * 100);
    qualityLabel.textContent = `${quality}%`;
    updatePreview();
  });

  // Handle width/height changes
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

  // Toggle aspect ratio lock
  maintainAspect.addEventListener("change", () => {
    if (maintainAspect.checked && lastChangedInput) {
      updateDimensions(lastChangedInput);
      updatePreview();
    }
  });

  // Download button
  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = downloadBtn.dataset.url;
    const width = widthInput.value;
    const height = heightInput.value;
    const originalName = downloadBtn.dataset.originalName || "resized";

    // Ensure extension matches actual format
    let ext = (downloadBtn.dataset.extension || "jpg").toLowerCase();
    if (!["jpg", "jpeg", "png", "webp"].includes(ext)) ext = "jpg";

    link.download = `${originalName}_${width}x${height}.${ext}`;
    link.click();
  });

  // Init placeholders
  updatePlaceholders();
});
