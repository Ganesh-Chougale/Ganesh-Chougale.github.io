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

        // Return all currently placed tiles back to the shuffled pool
        document.querySelectorAll('.drop-zone').forEach(dropZone => {
            if (dropZone.firstChild) {
                this.uiManager.shuffledTilesContainer.appendChild(dropZone.firstChild);
                dropZone.firstChild.classList.remove('placed', 'correct', 'incorrect', 'dragging');
            }
            dropZone.classList.remove('highlight', 'error'); // Remove any lingering styles
        });
        console.log(`Switched to ${mode} mode.`);
    },

    handleDragStart(event) {
        if (this.mode === 'game' && event.target.closest('.drop-zone')) {
            event.preventDefault(); // Prevent dragging tiles already in drop zones in Game Mode
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

        // If the drop zone already contains a tile, move it back to the shuffled tiles container
        if (dropZone.hasChildNodes()) {
            const existingTile = dropZone.firstChild;
            if (existingTile.dataset.id !== tileId) { // Only return if it's a different tile
                console.log(`Returning existing tile ${existingTile.dataset.id} from ${dropZoneRow},${dropZoneCol} to pool.`);
                this.returnTileToPool(existingTile);
            } else {
                // If the same tile is dropped back into its current drop zone, just remove dragging class
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

                // The original logic for loadMoreTilesCallback seems to be commented out or not fully implemented.
                // If you intend to load more tiles dynamically, ensure `loadMoreTilesCallback` is properly set up in `app.js`.
                // Example: if (this.loadMoreTilesCallback && this.mode === 'game') { this.loadMoreTilesCallback(); }

                const totalDropZones = document.querySelectorAll('.drop-zone').length;
                const numCols = this.tileGenerator.headers && Object.keys(this.tileGenerator.headers).length > 0 ?
                    this.tileGenerator.headers.length :
                    0;
                const totalRowsInGame = (numCols > 0) ? (totalDropZones / numCols) : 0;

                if (this.completedRows.size === totalRowsInGame && totalRowsInGame > 0) {
                    this.uiManager.showFeedback(`Congratulations! All rows completed! Final Score: ${this.score}`, 'success');
                    console.log("All rows completed!");
                    if (this.mode === 'game') {
                        // The submit button is typically for manual submission, not automatic completion
                        // You might want to enable or show a different "Game Over" message
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
            tileData.element.classList.remove('placed'); // Remove 'placed' as it's correctly highlighted
        } else {
            tileData.element.classList.add('incorrect');
            tileData.element.classList.remove('correct');
            tileData.element.classList.remove('placed'); // Remove 'placed' as it's incorrectly highlighted
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