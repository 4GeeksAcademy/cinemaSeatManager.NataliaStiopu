/**
 * Seats Selection Interface
 * 
 * This file connects the HTML interface with the seat management logic.
 * It handles user interactions, updates the DOM, and uses the functions
 * from src/index.ts to manage the seat matrix.
 */

// ============================================================
// IMPORT FUNCTIONS FROM index.ts
// ============================================================

function inicializarSala(): number[][] {
  let sala: number[][] = [];
  for (let fila = 0; fila < 8; fila++) {
    sala[fila] = [];
    for (let columna = 0; columna < 10; columna++) {
      sala[fila][columna] = 0;
    }
  }
  return sala;
}

function mostrarSala(sala: number[][]): void {
  let encabezado = "       ";
  for (let col = 1; col <= 10; col++) {
    encabezado += col.toString().padStart(3, " ");
  }
  console.log(encabezado);

  for (let fila = 0; fila < 8; fila++) {
    let linea = `Fila ${(fila + 1).toString().padStart(1, " ")} `;
    for (let columna = 0; columna < 10; columna++) {
      const asiento = sala[fila][columna] === 0 ? "L" : "X";
      linea += asiento.padStart(3, " ");
    }
    console.log(linea);
  }
}

function reservarAsiento(sala: number[][], fila: number, columna: number): string {
  if (fila < 1 || fila > 8) {
    return `❌ Error: La fila debe estar entre 1 y 8. Ingresaste: ${fila}`;
  }
  if (columna < 1 || columna > 10) {
    return `❌ Error: La columna debe estar entre 1 y 10. Ingresaste: ${columna}`;
  }

  const indiceF = fila - 1;
  const indiceC = columna - 1;

  if (sala[indiceF][indiceC] === 1) {
    return `❌ El asiento de la fila ${fila}, columna ${columna} ya está ocupado.`;
  }

  sala[indiceF][indiceC] = 1;
  return `✅ Reserva realizada correctamente: fila ${fila}, columna ${columna}.`;
}

function contarAsientos(sala: number[][]): [number, number] {
  let ocupados = 0;
  let disponibles = 0;

  for (let fila = 0; fila < 8; fila++) {
    for (let columna = 0; columna < 10; columna++) {
      if (sala[fila][columna] === 1) {
        ocupados++;
      } else {
        disponibles++;
      }
    }
  }

  return [ocupados, disponibles];
}

function buscarAsientosContiguos(sala: number[][]): number[][] | null {
  for (let fila = 0; fila < 8; fila++) {
    let columna = 0;
    while (columna < 9) {
      if (sala[fila][columna] === 0 && sala[fila][columna + 1] === 0) {
        return [
          [fila + 1, columna + 1],
          [fila + 1, columna + 2]
        ];
      }
      columna++;
    }
  }
  return null;
}

// ============================================================
// GLOBAL STATE
// ============================================================

const sala = inicializarSala();
let selectedSeat: [number, number] | null = null;
let highlightedSeats: [number, number][] | null = null;

// ============================================================
// DOM ELEMENTS
// ============================================================

const seatsGrid = document.getElementById('seats-grid') as HTMLDivElement;
const selectionPanel = document.getElementById('selection-panel') as HTMLDivElement;
const selectedPosition = document.getElementById('selected-position') as HTMLDivElement;
const confirmBtn = document.getElementById('confirm-btn') as HTMLButtonElement;
const cancelBtn = document.getElementById('cancel-btn') as HTMLButtonElement;
const findTwoBtn = document.getElementById('find-two-btn') as HTMLButtonElement;
const searchResults = document.getElementById('search-results') as HTMLDivElement;
const searchResultSeats = document.getElementById('search-result-seats') as HTMLDivElement;
const totalSeatsEl = document.getElementById('total-seats') as HTMLDivElement;
const occupiedSeatsEl = document.getElementById('occupied-seats') as HTMLDivElement;
const availableSeatsEl = document.getElementById('available-seats') as HTMLDivElement;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function updateCounters(): void {
  const [ocupados, disponibles] = contarAsientos(sala);
  totalSeatsEl.textContent = '80';
  occupiedSeatsEl.textContent = ocupados.toString();
  availableSeatsEl.textContent = disponibles.toString();
}

