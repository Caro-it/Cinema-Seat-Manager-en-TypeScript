// ============================================================
//  CINEMA SEAT MANAGER
//  Gestor de reservas de asientos para una sala de cine.
//  La sala se representa como un arreglo bidimensional donde
//  cada posición es un asiento:  0 = libre   1 = ocupado
// ============================================================

// Dimensiones de la sala
const FILAS: number = 8;
const COLUMNAS: number = 10;

// Estados posibles de un asiento.
// Usar nombres en lugar de 0 y 1 hace el código mucho más legible.
const LIBRE: number = 0;
const OCUPADO: number = 1;

/**
 * Crea una sala nueva con todos los asientos libres.
 * Recorre las filas y, dentro de cada una, construye un arreglo
 * independiente con tantos ceros como columnas tenga la sala.
 * @param filas    número de filas de la sala
 * @param columnas número de asientos por fila
 * @returns matriz de filas x columnas rellena con 0 (libre)
 */
function crearSala(filas: number, columnas: number): number[][] {
  const sala: number[][] = [];

  for (let i = 0; i < filas; i++) {
    const filaActual: number[] = [];

    for (let j = 0; j < columnas; j++) {
      filaActual.push(LIBRE);
    }

    sala.push(filaActual);
  }

  return sala;
}

/**
 * Imprime el estado actual de la sala en la consola.
 * Muestra "X" para los asientos ocupados y "L" para los libres,
 * junto con los números de fila y de columna para localizarlos.
 * @param sala matriz de asientos a mostrar
 */
function mostrarSala(sala: number[][]): void {
  console.log("\n        ┌────────────────────────┐");
  console.log("        │        PANTALLA        │");
  console.log("        └────────────────────────┘\n");

  // Cabecera con los números de columna
  let cabecera: string = "     ";
  for (let j = 0; j < sala[0].length; j++) {
    cabecera += String(j).padStart(2, " ") + " ";
  }
  console.log(cabecera);

  // Una línea por fila, precedida por su número
  for (let i = 0; i < sala.length; i++) {
    let linea: string = String(i).padStart(2, " ") + "   ";
    for (let j = 0; j < sala[i].length; j++) {
      const simbolo: string = sala[i][j] === OCUPADO ? "X" : "L";
      linea += simbolo.padStart(2, " ") + " ";
    }
    console.log(linea);
  }

  console.log("\n     L = Libre    X = Ocupado\n");
}

/**
 * Reserva un asiento concreto marcándolo como ocupado.
 * Valida primero que la posición exista dentro de la sala y
 * después que el asiento no estuviera ya reservado.
 * @param sala    matriz de asientos (se modifica si la reserva tiene éxito)
 * @param fila    número de fila solicitada
 * @param columna número de columna solicitada
 * @returns mensaje indicando si la operación tuvo éxito o falló
 */
function reservarAsiento(sala: number[][], fila: number, columna: number): string {
  // Validación 1: la fila debe existir
  if (fila < 0 || fila >= sala.length) {
    return `ERROR: la fila ${fila} no existe. Filas válidas: 0 a ${sala.length - 1}.`;
  }

  // Validación 2: la columna debe existir
  if (columna < 0 || columna >= sala[fila].length) {
    return `ERROR: la columna ${columna} no existe. Columnas válidas: 0 a ${sala[fila].length - 1}.`;
  }

  // Validación 3: el asiento no puede estar ya reservado
  if (sala[fila][columna] === OCUPADO) {
    return `NO DISPONIBLE: el asiento (fila ${fila}, columna ${columna}) ya está ocupado.`;
  }

  // Supera las tres validaciones: se confirma la reserva
  sala[fila][columna] = OCUPADO;
  return `RESERVA CONFIRMADA: asiento (fila ${fila}, columna ${columna}).`;
}

/**
 * Recorre toda la sala y cuenta los asientos según su estado.
 * @param sala matriz de asientos a analizar
 * @returns tupla con [asientos ocupados, asientos libres]
 */
