/**
 * Sistema de Gestión de Asientos de Sala de Cine
 * 
 * Este archivo contiene toda la lógica para gestionar los asientos
 * de una sala de cine, incluyendo disponibilidad, reservas y estado.
 */

// ============================================================
// FUNCIÓN: inicializarSala()
// ============================================================

/**
 * Crea e inicializa una matriz bidimensional de 8 filas x 10 columnas
 * con todos los valores en 0 (representando asientos disponibles).
 * 
 * @returns {number[][]} Matriz de 8x10 inicializada con ceros
 */
function inicializarSala(): number[][] {
  // Declara la variable de tipo matriz bidimensional
  let sala: number[][] = [];

  // Primer bucle: itera sobre las FILAS (0 a 7 = 8 filas)
  for (let fila = 0; fila < 8; fila++) {
    // Inicializa cada fila como un array vacío
    sala[fila] = [];

    // Segundo bucle: itera sobre las COLUMNAS (0 a 9 = 10 columnas)
    for (let columna = 0; columna < 10; columna++) {
      // Asigna 0 a cada posición [fila][columna]
      sala[fila][columna] = 0;
    }
  }

  // Devuelve la matriz completa
  return sala;
}

// ============================================================
// FUNCIÓN: mostrarSala()
// ============================================================

/**
 * Muestra el estado actual de la sala en la consola de forma legible.
 * Recorre la matriz bidimensional y convierte los valores numéricos
 * en caracteres visuales (L para libre, X para ocupado).
 * 
 * @param sala {number[][]} - Matriz de asientos a mostrar
 * @returns {void} - Solo muestra en consola, no retorna valores
 */
function mostrarSala(sala: number[][]): void {
  // Primera línea: Encabezado con números de columnas (1 a 10)
  let encabezado = "       "; // Espaciado inicial para alineación

  // Bucle para agregar números de columnas
  for (let col = 1; col <= 10; col++) {
    encabezado += col.toString().padStart(3, " "); // Alinea números con padding
  }

  console.log(encabezado);

  // Segundo nivel: recorrer todas las FILAS (0 a 7)
  for (let fila = 0; fila < 8; fila++) {
    // Comienza la línea con el número de fila (1 a 8)
    let linea = `Fila ${(fila + 1).toString().padStart(1, " ")} `;

    // Tercer nivel: recorrer todas las COLUMNAS de esa fila (0 a 9)
    for (let columna = 0; columna < 10; columna++) {
      // Convierte valor numérico a letra:
      // Si valor es 0 → "L" (asiento libre)
      // Si valor es 1 → "X" (asiento ocupado)
      const asiento = sala[fila][columna] === 0 ? "L" : "X";

      // Agrega el asiento a la línea con padding para alineación
      linea += asiento.padStart(3, " ");
    }

    // Muestra la línea completa
    console.log(linea);
  }
}

// ============================================================
// FUNCIÓN: reservarAsiento()
// ============================================================

/**
 * Intenta reservar un asiento específico en la sala.
 * Valida las coordenadas, verifica disponibilidad y actualiza la matriz.
 * 
 * @param sala {number[][]} - Matriz de asientos
 * @param fila {number} - Número de fila (1-8, coordenadas humanas)
 * @param columna {number} - Número de columna (1-10, coordenadas humanas)
 * @returns {string} - Mensaje indicando resultado de la operación
 */
function reservarAsiento(sala: number[][], fila: number, columna: number): string {
  // ===== VALIDACIÓN 1: Verificar que fila esté en rango válido (1-8) =====
  if (fila < 1 || fila > 8) {
    return `❌ Error: La fila debe estar entre 1 y 8. Ingresaste: ${fila}`;
  }

  // ===== VALIDACIÓN 2: Verificar que columna esté en rango válido (1-10) =====
  if (columna < 1 || columna > 10) {
    return `❌ Error: La columna debe estar entre 1 y 10. Ingresaste: ${columna}`;
  }

  // ===== CONVERSIÓN: Convertir de coordenadas humanas a índices de JavaScript =====
  // Las filas y columnas van de 1-8 y 1-10 respectivamente
  // Pero los arrays en JavaScript comienzan en índice 0
  // Por eso restamos 1 a ambas coordenadas
  const indiceF = fila - 1;      // Fila 1 → índice 0, Fila 8 → índice 7
  const indiceC = columna - 1;   // Columna 1 → índice 0, Columna 10 → índice 9

  // ===== VALIDACIÓN 3: Verificar si el asiento ya está ocupado =====
  if (sala[indiceF][indiceC] === 1) {
    return `❌ El asiento de la fila ${fila}, columna ${columna} ya está ocupado.`;
  }

  // ===== ACCIÓN: Cambiar el valor del asiento de 0 a 1 =====
  sala[indiceF][indiceC] = 1;

  // ===== CONFIRMACIÓN: Devolver mensaje de éxito =====
  return `✅ Reserva realizada correctamente: fila ${fila}, columna ${columna}.`;
}

