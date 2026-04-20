document.addEventListener("DOMContentLoaded", () => {
    // Input elements
    const companyNameInput = document.getElementById("companyName");
    const currencySelect = document.getElementById("currency");
    const threeYearPriorEPSInput = document.getElementById("threeYearPriorEPS");
    const currentEPSInput = document.getElementById("currentEPS");
    const stockPEInput = document.getElementById("stockPE");
    const currentSharePriceInput = document.getElementById("currentSharePrice");
    const returnOver3YearsInput = document.getElementById("returnOver3Years");
    
    // Output elements
    const outputSection = document.getElementById("outputSection");
    const currentEPSGrowthOutput = document.getElementById("currentEPSGrowth");
    const peRatioOutput = document.getElementById("peRatio");
    const epsPeRatioOutput = document.getElementById("epsPeRatio");
    const currentSharePriceOutput = document.getElementById("currentSharePriceOutput");
    const stockCurrentFairValueOutput = document.getElementById("stockCurrentFairValue");
    const differenceValueOutput = document.getElementById("differenceValue");
    
    // Buttons
    const calculateBtn = document.getElementById("calculateBtn");
    const resetBtn = document.getElementById("resetBtn");
    
    // Event listeners
    calculateBtn.addEventListener("click", calculateFairValue);
    resetBtn.addEventListener("click", resetForm);
    currencySelect.addEventListener("change", recalculateResults);
    
    // Add input validation
    const numericInputs = [threeYearPriorEPSInput, currentEPSInput, stockPEInput, currentSharePriceInput, returnOver3YearsInput];
    numericInputs.forEach(input => {
        input.addEventListener("input", function() {
            validateInput(this);
        });
    });
    
    function validateInput(input) {
        const value = parseFloat(input.value);
        if (input.value && isNaN(value)) {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
        } else if (input.value && !isNaN(value)) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        } else {
            input.classList.remove("is-invalid", "is-valid");
        }
    }
    
    function calculateFairValue() {
        // Get input values
        const companyName = companyNameInput.value.trim();
        const threeYearPriorEPS = parseFloat(threeYearPriorEPSInput.value);
        const currentEPS = parseFloat(currentEPSInput.value);
        const stockPE = parseFloat(stockPEInput.value);
        const currentSharePrice = parseFloat(currentSharePriceInput.value);
        const returnOver3Years = parseFloat(returnOver3YearsInput.value);
        
        // Validate inputs
        if (!companyName) {
            showError("Please enter a company name");
            return;
        }
        
        if (isNaN(threeYearPriorEPS) || isNaN(currentEPS) || isNaN(stockPE) || isNaN(currentSharePrice) || isNaN(returnOver3Years)) {
            showError("Please fill in all numeric fields with valid numbers");
            return;
        }
        
        if (threeYearPriorEPS <= 0 || currentEPS <= 0 || stockPE <= 0 || currentSharePrice <= 0) {
            showError("EPS, PE ratio, and share price must be greater than 0");
            return;
        }
        
        // Perform calculations according to specifications
        
        // 1. Current EPS 3 year prior EPS = current EPS - 3 year prior EPS
        const currentEPSGrowth = currentEPS - threeYearPriorEPS;
        
        // 2. PE Ratio = Stock PE input value
        const peRatio = stockPE;
        
        // 3. EPS PE ratio = (Current EPS 3 year prior EPS calculated value) / PE Ratio value
        const epsPeRatio = currentEPSGrowth / peRatio;
        
        // 4. Current Share Price = Current share price input value
        const currentSharePriceValue = currentSharePrice;
        
        // 5. Stock Current Fair Value = EPS PE ratio calculated value * Current Share Price value
        const stockCurrentFairValue = epsPeRatio * currentSharePriceValue;
        
        // 6. Difference Between investment & current share price = Stock Current Fair Value - current share price value
        const differenceValue = stockCurrentFairValue - currentSharePriceValue;
        
        // Display results
        displayResults({
            currentEPSGrowth,
            peRatio,
            epsPeRatio,
            currentSharePriceValue,
            stockCurrentFairValue,
            differenceValue
        });
    }
    
    function displayResults(results) {
        // Format and display each result
        currentEPSGrowthOutput.innerHTML = formatValue(results.currentEPSGrowth, "currency");
        peRatioOutput.innerHTML = formatValue(results.peRatio, "number", 2);
        epsPeRatioOutput.innerHTML = formatValue(results.epsPeRatio, "number", 4);
        currentSharePriceOutput.innerHTML = formatValue(results.currentSharePriceValue, "currency");
        stockCurrentFairValueOutput.innerHTML = formatValue(results.stockCurrentFairValue, "currency");
        differenceValueOutput.innerHTML = formatValue(results.differenceValue, "currency", true);
        
        // Apply color coding to the difference value
        if (results.differenceValue > 0) {
            differenceValueOutput.classList.add("positive-value");
            differenceValueOutput.classList.remove("negative-value", "neutral-value");
        } else if (results.differenceValue < 0) {
            differenceValueOutput.classList.add("negative-value");
            differenceValueOutput.classList.remove("positive-value", "neutral-value");
        } else {
            differenceValueOutput.classList.add("neutral-value");
            differenceValueOutput.classList.remove("positive-value", "negative-value");
        }
        
        // Show output section with animation
        outputSection.classList.remove("d-none");
        outputSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    
    function formatValue(value, type = "number", decimals = 2, showSign = false) {
        if (isNaN(value)) return "-";
        
        const selectedCurrency = currencySelect.value;
        let formattedValue;
        
        switch (type) {
            case "currency":
                const currencyFormats = {
                    'INR': { locale: 'en-IN', currency: 'INR' },
                    'USD': { locale: 'en-US', currency: 'USD' },
                    'EUR': { locale: 'de-DE', currency: 'EUR' },
                    'GBP': { locale: 'en-GB', currency: 'GBP' },
                    'JPY': { locale: 'ja-JP', currency: 'JPY' }
                };
                
                const format = currencyFormats[selectedCurrency];
                formattedValue = new Intl.NumberFormat(format.locale, {
                    style: 'currency',
                    currency: format.currency,
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals
                }).format(Math.abs(value));
                break;
            case "percentage":
                formattedValue = new Intl.NumberFormat('en-US', {
                    style: 'percent',
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals
                }).format(Math.abs(value));
                break;
            default:
                formattedValue = new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals
                }).format(Math.abs(value));
        }
        
        // Add sign if requested
        if (showSign && value > 0) {
            formattedValue = "+" + formattedValue;
        } else if (showSign && value < 0) {
            formattedValue = "-" + formattedValue;
        }
        
        return formattedValue;
    }
    
    function resetForm() {
        // Reset all inputs
        companyNameInput.value = "";
        threeYearPriorEPSInput.value = "";
        currentEPSInput.value = "";
        stockPEInput.value = "";
        currentSharePriceInput.value = "";
        returnOver3YearsInput.value = "";
        
        // Remove validation classes
        numericInputs.forEach(input => {
            input.classList.remove("is-invalid", "is-valid");
        });
        
        // Hide output section
        outputSection.classList.add("d-none");
        
        // Reset output values
        currentEPSGrowthOutput.innerHTML = "-";
        peRatioOutput.innerHTML = "-";
        epsPeRatioOutput.innerHTML = "-";
        currentSharePriceOutput.innerHTML = "-";
        stockCurrentFairValueOutput.innerHTML = "-";
        differenceValueOutput.innerHTML = "-";
        differenceValueOutput.classList.remove("positive-value", "negative-value", "neutral-value");
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    
    function showError(message) {
        // Remove any existing error alerts
        const existingAlert = document.querySelector(".alert-danger");
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create new error alert
        const errorDiv = document.createElement("div");
        errorDiv.className = "alert alert-danger alert-dismissible fade show mt-3";
        errorDiv.innerHTML = `
            <strong>Error!</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Insert at the top of the container
        const container = document.querySelector(".container");
        container.insertBefore(errorDiv, container.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
        
        // Scroll to top to show the error
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    
    function recalculateResults() {
        // If results are already displayed, recalculate them with new currency
        if (!outputSection.classList.contains("d-none")) {
            calculateFairValue();
        }
    }
    
    // Add keyboard support for Enter key
    numericInputs.forEach(input => {
        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                calculateBtn.click();
            }
        });
    });
    
    companyNameInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            threeYearPriorEPSInput.focus();
        }
    });
});