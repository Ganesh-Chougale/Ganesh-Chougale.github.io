// tileGenerator.js
export const tileGenerator = {
    allTiles: [],
    currentShuffledTiles: [],
    headers: [],

    generateTilesAndDropZones(data) {
        this.allTiles = [];
        this.headers = Object.keys(data[0] || {});
        const correctPlacements = [];
        
        // Create all tiles and track their correct positions
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

        // Use all tiles and shuffle them
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
        // Shuffle all tiles
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