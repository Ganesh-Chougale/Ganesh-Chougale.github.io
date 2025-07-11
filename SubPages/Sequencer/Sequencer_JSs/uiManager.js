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
        // Removed hiding submit and restart buttons here.
        // Their visibility is now managed by setMode() or specific functions in app.js.
        console.log("Game area cleared. Button visibility now managed by setMode or specific functions.");
    },

    showFeedback(message, type = 'info') {
        this.feedbackMessage.textContent = message;
        this.feedbackMessage.className = 'alert'; // Reset classes
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
        } else { // learning mode
            this.submitBtn.classList.add('hidden'); // Submit is typically only for game mode
            this.restartBtn.classList.remove('hidden');
            console.log("Submit button hidden, Restart button visible (Learning Mode).");
        }
    }
};