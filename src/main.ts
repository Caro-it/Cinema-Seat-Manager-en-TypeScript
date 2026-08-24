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
// Usar nombres en vez de 0 y 1 hace el código más legible.
const LIBRE: number = 0;
const OCUPADO: number = 1;

/**
 * Crea una sala nueva con todos los asientos libres.
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
 * Muestra "X" para ocupados y "L" para libres, con los números
 * de fila y columna para localizar cada asiento.
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
 * Reserva un asiento marcándolo como ocupado.
 * Comprueba primero que la posición exista y después que el
 * asiento no estuviera ya reservado.
 * @param sala    matriz de asientos (se modifica si hay éxito)
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

  // Validación 3: el asiento no puede estar ya ocupado
  if (sala[fila][columna] === OCUPADO) {
    return `NO DISPONIBLE: el asiento (fila ${fila}, columna ${columna}) ya está ocupado.`;
  }

  // Supera las tres validaciones: se reserva
  sala[fila][columna] = OCUPADO;
  return `RESERVA CONFIRMADA: asiento (fila ${fila}, columna ${columna}).`;
}

/**
 * Recorre toda la sala y cuenta los asientos según su estado.
 * @param sala matriz de asientos a analizar
 * @returns tupla con [ocupados, libres]
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

// ============================================================
//  PRUEBAS
// ============================================================

const salaCine: number[][] = crearSala(FILAS, COLUMNAS);

console.log("=== SALA VACÍA ===");
mostrarSala(salaCine);

console.log("=== PROBANDO RESERVAS ===");
console.log(reservarAsiento(salaCine, 0, 0));   // debe funcionar
console.log(reservarAsiento(salaCine, 0, 0));   // ya ocupado
console.log(reservarAsiento(salaCine, 3, 5));   // debe funcionar
console.log(reservarAsiento(salaCine, 99, 2));  // fila inexistente
console.log(reservarAsiento(salaCine, 2, 50));  // columna inexistente

console.log("\n=== SALA DESPUÉS DE LAS RESERVAS ===");
mostrarSala(salaCine);

const [ocupados, libres] = contarAsientos(salaCine);
console.log(`Ocupados: ${ocupados}  |  Disponibles: ${libres}  |  Total: ${ocupados + libres}`);