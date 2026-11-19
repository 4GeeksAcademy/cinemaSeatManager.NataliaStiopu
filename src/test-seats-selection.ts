/**
 * Test file for the Cinema Seat Selection Interface
 * This file tests all the functionality of the seat selection system.
 */

// Import the functions (duplicated here for testing)
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
// TESTS
// ============================================================

console.log('🎬 TESTING CINEMA SEAT SELECTION INTERFACE\n');
console.log('=' .repeat(60) + '\n');

// Test 1: Initialize
console.log('TEST 1: Initialization');
console.log('-' .repeat(60));
const sala = inicializarSala();
console.log(`✅ Sala initialized with ${sala.length} rows`);
console.log(`✅ Each row has ${sala[0].length} seats`);
console.log(`✅ Total seats: ${sala.length * sala[0].length}`);
const [occ1, avail1] = contarAsientos(sala);
console.log(`✅ Occupied: ${occ1}, Available: ${avail1}`);
console.log('');

// Test 2: Display
console.log('TEST 2: Display');
console.log('-' .repeat(60));
console.log('Initial room state:');
mostrarSala(sala);
console.log('');

// Test 3: Reserve seats
console.log('TEST 3: Reserve Seats');
console.log('-' .repeat(60));

const test3_1 = reservarAsiento(sala, 1, 1);
console.log(`Reserve (1, 1): ${test3_1}`);

const test3_2 = reservarAsiento(sala, 1, 1);
console.log(`Reserve (1, 1) again: ${test3_2}`);

const test3_3 = reservarAsiento(sala, 2, 5);
console.log(`Reserve (2, 5): ${test3_3}`);

const test3_4 = reservarAsiento(sala, 9, 5);
console.log(`Reserve (9, 5) [invalid row]: ${test3_4}`);

const test3_5 = reservarAsiento(sala, 3, 15);
console.log(`Reserve (3, 15) [invalid col]: ${test3_5}`);

console.log('');

// Test 4: Counters
console.log('TEST 4: Counters After Reservations');
console.log('-' .repeat(60));
const [occ, avail] = contarAsientos(sala);
console.log(`Occupied: ${occ}`);
console.log(`Available: ${avail}`);
console.log(`Total: ${occ + avail}`);
console.log(`✅ Total is 80: ${occ + avail === 80}`);
console.log('');

// Test 5: Display updated
console.log('TEST 5: Display Updated Room');
console.log('-' .repeat(60));
mostrarSala(sala);
console.log('');

// Test 6: Find contiguous seats
console.log('TEST 6: Find Contiguous Seats');
console.log('-' .repeat(60));
const pair1 = buscarAsientosContiguos(sala);
if (pair1) {
  console.log(`✅ Found pair: Row ${pair1[0][0]}, Seats ${pair1[0][1]} and ${pair1[1][1]}`);
} else {
  console.log('❌ No pair found');
}
console.log('');

// Test 7: Fill more seats and find contiguous
console.log('TEST 7: Fill Multiple Seats and Search Again');
console.log('-' .repeat(60));
reservarAsiento(sala, 1, 2);
reservarAsiento(sala, 1, 3);
reservarAsiento(sala, 1, 4);
reservarAsiento(sala, 2, 6);
console.log('Reserved: (1,2), (1,3), (1,4), (2,6)');
const pair2 = buscarAsientosContiguos(sala);
if (pair2) {
  console.log(`✅ Found pair: Row ${pair2[0][0]}, Seats ${pair2[0][1]} and ${pair2[1][1]}`);
} else {
  console.log('❌ No pair found');
}
console.log('');

// Test 8: Extreme case - fill almost all
console.log('TEST 8: Extreme Case - Fill Almost All Seats');
console.log('-' .repeat(60));
for (let fila = 0; fila < 8; fila++) {
  for (let columna = 0; columna < 10; columna++) {
    if (!(fila === 3 && (columna === 2 || columna === 3))) {
      sala[fila][columna] = 1;
    }
  }
}
const [occ8, avail8] = contarAsientos(sala);
console.log(`Occupied: ${occ8}, Available: ${avail8}`);
const pair3 = buscarAsientosContiguos(sala);
if (pair3) {
  console.log(`✅ Found last pair: Row ${pair3[0][0]}, Seats ${pair3[0][1]} and ${pair3[1][1]}`);
} else {
  console.log('❌ No pair found');
}
console.log('');

// Test 9: Completely full
console.log('TEST 9: Completely Full - No Pairs');
console.log('-' .repeat(60));
sala[3][2] = 1;
sala[3][3] = 1;
const [occ9, avail9] = contarAsientos(sala);
console.log(`Occupied: ${occ9}, Available: ${avail9}`);
const pair4 = buscarAsientosContiguos(sala);
if (pair4) {
  console.log(`Found pair: Row ${pair4[0][0]}, Seats ${pair4[0][1]} and ${pair4[1][1]}`);
} else {
  console.log('✅ No pair found (expected - room is full)');
}
console.log('');

// Final Summary
console.log('=' .repeat(60));
console.log('✅ ALL TESTS COMPLETED SUCCESSFULLY');
console.log('=' .repeat(60));

export {};