function createSeatsGrid(): void {
  seatsGrid.innerHTML = '';

  // Add column headers
  const topLeft = document.createElement('div');
  topLeft.className = 'row-label';
  seatsGrid.appendChild(topLeft);

  for (let col = 1; col <= 10; col++) {
    const header = document.createElement('div');
    header.className = 'column-label';
    header.textContent = col.toString();
    seatsGrid.appendChild(header);
  }

  // Add seats
  for (let fila = 0; fila < 8; fila++) {
    const rowLabel = document.createElement('div');
    rowLabel.className = 'row-label';
    rowLabel.textContent = (fila + 1).toString();
    seatsGrid.appendChild(rowLabel);

    for (let columna = 0; columna < 10; columna++) {
      const seat = document.createElement('button');
      seat.className = 'seat';
      seat.dataset.row = (fila + 1).toString();
      seat.dataset.col = (columna + 1).toString();

      // Add seat status classes
      if (sala[fila][columna] === 1) {
        seat.classList.add('occupied');
        seat.disabled = true;
      }

      seat.addEventListener('click', () => {
        if (sala[fila][columna] === 0) {
          selectSeat(fila + 1, columna + 1);
        }
      });

      seatsGrid.appendChild(seat);
    }
  }

  updateSeatHighlighting();
}

function selectSeat(row: number, col: number): void {
  selectedSeat = [row, col];
  highlightedSeats = null;
  searchResults.classList.remove('active');
  updateSeatHighlighting();
  updateSelectionPanel();
}

function updateSeatHighlighting(): void {
  const seatElements = document.querySelectorAll('.seat') as NodeListOf<HTMLElement>;

  seatElements.forEach((seat) => {
    const row = parseInt((seat as HTMLButtonElement).dataset.row!);
    const col = parseInt((seat as HTMLButtonElement).dataset.col!);

    seat.classList.remove('selected');

    if (selectedSeat && selectedSeat[0] === row && selectedSeat[1] === col) {
      seat.classList.add('selected');
    }

    if (highlightedSeats) {
      for (const [hRow, hCol] of highlightedSeats) {
        if (hRow === row && hCol === col) {
          seat.classList.add('selected');
          break;
        }
      }
    }
  });
}

function updateSelectionPanel(): void {
  if (selectedSeat) {
    selectionPanel.classList.add('active');
    selectedPosition.textContent = `Row ${selectedSeat[0]} · Seat ${selectedSeat[1]}`;
  } else {
    selectionPanel.classList.remove('active');
  }
}

function confirmReservation(): void {
  if (!selectedSeat) {
    alert('Please select a seat first');
    return;
  }

  const result = reservarAsiento(sala, selectedSeat[0], selectedSeat[1]);

  if (result.includes('✅')) {
    // Update the seat in the DOM
    const seatElement = document.querySelector(
      `.seat[data-row="${selectedSeat[0]}"][data-col="${selectedSeat[1]}"]`
    ) as HTMLButtonElement;

    if (seatElement) {
      seatElement.classList.add('occupied');
      seatElement.disabled = true;
    }

    // Show success message and reset
    alert(result);
    selectedSeat = null;
    highlightedSeats = null;
    searchResults.classList.remove('active');
    updateCounters();
    updateSeatHighlighting();
    updateSelectionPanel();

    console.log('Sala status after reservation:');
    mostrarSala(sala);
  } else {
    alert(result);
  }
}

function cancelSelection(): void {
  selectedSeat = null;
  highlightedSeats = null;
  searchResults.classList.remove('active');
  updateSeatHighlighting();
  updateSelectionPanel();
}

function findTwoSeats(): void {
  const result = buscarAsientosContiguos(sala);

  if (result) {
    const [seat1, seat2] = result;
    highlightedSeats = [
      [seat1[0], seat1[1]],
      [seat2[0], seat2[1]]
    ];

    searchResults.classList.add('active');
    searchResultSeats.textContent = `Row ${seat1[0]} · Seats ${seat1[1]} and ${seat2[1]}`;

    updateSeatHighlighting();

    // Add click handlers to highlighted seats
    const seatElements = document.querySelectorAll('.seat.selected') as NodeListOf<HTMLElement>;
    seatElements.forEach((seat) => {
      const row = parseInt((seat as HTMLButtonElement).dataset.row!);
      const col = parseInt((seat as HTMLButtonElement).dataset.col!);

      seat.addEventListener('click', () => {
        selectedSeat = [row, col];
        highlightedSeats = null;
        updateSeatHighlighting();
        updateSelectionPanel();
      });
    });
  } else {
    searchResults.classList.remove('active');
    alert('❌ No two adjacent seats available. Please select individual seats.');
  }
}

// ============================================================
// EVENT LISTENERS
// ============================================================

confirmBtn.addEventListener('click', confirmReservation);
cancelBtn.addEventListener('click', cancelSelection);
findTwoBtn.addEventListener('click', findTwoSeats);

// ============================================================
// INITIALIZATION
// ============================================================

function init(): void {
  console.log('🎬 Initializing Cinema Seat Selection Interface');

  // Create the seats grid
  createSeatsGrid();

  // Update counters
  updateCounters();

  // Log initial state
  console.log('Initial seat matrix:');
  mostrarSala(sala);

  console.log('✅ Interface ready');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export {};
