// Coding Helper Prompter JavaScript
class Prompter {
    constructor() {
        this.selectedGenerator = null;
        this.templates = {};
        this.init();
    }

    async init() {
        await this.loadTemplates();
        this.attachEventListeners();
        this.setupToast();
    }

    async loadTemplates() {
        try {
            const response = await fetch('./scipts/PD_Prompt.json');
            const data = await response.json();
            this.templates = data.generators;
        } catch (error) {
            console.error('Error loading templates:', error);
            this.showNotification('Error loading prompt templates', 'danger');
        }
    }

    attachEventListeners() {
        // Generator option selection
        document.querySelectorAll('.generator-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectGenerator(e.currentTarget);
            });
        });

        // Generate button
        document.getElementById('generateBtn').addEventListener('click', () => {
            this.generatePrompt();
        });

        // Copy button
        document.getElementById('copyBtn').addEventListener('click', () => {
            this.copyToClipboard();
        });

        // Enter key in input area
        document.getElementById('inputText').addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.generatePrompt();
            }
        });
    }

    setupToast() {
        this.toastElement = document.getElementById('copyToast');
        this.toast = new bootstrap.Toast(this.toastElement);
    }

    selectGenerator(element) {
        // Remove active class from all options
        document.querySelectorAll('.generator-option').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to selected option
        element.classList.add('active');
        this.selectedGenerator = element.dataset.type;

        // Auto-generate if there's input text
        const inputText = document.getElementById('inputText').value.trim();
        if (inputText) {
            this.generatePrompt();
        }
    }

    generatePrompt() {
        if (!this.selectedGenerator) {
            this.showNotification('Please select a generator type first', 'warning');
            return;
        }

        const inputText = document.getElementById('inputText').value.trim();
        if (!inputText) {
            this.showNotification('Please enter your requirements in the input area', 'warning');
            return;
        }

        // Add loading state
        const generateBtn = document.getElementById('generateBtn');
        generateBtn.classList.add('loading');
        generateBtn.disabled = true;

        // Get template and process it
        const template = this.templates[this.selectedGenerator];
        const processedPrompt = this.processTemplate(template.template, inputText);

        // Update copy area (simulate processing time)
        setTimeout(() => {
            document.getElementById('copyArea').value = processedPrompt;
            
            // Remove loading state
            generateBtn.classList.remove('loading');
            generateBtn.disabled = false;

            // Show success notification
            this.showNotification('Prompt generated successfully!', 'success');
        }, 500);
    }

    processTemplate(templateStr, customInput) {
        const includeComments = document.getElementById('includeComments').checked;
        const includeExamples = document.getElementById('includeExamples').checked;
        const generatorData = this.templates[this.selectedGenerator];

        let result = templateStr
            .replace(/{customInput}/g, customInput)
            .replace(/{projectType}/g, this.extractProjectType(customInput))
            .replace(/{language}/g, this.extractLanguage(customInput))
            .replace(/{framework}/g, this.extractFramework(customInput))
            .replace(/{functionality}/g, this.extractFunctionality(customInput))
            .replace(/{architecture}/g, this.extractArchitecture(customInput))
            .replace(/{errorType}/g, this.extractErrorType(customInput))
            .replace(/{environment}/g, this.extractEnvironment(customInput))
            .replace(/{stackTrace}/g, this.extractStackTrace(customInput));

        // Handle conditional sections (remove if both comments and examples are disabled)
        if (!includeComments && !includeExamples && generatorData.conditionalSection) {
            result = result.replace(/{conditionalSection}\n/g, '');
        } else if (generatorData.conditionalSection) {
            let conditionalContent = generatorData.conditionalSection;
            
            // Replace comments and examples within conditional section
            if (includeComments && generatorData.comments) {
                conditionalContent = conditionalContent.replace(/{includeComments}/g, generatorData.comments);
            } else {
                conditionalContent = conditionalContent.replace(/{includeComments}\n?/g, '');
            }

            if (includeExamples && generatorData.examples) {
                conditionalContent = conditionalContent.replace(/{includeExamples}/g, generatorData.examples);
            } else {
                conditionalContent = conditionalContent.replace(/{includeExamples}\n?/g, '');
            }

            result = result.replace(/{conditionalSection}/g, conditionalContent);
        }

        // Handle comments and examples outside conditional sections
        if (includeComments && generatorData.comments) {
            result = result.replace(/{includeComments}/g, generatorData.comments);
        } else {
            result = result.replace(/{includeComments}\n?/g, '');
        }

        if (includeExamples && generatorData.examples) {
            result = result.replace(/{includeExamples}/g, generatorData.examples);
        } else {
            result = result.replace(/{includeExamples}\n?/g, '');
        }

        // Replace any remaining placeholders
        result = result.replace(/{[^}]+}/g, '[SPECIFY]');
        
        // Clean up extra newlines
        result = result.replace(/\n\n\n+/g, '\n\n').trim();
        
        return result;
    }

    extractProjectType(input) {
        const patterns = [
            /web app|website|web application/gi,
            /mobile app|android|ios/gi,
            /api|rest api|graphql/gi,
            /desktop app|windows app|mac app/gi,
            /cli|command line|terminal/gi
        ];

        for (let pattern of patterns) {
            if (pattern.test(input)) {
                return pattern.source.replace(/[\\\/]/gi, '').replace(/\s+/g, ' ');
            }
        }
        return 'project';
    }

    extractLanguage(input) {
        const languages = ['javascript', 'python', 'java', 'c#', 'c++', 'php', 'ruby', 'go', 'rust', 'typescript'];
        for (let lang of languages) {
            if (input.toLowerCase().includes(lang)) {
                return lang;
            }
        }
        return 'JavaScript';
    }

    extractFramework(input) {
        const frameworks = [
            'react', 'angular', 'vue', 'svelte',
            'express', 'django', 'flask', 'spring',
            'laravel', 'rails', 'nextjs', 'nuxt'
        ];
        for (let framework of frameworks) {
            if (input.toLowerCase().includes(framework)) {
                return framework;
            }
        }
        return 'Vanilla';
    }

    extractFunctionality(input) {
        // Simple extraction - can be enhanced
        if (input.toLowerCase().includes('login') || input.toLowerCase().includes('auth')) {
            return 'authentication system';
        }
        if (input.toLowerCase().includes('database') || input.toLowerCase().includes('db')) {
            return 'database operations';
        }
        if (input.toLowerCase().includes('api') || input.toLowerCase().includes('endpoint')) {
            return 'API endpoint';
        }
        return 'functionality';
    }

    extractArchitecture(input) {
        if (input.toLowerCase().includes('mvc')) return 'MVC';
        if (input.toLowerCase().includes('component')) return 'Component-based';
        if (input.toLowerCase().includes('service')) return 'Service-oriented';
        return 'MVC';
    }

    extractErrorType(input) {
        if (input.toLowerCase().includes('null') || input.toLowerCase().includes('undefined')) {
            return 'Null/Undefined Reference';
        }
        if (input.toLowerCase().includes('syntax')) return 'Syntax Error';
        if (input.toLowerCase().includes('network') || input.toLowerCase().includes('fetch')) {
            return 'Network Error';
        }
        return 'Runtime Error';
    }

    extractEnvironment(input) {
        if (input.toLowerCase().includes('production')) return 'Production';
        if (input.toLowerCase().includes('development') || input.toLowerCase().includes('dev')) {
            return 'Development';
        }
        if (input.toLowerCase().includes('test')) return 'Testing';
        return 'Development';
    }

    extractStackTrace(input) {
        // Look for stack trace patterns
        const stackPattern = /at\s+[\w.]+\s*\(.+\)/g;
        const match = input.match(stackPattern);
        return match ? match.join('\n') : 'Not provided';
    }

    async copyToClipboard() {
        const copyArea = document.getElementById('copyArea');
        const copyBtn = document.getElementById('copyBtn');
        
        if (!copyArea.value.trim()) {
            this.showNotification('Nothing to copy. Generate a prompt first!', 'warning');
            return;
        }

        try {
            await navigator.clipboard.writeText(copyArea.value);
            
            // Visual feedback
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            // Show toast
            this.toast.show();
            
            // Reset button after delay
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
            
        } catch (err) {
            // Fallback for older browsers
            copyArea.select();
            document.execCommand('copy');
            this.toast.show();
        }
    }

    showNotification(message, type = 'info') {
        // Create a simple notification (can be enhanced with Bootstrap alerts)
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 1050; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
}

// Initialize the prompter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Prompter();
});