// ============================================================
// FUNCIÓN: contarAsientos()
// ============================================================

/**
 * Recorre toda la matriz y cuenta los asientos ocupados y disponibles.
 * Devuelve ambos contadores en un arreglo de dos posiciones.
 * 
 * @param sala {number[][]} - Matriz de asientos a contar
 * @returns {[number, number]} - Array con [ocupados, disponibles]
 */
function contarAsientos(sala: number[][]): [number, number] {
  // Inicializa los contadores en 0
  let ocupados = 0;
  let disponibles = 0;

  // Bucle externo: recorre todas las FILAS (0 a 7)
  for (let fila = 0; fila < 8; fila++) {
    // Bucle interno: recorre todas las COLUMNAS (0 a 9) de cada fila
    for (let columna = 0; columna < 10; columna++) {
      // Accede al valor actual de la posición [fila][columna]
      if (sala[fila][columna] === 1) {
        // Si el valor es 1 (ocupado), incrementa el contador de ocupados
        ocupados++;
      } else {
        // Si el valor es 0 (disponible), incrementa el contador de disponibles
        disponibles++;
      }
    }
  }

  // Devuelve ambos contadores como un arreglo de dos elementos
  return [ocupados, disponibles];
}

// ============================================================
// FUNCIÓN: buscarAsientosContiguos()
// ============================================================

/**
 * Busca el primer par de asientos disponibles consecutivos horizontalmente
 * en la sala. Recorre filas con for y columnas con while.
 * 
 * @param sala {number[][]} - Matriz de asientos
 * @returns {number[][] | null} - Posiciones en numeración humana [[fila, col1], [fila, col2]] o null
 */
function buscarAsientosContiguos(sala: number[][]): number[][] | null {
  // Bucle externo: recorre todas las FILAS (0 a 7 = filas 1 a 8)
  for (let fila = 0; fila < 8; fila++) {
    // Bucle interno: recorre las COLUMNAS de la fila actual
    // Usamos while porque necesitamos avanzar hasta columna 9
    // para poder comparar columna[i] con columna[i+1]
    // El límite es 9 porque tenemos índices 0-9 (10 columnas)
    // y necesitamos verificar columna + siguiente columna
    let columna = 0;
    
    while (columna < 9) {
      // Verifica si el asiento actual (columna) y el siguiente (columna+1) están disponibles (valor = 0)
      if (sala[fila][columna] === 0 && sala[fila][columna + 1] === 0) {
        // Si encuentra un par de asientos libres consecutivos:
        // Convierte índices (0-7, 0-9) a numeración humana (1-8, 1-10)
        // y devuelve el primer par encontrado
        return [
          [fila + 1, columna + 1],      // Primer asiento: [fila_humana, columna_humana]
          [fila + 1, columna + 2]       // Segundo asiento: [fila_humana, columna_siguiente_humana]
        ];
      }
      
      // Avanza a la siguiente columna
      columna++;
    }
  }

  // Si termina los bucles sin encontrar un par, devuelve null
  return null;
}

// ============================================================
// EJECUCIÓN Y PRUEBAS
// ============================================================

console.log("🎬 Inicializando sala de cine...\n");

// Llama la función y almacena la matriz
const matrizSala = inicializarSala();

// Verifica las dimensiones de la matriz
console.log("📊 VERIFICACIÓN DE DIMENSIONES:");
console.log(`   • Número de filas: ${matrizSala.length}`);
console.log(`   • Número de columnas: ${matrizSala[0].length}`);
console.log(`   • Total de asientos: ${matrizSala.length * matrizSala[0].length}\n`);

