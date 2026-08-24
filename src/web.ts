// ============================================================
//  CINEMA SEAT MANAGER - INTERFAZ WEB (reto extra opcional)
//  Version visual del gestor de asientos. La logica de datos
//  es la misma que en main.ts: un arreglo bidimensional donde
//  0 = libre y 1 = ocupado.
// ============================================================

import "./style.css";

const FILAS: number = 8;
const COLUMNAS: number = 10;
const LIBRE: number = 0;
const OCUPADO: number = 1;

/** Crea una sala nueva con todos los asientos libres. */
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

/** Reserva un asiento validando rango y disponibilidad. */
function reservarAsiento(sala: number[][], fila: number, columna: number): string {
  if (fila < 0 || fila >= sala.length) {
    return `ERROR: la fila ${fila} no existe.`;
  }
  if (columna < 0 || columna >= sala[fila].length) {
    return `ERROR: la columna ${columna} no existe.`;
  }
  if (sala[fila][columna] === OCUPADO) {
    return `NO DISPONIBLE: el asiento (fila ${fila}, columna ${columna}) ya esta ocupado.`;
  }
  sala[fila][columna] = OCUPADO;
  return `RESERVA CONFIRMADA: asiento (fila ${fila}, columna ${columna}).`;
}

/** Cuenta los asientos ocupados y libres. Devuelve [ocupados, libres]. */
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

/** Busca el primer par de asientos libres contiguos en horizontal. */
function buscarAsientosContiguos(sala: number[][]): [number, number] {
  for (let i = 0; i < sala.length; i++) {
    for (let j = 0; j < sala[i].length - 1; j++) {
      if (sala[i][j] === LIBRE && sala[i][j + 1] === LIBRE) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
}

// ============================================================
//  RENDERIZADO EN PANTALLA
// ============================================================

const sala: number[][] = crearSala(FILAS, COLUMNAS);
let resaltados: [number, number] = [-1, -1];

const contenedor = document.getElementById("mapa-asientos") as HTMLDivElement;
const panelMensaje = document.getElementById("mensaje") as HTMLParagraphElement;
const panelContador = document.getElementById("contador") as HTMLParagraphElement;
const botonBuscar = document.getElementById("btn-buscar") as HTMLButtonElement;
const botonReiniciar = document.getElementById("btn-reiniciar") as HTMLButtonElement;

/** Dibuja la cuadricula completa de asientos en el HTML. */
function dibujarSala(): void {
  contenedor.innerHTML = "";

  // Fila de cabecera con los numeros de columna
  const cabecera = document.createElement("div");
  cabecera.className = "flex gap-1 mb-2";
  const esquina = document.createElement("div");
  esquina.className = "w-8";
  cabecera.appendChild(esquina);
  for (let j = 0; j < COLUMNAS; j++) {
    const num = document.createElement("div");
    num.className = "w-10 text-center text-xs text-slate-400";
    num.textContent = String(j);
    cabecera.appendChild(num);
  }
  contenedor.appendChild(cabecera);

  // Una fila por cada fila de asientos
  for (let i = 0; i < FILAS; i++) {
    const filaDiv = document.createElement("div");
    filaDiv.className = "flex gap-1 mb-1 items-center";

    const numFila = document.createElement("div");
    numFila.className = "w-8 text-center text-xs text-slate-400";
    numFila.textContent = String(i);
    filaDiv.appendChild(numFila);

    for (let j = 0; j < COLUMNAS; j++) {
      const asiento = document.createElement("button");
      asiento.textContent = sala[i][j] === OCUPADO ? "X" : "L";

      let estilo = "w-10 h-10 rounded-lg text-sm font-bold border-2 transition ";
      if (sala[i][j] === OCUPADO) {
        estilo += "bg-red-100 border-red-300 text-red-600 cursor-not-allowed";
      } else if (i === resaltados[0] && (j === resaltados[1] || j === resaltados[1] + 1)) {
        estilo += "bg-amber-300 border-amber-500 text-amber-900";
      } else {
        estilo += "bg-emerald-100 border-emerald-300 text-emerald-700 hover:bg-emerald-200";
      }
      asiento.className = estilo;

      asiento.addEventListener("click", function () {
        panelMensaje.textContent = reservarAsiento(sala, i, j);
        resaltados = [-1, -1];
        dibujarSala();
      });

      filaDiv.appendChild(asiento);
    }
    contenedor.appendChild(filaDiv);
  }

  const [ocupados, libres] = contarAsientos(sala);
  panelContador.textContent = `Ocupados: ${ocupados}  |  Disponibles: ${libres}  |  Total: ${ocupados + libres}`;
}

botonBuscar.addEventListener("click", function () {
  const [fila, columna] = buscarAsientosContiguos(sala);
  if (fila === -1) {
    resaltados = [-1, -1];
    panelMensaje.textContent = "NO hay dos asientos libres contiguos en ninguna fila.";
  } else {
    resaltados = [fila, columna];
    panelMensaje.textContent = `Asientos juntos: fila ${fila}, asientos ${columna} y ${columna + 1}.`;
  }
  dibujarSala();
});

botonReiniciar.addEventListener("click", function () {
  for (let i = 0; i < FILAS; i++) {
    for (let j = 0; j < COLUMNAS; j++) {
      sala[i][j] = LIBRE;
    }
  }
  resaltados = [-1, -1];
  panelMensaje.textContent = "Sala reiniciada. Todos los asientos estan libres.";
  dibujarSala();
});

dibujarSala();