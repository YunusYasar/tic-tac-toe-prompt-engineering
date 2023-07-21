
// Diese Funktion rendert das Tic Tac Toe-Spielbrett
function render() {
    // Holen Sie sich das HTML-Element mit der ID 'content'
    const contentDiv = document.getElementById('content');
    // Ein String, um das HTML für die Tabelle zu erstellen
    let tableHTML = '<table>';
    // Schleife für die Zeilen (3 Zeilen)
    for (let i = 0; i < 3; i++) {
        // Füge eine Zeile zur Tabelle hinzu
        tableHTML += '<tr>';
        // Schleife für die Spalten (3 Spalten)
        for (let j = 0; j < 3; j++) {
            // Berechne den Index im Feldarray anhand der aktuellen Zeile und Spalte
            const index = i * 3 + j;
            // Hole den Wert (circle, cross oder null) aus dem Feldarray anhand des Indexes
            const fieldValue = fields[index];
            // Konvertiere den Wert in ein passendes Symbol (o, x oder leerer String)
            const symbol = fieldValue === 'circle' ? generateAnimatedCircleSVG() : (fieldValue === 'cross' ? generateAnimatedCrossSVG() : '');
            // Füge die Zelle (mit dem entsprechenden Symbol) zur aktuellen Zeile hinzu
            tableHTML += `<td>${symbol}</td>`;
        }
        // Schließe die aktuelle Zeile ab
        tableHTML += '</tr>';
    }
    // Schließe die Tabelle ab
    tableHTML += '</table>';
    // Setze den generierten HTML-Code als Inhalt des 'content' Div-Containers
    contentDiv.innerHTML = tableHTML;
}
// Rufe die Funktion render() auf, um das Tic Tac Toe-Spielbrett zu erstellen und darzustellen