// Simula algunos asientos ocupados (valores 1) para demostración
console.log("🎫 Simulando algunas reservas previas...\n");
matrizSala[0][2] = 1; // Fila 1, Columna 3 → Ocupado
matrizSala[0][9] = 1; // Fila 1, Columna 10 → Ocupado
matrizSala[1][5] = 1; // Fila 2, Columna 6 → Ocupado
matrizSala[2][1] = 1; // Fila 3, Columna 2 → Ocupado
matrizSala[4][4] = 1; // Fila 5, Columna 5 → Ocupado
matrizSala[7][0] = 1; // Fila 8, Columna 1 → Ocupado

// Muestra la sala inicial
console.log("🎬 ESTADO INICIAL DE LA SALA:\n");
mostrarSala(matrizSala);

// ===== PRUEBA 1: Reserva correcta =====
console.log("\n\n📝 PRUEBA 1: Reservar un asiento disponible (Fila 3, Columna 5)");
console.log("────────────────────────────────────────────────────");
const resultado1 = reservarAsiento(matrizSala, 3, 5);
console.log(resultado1);

// ===== PRUEBA 2: Intentar reservar el mismo asiento =====
console.log("\n📝 PRUEBA 2: Intentar reservar el mismo asiento (Fila 3, Columna 5)");
console.log("────────────────────────────────────────────────────");
const resultado2 = reservarAsiento(matrizSala, 3, 5);
console.log(resultado2);

// ===== PRUEBA 3: Fila inválida (mayor a 8) =====
console.log("\n📝 PRUEBA 3: Intentar reservar con fila inválida (Fila 10, Columna 5)");
console.log("────────────────────────────────────────────────────");
const resultado3 = reservarAsiento(matrizSala, 10, 5);
console.log(resultado3);

// ===== PRUEBA 4: Columna inválida (mayor a 10) =====
console.log("\n📝 PRUEBA 4: Intentar reservar con columna inválida (Fila 5, Columna 15)");
console.log("────────────────────────────────────────────────────");
const resultado4 = reservarAsiento(matrizSala, 5, 15);
console.log(resultado4);

// ===== PRUEBA 5: Coordenadas negativas =====
console.log("\n📝 PRUEBA 5: Intentar reservar con coordenadas negativas (Fila 0, Columna 5)");
console.log("────────────────────────────────────────────────────");
const resultado5 = reservarAsiento(matrizSala, 0, 5);
console.log(resultado5);

// ===== PRUEBA 6: Otra reserva correcta =====
console.log("\n📝 PRUEBA 6: Reservar otro asiento disponible (Fila 7, Columna 8)");
console.log("────────────────────────────────────────────────────");
const resultado6 = reservarAsiento(matrizSala, 7, 8);
console.log(resultado6);

// Muestra la sala después de las operaciones
console.log("\n\n🎬 ESTADO FINAL DE LA SALA (después de las reservas):\n");
mostrarSala(matrizSala);

// ===== CONTAR ASIENTOS =====
console.log("\n\n📊 CONTEO DE ASIENTOS");
console.log("════════════════════════════════════════════════════");

// Llama a contarAsientos y obtiene los resultados
const [ocupados, disponibles] = contarAsientos(matrizSala);

// Muestra los resultados
console.log(`✈️  Asientos ocupados:    ${ocupados}`);
console.log(`🟢 Asientos disponibles: ${disponibles}`);
console.log(`📋 Total de asientos:    ${ocupados + disponibles}`);

// Verifica que la suma sea correcta (80 asientos en total)
console.log("\n📈 VALIDACIÓN:");
if (ocupados + disponibles === 80) {
  console.log("✅ Suma correcta: ocupados + disponibles = 80");
} else {
  console.log(`❌ Error: ocupados (${ocupados}) + disponibles (${disponibles}) ≠ 80`);
}

// Calcula el porcentaje de ocupación
const porcentajeOcupacion = ((ocupados / 80) * 100).toFixed(2);
const porcentajeDisponibilidad = ((disponibles / 80) * 100).toFixed(2);

console.log(`\n📊 PORCENTAJE DE OCUPACIÓN:`);
console.log(`   • Ocupación: ${porcentajeOcupacion}%`);
console.log(`   • Disponibilidad: ${porcentajeDisponibilidad}%`);

