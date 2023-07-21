   // Hier wird das Spielfeld definiert.
   let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  let currentSymbol = 'circle'; // Startsymbol

  // Gewinnmuster für jede der 8 möglichen Gewinnkombinationen
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function init() {
    render(); // Die render() Funktion wird aufgerufen, um das Spielfeld anzuzeigen.
  }

function render() {
  const contentDiv = document.getElementById('content');
  let tableHTML = '<table>';
  for (let i = 0; i < 3; i++) {
    tableHTML += '<tr>';
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      const fieldValue = fields[index];
      // Je nach Feldwert wird ein animiertes Kreis- oder Kreuz-SVG generiert.
      const symbol = fieldValue === 'circle' ? generateAnimatedCircleSVG() : (fieldValue === 'cross' ? generateAnimatedCrossSVG() : '');
      // Das <td> Element erhält ein onclick-Attribut, das die placeSymbol() Funktion aufruft, wenn es geklickt wird.
      tableHTML += `<td onclick="placeSymbol(${index})">${symbol}</td>`;
    }
    tableHTML += '</tr>';
  }
  tableHTML += '</table>';
  // Der generierte HTML-Code für die Tabelle wird in das "content" Div-Element eingefügt.
  contentDiv.innerHTML = tableHTML;
}


function checkGameStatus() {
  // Überprüft, ob das Spiel gewonnen wurde.
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      drawWinLine(a, b, c);
      return true;
    }
  }

  // Überprüft, ob das Spiel unentschieden ist.
  if (!fields.includes(null)) {
    alert('Unentschieden! Das Spiel ist vorbei.');
    resetGame();
    return true;
  }

  return false;
}

function drawWinLine(a, b, c) {
  // Ermittelt die Positionen der Felder a, b und c relativ zum content-Container.
  const tdElements = document.getElementsByTagName('td');
  const [x1, y1] = [tdElements[a].offsetLeft + tdElements[a].offsetWidth / 2, tdElements[a].offsetTop + tdElements[a].offsetHeight / 2];
  const [x2, y2] = [tdElements[c].offsetLeft + tdElements[c].offsetWidth / 2, tdElements[c].offsetTop + tdElements[c].offsetHeight / 2];

  // Erstellt ein neues Element für die weiße Linie und fügt es dem DOM hinzu.
  const contentDiv = document.getElementById('content');
  const winLine = document.createElement('div');
  winLine.className = 'win-line';
  winLine.style.width = `${Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)}px`;
  winLine.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
  contentDiv.appendChild(winLine); // Linie wird dem content-Container hinzugefügt

  // Positioniert die Linie im Mittelpunkt zwischen den Feldern a und c.
  const [midX, midY] = [(x1 + x2) / 2, (y1 + y2) / 2];
  winLine.style.top = `${midY - winLine.offsetHeight / 2}px`;
  winLine.style.left = `${midX - winLine.offsetWidth / 2}px`;

  // Nach 2 Sekunden wird das Spielfeld zurückgesetzt und die Linie wird entfernt.
  setTimeout(() => {
    resetGame();
    winLine.remove();
  }, 2000);
}
function placeSymbol(index) {
  const fieldValue = fields[index];
  // Wenn das Feld leer ist (null), wird das aktuelle Symbol in das Array "fields" eingefügt.
  if (fieldValue === null) {
    fields[index] = currentSymbol;
    // Das passende SVG-Element (Kreis oder Kreuz) wird generiert und in das angeklickte <td>-Element eingefügt.
    const symbol = currentSymbol === 'circle' ? generateAnimatedCircleSVG() : generateAnimatedCrossSVG();
    const tdElement = document.getElementsByTagName('td')[index];
    tdElement.innerHTML = symbol;
    // Die onclick-Funktion des angeklickten <td>-Elements wird entfernt, damit es nicht erneut geklickt werden kann.
    tdElement.onclick = null;
    // Das Spielende wird überprüft.
    if (!checkGameStatus()) {
      // Das aktuelle Symbol wird gewechselt, um das nächste Symbol festzulegen.
      currentSymbol = currentSymbol === 'circle' ? 'cross' : 'circle';
    }
  }
}

function generateAnimatedCircleSVG() {
    const color = "#00B1F1";
    const size = 70;
  
    // Die Animationsdauer in Millisekunden
    const animationDuration = 1000;
  
    // SVG-HTML-Code für den animierten Kreis mit Handschrift-Effekt
    const svgCode = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="-10 -15 ${size} ${size}">
        <style>
          @keyframes drawCircle {
            to {
              stroke-dashoffset: 0; /* Endzustand (vollständig gezeichnet) */
            }
          }
  
          path {
            fill: none;
            stroke: ${color};
            stroke-width: 5;
            stroke-dasharray: 157; /* Die Gesamtlänge des Kreises (2 * π * r) */
            stroke-dashoffset: 157; /* Start mit einem "nicht gezeichneten" Kreis */
            animation: drawCircle ${animationDuration}ms ease-in-out forwards; /* Animationseigenschaften */
          }
        </style>
        <path d="M 25 50 a 25 25 0 1 1 0 -50 a 25 25 0 1 1 0 50" />
      </svg>
    `;
  
    return svgCode;
  }
  
  function generateAnimatedCrossSVG() {
    const color = "#FFC000";
    const size = 60;
  
    // Die Animationsdauer in Millisekunden
    const animationDuration = 1000;
  
    // SVG-HTML-Code für das animierte Kreuz mit Handschrift-Effekt
    const svgCode = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <style>
          @keyframes drawCross {
            to {
              stroke-dashoffset: 0; /* Endzustand (vollständig gezeichnet) */
            }
          }
  
          line {
            stroke: ${color};
            stroke-width: 7; /* Doppelte Dicke */
            fill: transparent;
            stroke-dasharray: 120; /* Die Gesamtlänge der Linie */
            stroke-dashoffset: 120; /* Start mit einer "nicht gezeichneten" Linie */
            animation: drawCross ${animationDuration}ms ease-in-out forwards; /* Animationseigenschaften */
          }
        </style>
        <line x1="0" y1="${size}" x2="${size}" y2="0" />
        <line x1="0" y1="0" x2="${size}" y2="${size}" />
      </svg>
    `;
  
    return svgCode;
  }
  
  function resetGame() {
    // Setzt das Spielfeld zurück, um ein neues Spiel zu starten.
    fields = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    currentSymbol = 'circle'; // Startsymbol zurücksetzen
    render(); // Das Spielfeld wird neu gerendert.
  }

  // Die init() Funktion wird aufgerufen, um das Spielfeld beim Laden der Seite zu initialisieren.
  init();