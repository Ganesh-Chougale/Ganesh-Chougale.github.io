// Sequencer_JSs/dataLoader.js
export const dataLoader = {
    async loadCsvData(csvString) {
        if (!csvString) {
            console.error("No CSV string provided.");
            return null;
        }
        const lines = csvString.trim().split('\n');
        if (lines.length < 2) {
            console.error("CSV must contain at least a header and one data row.");
            // Return null or throw error if only header, as game logic expects data rows
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
            originalCsvString: csvString // <--- ADD THIS LINE
        };
    }
};