// ===== BÚSQUEDA DE ASIENTOS CONTIGUOS =====
console.log("\n\n🔍 BÚSQUEDA DE ASIENTOS CONTIGUOS");
console.log("════════════════════════════════════════════════════");

// Busca el primer par de asientos disponibles consecutivos
const paEncontrado = buscarAsientosContiguos(matrizSala);

if (paEncontrado !== null) {
  const [asiento1, asiento2] = paEncontrado;
  console.log(`✅ Par encontrado:`);
  console.log(`   • Asiento 1: Fila ${asiento1[0]}, Columna ${asiento1[1]}`);
  console.log(`   • Asiento 2: Fila ${asiento2[0]}, Columna ${asiento2[1]}`);
  console.log(`   • En formato: [${asiento1}], [${asiento2}]`);
} else {
  console.log(`❌ No se encontraron asientos contiguos disponibles`);
}

// ===== PRUEBA 2: Ocupar más asientos y buscar nuevamente =====
console.log("\n\n📝 PRUEBA ADICIONAL: Después de ocupar más asientos");
console.log("────────────────────────────────────────────────────");

// Ocupa algunos asientos para modificar el patrón
console.log("Ocupando asientos: (1,2), (1,3), (4,1), (4,2), (4,3)...\n");
reservarAsiento(matrizSala, 1, 2);
reservarAsiento(matrizSala, 1, 3);
reservarAsiento(matrizSala, 4, 1);
reservarAsiento(matrizSala, 4, 2);
reservarAsiento(matrizSala, 4, 3);

// Muestra la sala actualizada
console.log("🎬 SALA ACTUALIZADA:\n");
mostrarSala(matrizSala);

// Busca nuevamente
console.log("\n🔍 Buscando asientos contiguos...\n");
const paEncontrado2 = buscarAsientosContiguos(matrizSala);

if (paEncontrado2 !== null) {
  const [asiento1, asiento2] = paEncontrado2;
  console.log(`✅ Nuevo par encontrado:`);
  console.log(`   • Asiento 1: Fila ${asiento1[0]}, Columna ${asiento1[1]}`);
  console.log(`   • Asiento 2: Fila ${asiento2[0]}, Columna ${asiento2[1]}`);
  console.log(`   • En formato: [${asiento1}], [${asiento2}]`);
} else {
  console.log(`❌ No se encontraron asientos contiguos disponibles`);
}

// ===== PRUEBA 3: Ocupar casi toda la sala =====
console.log("\n\n📝 PRUEBA EXTREMA: Ocupar casi toda la sala");
console.log("────────────────────────────────────────────────────");

console.log("Ocupando todos los asientos menos dos específicos...\n");

// Ocupa todos los asientos disponibles excepto dos pares específicos
for (let fila = 0; fila < 8; fila++) {
  for (let columna = 0; columna < 10; columna++) {
    // Deja libre un par en fila 2 (columnas 2-3) como único par disponible
    if ((fila === 1 && columna >= 2 && columna <= 3)) {
      // Mantiene estos libres
      continue;
    }
    matrizSala[fila][columna] = 1;
  }
}

// Muestra la sala casi llena
console.log("🎬 SALA CASI LLENA:\n");
mostrarSala(matrizSala);

// Cuenta asientos
const [ocupados3, disponibles3] = contarAsientos(matrizSala);
console.log(`\n📊 Asientos ocupados: ${ocupados3}, Disponibles: ${disponibles3}\n`);

// Busca el único par disponible
console.log("🔍 Buscando asientos contiguos...\n");
const paEncontrado3 = buscarAsientosContiguos(matrizSala);

if (paEncontrado3 !== null) {
  const [asiento1, asiento2] = paEncontrado3;
  console.log(`✅ ÚNICO par encontrado:`);
  console.log(`   • Asiento 1: Fila ${asiento1[0]}, Columna ${asiento1[1]}`);
  console.log(`   • Asiento 2: Fila ${asiento2[0]}, Columna ${asiento2[1]}`);
  console.log(`   • En formato: [${asiento1}], [${asiento2}]`);
} else {
  console.log(`❌ No se encontraron asientos contiguos disponibles`);
}

console.log("\n✅ Todas las pruebas completadas exitosamente");

export {};
