// ============================================================
//  CINEMA SEAT MANAGER
//  Gestor de reservas de asientos para una sala de cine.
//  La sala se representa como un arreglo bidimensional de
//  números, donde cada posición es un asiento:
//     0 = asiento libre      1 = asiento ocupado
// ============================================================

// Alias de tipo: describe la forma de nuestra matriz de asientos.
// No es un objeto ni una clase, solo un nombre para "number[][]".
type Sala = number[][];

// Constantes de configuración de la sala
const FILAS: number = 8;
const COLUMNAS: number = 10;

// Constantes para los dos estados posibles de un asiento.
// Usar nombres en lugar de 0 y 1 hace el código mucho más legible.
const LIBRE: number = 0;
const OCUPADO: number = 1;

/**
 * Crea una sala nueva con todos los asientos libres.
 * @param filas    número de filas de la sala
 * @param columnas número de asientos por fila
 * @returns una matriz de filas x columnas rellena con 0 (libre)
 */
function crearSala(filas: number, columnas: number): Sala {
  const sala: Sala = [];

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
 * @param sala la matriz de asientos a mostrar
 */
function mostrarSala(sala: Sala): void {
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

// ============================================================
//  PRUEBA TEMPORAL
// ============================================================

const salaCine: Sala = crearSala(FILAS, COLUMNAS);
mostrarSala(salaCine);