function contarAsientos(sala: number[][]): [number, number] {
  let ocupados: number = 0;
  let libres: number = 0;

  for (let i = 0; i < sala.length; i++) {
    for (let j = 0; j < sala[i].length; j++) {
      if (sala[i][j] === OCUPADO) {
        ocupados++;
      } else {
        libres++;
      }
    }
  }

  return [ocupados, libres];
}

/**
 * Busca el primer par de asientos libres contiguos en horizontal.
 * Recorre la sala fila por fila, de izquierda a derecha, y en cada
 * posición comprueba si ese asiento y el de su derecha están libres.
 * Al encontrar el primer par sale de inmediato con return.
 * @param sala matriz de asientos donde buscar
 * @returns [fila, columna] del asiento izquierdo del par, o [-1, -1] si no hay
 */
function buscarAsientosContiguos(sala: number[][]): [number, number] {
  for (let i = 0; i < sala.length; i++) {
    // Se detiene en la penúltima columna: la última no tiene vecino a la derecha
    for (let j = 0; j < sala[i].length - 1; j++) {
      if (sala[i][j] === LIBRE && sala[i][j + 1] === LIBRE) {
        return [i, j];
      }
    }
  }

  // Se recorrió toda la sala sin encontrar ningún par
  return [-1, -1];
}

/**
 * Muestra por consola el informe completo de una sala: su estado
 * visual, el recuento de ocupación y el resultado de la búsqueda
 * de asientos contiguos.
 * @param titulo texto identificativo del escenario
 * @param sala   matriz de asientos a analizar
 */
function informarEstado(titulo: string, sala: number[][]): void {
  console.log("\n============================================");
  console.log("  " + titulo);
  console.log("============================================");

  mostrarSala(sala);

  const [ocupados, libres] = contarAsientos(sala);
  console.log(`Ocupados: ${ocupados}  |  Disponibles: ${libres}  |  Total: ${ocupados + libres}`);

  const [fila, columna] = buscarAsientosContiguos(sala);
  if (fila === -1) {
    console.log("Asientos juntos: NO hay dos asientos libres contiguos en ninguna fila.");
  } else {
    console.log(`Asientos juntos: fila ${fila}, asientos ${columna} y ${columna + 1}.`);
  }
}

// ============================================================
//  ESCENARIOS DE PRUEBA
// ============================================================

// --- Escenario 1: sala vacía (todos los asientos disponibles) ---
const salaVacia: number[][] = crearSala(FILAS, COLUMNAS);
informarEstado("ESCENARIO 1: SALA VACÍA", salaVacia);

// --- Escenario 2: sala parcialmente ocupada ---
const salaParcial: number[][] = crearSala(FILAS, COLUMNAS);
console.log("\n--- Reservas del escenario 2 ---");
console.log(reservarAsiento(salaParcial, 0, 0));
console.log(reservarAsiento(salaParcial, 0, 1));
console.log(reservarAsiento(salaParcial, 3, 5));
console.log(reservarAsiento(salaParcial, 3, 5));   // ya ocupado
console.log(reservarAsiento(salaParcial, 99, 2));  // fila inexistente
console.log(reservarAsiento(salaParcial, 2, 50));  // columna inexistente
informarEstado("ESCENARIO 2: SALA PARCIALMENTE OCUPADA", salaParcial);

// --- Escenario 3: casi llena, solo quedan asientos sueltos ---
// Se ocupan las columnas impares para que ningún par quede junto
const salaSueltos: number[][] = crearSala(FILAS, COLUMNAS);
for (let i = 0; i < FILAS; i++) {
  for (let j = 1; j < COLUMNAS; j = j + 2) {
    reservarAsiento(salaSueltos, i, j);
  }
}
informarEstado("ESCENARIO 3: SOLO ASIENTOS SUELTOS", salaSueltos);

// --- Escenario 4: sala completamente llena ---
const salaLlena: number[][] = crearSala(FILAS, COLUMNAS);
for (let i = 0; i < FILAS; i++) {
  for (let j = 0; j < COLUMNAS; j++) {
    reservarAsiento(salaLlena, i, j);
  }
}
informarEstado("ESCENARIO 4: SALA COMPLETAMENTE LLENA", salaLlena);