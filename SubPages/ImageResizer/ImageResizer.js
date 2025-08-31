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
  let originalFileSize = 0;
  let lastChangedInput = null;

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Update dimensions while maintaining aspect ratio
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

  // Show/hide placeholders
  const updatePlaceholders = () => {
    originalPlaceholder.style.display = originalImage.src ? 'none' : 'block';
    resizedPlaceholder.style.display = (preview.src && !preview.classList.contains('d-none')) ? 'none' : 'block';
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

    // Draw resized image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    try {
      ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
      
      // Get resized image data URL
      const resizedDataUrl = canvas.toDataURL("image/jpeg", quality);
      
      // Update preview
      preview.onload = () => {
        preview.classList.remove("d-none");
        updatePlaceholders();
      };
      preview.src = resizedDataUrl;
      
      downloadBtn.classList.remove("d-none");
      downloadBtn.dataset.url = resizedDataUrl;
      
      // Update resized dimensions display
      resizedDimensions.textContent = `${newWidth} × ${newHeight} px`;
      
      // Calculate and display resized file size
      const resizedFileSize = Math.round((resizedDataUrl.length - 22) * 3 / 4);
      resizedSize.textContent = formatFileSize(resizedFileSize);
      
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

    // Store original filename and extension
    const originalFileName = file.name;
    const fileNameParts = originalFileName.split('.');
    const fileExtension = fileNameParts.length > 1 ? fileNameParts.pop() : '';
    const fileNameWithoutExt = fileNameParts.join('.');
    
    // Store for download
    downloadBtn.dataset.originalName = fileNameWithoutExt;
    downloadBtn.dataset.extension = fileExtension;

    // Display original file info
    originalFileSize = file.size;
    originalSize.textContent = formatFileSize(originalFileSize);
    originalInfo.style.display = 'block';

    // Load and display original image
    const reader = new FileReader();
    reader.onload = e => {
      originalImage.onload = () => {
        // Set dimensions
        widthInput.value = originalImage.width;
        heightInput.value = originalImage.height;
        originalAspectRatio = originalImage.width / originalImage.height;
        
        // Update displays
        originalDimensions.textContent = `${originalImage.width} × ${originalImage.height} px`;
        originalPreview.src = e.target.result;
        originalPreview.classList.remove("d-none");
        
        // Initial preview update
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
    lastChangedInput = 'width';
    updateDimensions('width');
    updatePreview();
  });

  heightInput.addEventListener("input", () => {
    lastChangedInput = 'height';
    updateDimensions('height');
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
    const originalName = downloadBtn.dataset.originalName || 'resized';
    const extension = downloadBtn.dataset.extension ? `.${downloadBtn.dataset.extension}` : '.jpg';
    link.download = `${originalName}_${width}x${height}${extension}`;
    link.click();
  });

  // Initialize placeholders
  updatePlaceholders();
});
