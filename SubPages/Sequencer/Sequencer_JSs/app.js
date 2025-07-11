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
const solveFirstColumnBtn = document.getElementById('solveFirstColumnBtn'); // Get the new button

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
        gameLogic.setMode('learning'); // Set initial mode
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

    // Remove existing listeners to prevent duplicates
    if (gameLogic.handleDragStartBound) {
        shuffledTilesContainer.removeEventListener('dragstart', gameLogic.handleDragStartBound);
        dropZonesContainer.removeEventListener('dragover', gameLogic.handleDragOverBound);
        dropZonesContainer.removeEventListener('dragleave', gameLogic.handleDragLeaveBound);
        dropZonesContainer.removeEventListener('drop', gameLogic.handleDropBound);
        dropZonesContainer.removeEventListener('dragstart', gameLogic.handleDropZoneDragStartBound);
    }

    // Bind event handlers to gameLogic instance
    gameLogic.handleDragStartBound = gameLogic.handleDragStart.bind(gameLogic);
    gameLogic.handleDragOverBound = gameLogic.handleDragOver.bind(gameLogic);
    gameLogic.handleDragLeaveBound = gameLogic.handleDragLeave.bind(gameLogic);
    gameLogic.handleDropBound = gameLogic.handleDrop.bind(gameLogic);
    gameLogic.handleDropZoneDragStartBound = handleDropZoneDragStart.bind(gameLogic);

    // Add event listeners
    shuffledTilesContainer.addEventListener('dragstart', gameLogic.handleDragStartBound);
    dropZonesContainer.addEventListener('dragover', gameLogic.handleDragOverBound);
    dropZonesContainer.addEventListener('dragleave', gameLogic.handleDragLeaveBound);
    dropZonesContainer.addEventListener('drop', gameLogic.handleDropBound);
    dropZonesContainer.addEventListener('dragstart', gameLogic.handleDropZoneDragStartBound);
    console.log("Drag and drop listeners added.");
}

function handleDropZoneDragStart(event) {
    // Only allow dragging from drop zones in learning mode
    if (event.target.classList.contains('tile') && this.mode === 'learning') {
        gameLogic.handleDragStart(event);
    } else {
        event.preventDefault(); // Prevent dragging in game mode or if it's not a tile
    }
}

function solveFirstColumn() {
    if (!gameData || !gameData.data || gameData.data.length === 0) {
        uiManager.showFeedback("No game data loaded to solve.", 'info');
        return;
    }

    uiManager.clearGameArea(); // Clear current tiles and drop zones
    uiManager.renderHeadings(gameData.headers); // Re-render headings

    // Ensure all drop zones are visible and empty initially
    uiManager.renderDropZones(gameData.data, tileGenerator.createDropZoneElement);

    const firstColumnTiles = tileGenerator.allTiles.filter(tile => tile.originalCol === 0);

    // Sort these tiles by their original row to ensure correct order
    firstColumnTiles.sort((a, b) => a.originalRow - b.originalRow);

    firstColumnTiles.forEach(tileData => {
        const dropZone = document.querySelector(`.drop-zone[data-row="${tileData.originalRow}"][data-col="0"]`);
        const tileElement = tileGenerator.createTileElement(tileData);

        if (dropZone && tileElement) {
            // Remove from shuffled tiles container if present
            const currentTileElementInPool = document.querySelector(`#shuffled-tiles-container [data-id="${tileData.id}"]`);
            if (currentTileElementInPool) {
                currentTileElementInPool.remove();
            }

            // If there's an existing tile in the drop zone, return it to the pool first
            if (dropZone.firstChild) {
                gameLogic.returnTileToPool(dropZone.firstChild);
            }

            dropZone.appendChild(tileElement);
            tileElement.classList.add('placed', 'correct'); // Mark as placed and correct
            gameLogic.placedTiles.set(tileData.id, {
                element: tileElement,
                expectedRow: tileData.originalRow,
                expectedCol: tileData.originalCol,
                actualRow: tileData.originalRow,
                actualCol: 0 // Since we are placing in the first column
            });
        }
    });

    // Re-render remaining shuffled tiles (if any)
    const remainingTiles = tileGenerator.allTiles.filter(tile =>
        !gameLogic.placedTiles.has(tile.id)
    );
    uiManager.renderShuffledTiles(remainingTiles, tileGenerator.createTileElement.bind(tileGenerator));

    // Update feedback
    uiManager.showFeedback("First column tiles sorted and placed!", 'success');
    console.log("First column solved.");

    // IMPORTANT: Ensure submit and restart buttons are visible after solving the first column
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
            loadedTileRows.clear(); // Clear all rows as game mode starts fresh
            // Add all rows back for game mode, but don't render tiles until needed (handled by loadMoreTilesCallback)
            for (let i = 0; i < gameData.data.length; i++) {
                loadedTileRows.add(i);
            }
            renderVisibleTiles(); // Render all tiles for game mode initially
            addDragDropListeners();
        }
    });

    // Event listener for the "Solve 1st Column" button
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