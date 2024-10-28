import { obtenerUUID } from "../lib/generator.js";
import { esString } from "../utils/validator.js";

export class Contenido {
  constructor(titulo, texto) {
    let _id = obtenerUUID();
    this._titulo = titulo;
    this._texto = texto;
  }

  set titulo(nuevoTitulo) {
    console.log("Modificando título...");
    if (!esString(nuevoTitulo)) throw new Error("Título no válido.");

    this._titulo = nuevoTitulo;
    console.log("Título modificado correctamente.");
  }

  get titulo() {
    return this._titulo;
  }

  set texto(nuevoTexto) {
    console.log("Modificando texto...");
    if (!esString(nuevoTexto)) throw new Error("Texto no válido.");

    this._texto = nuevoTexto;
    console.log("Texto modificado correctamente.");
  }

  get texto() {
    return this._texto;
  }
}

export function esInstanciaDeContenido(obj) {
  return obj instanceof Contenido;
}
