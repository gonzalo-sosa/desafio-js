import { obtenerUUID } from "../lib/generator.js";
import { esString } from "../utils/validator.js";

export class Contenido {
  constructor(titulo, texto) {
    let _id = obtenerUUID();
    this.titulo = titulo;
    this.texto = texto;
  }

  set titulo(nuevoTitulo) {
    if (!esString(nuevoTitulo)) throw new Error("Título no válido.");

    this.titulo = nuevoTitulo;
  }

  get titulo() {
    return this.titulo;
  }

  set texto(nuevoTexto) {
    if (!esString(nuevoTexto)) throw new Error("Texto no válido.");

    this.texto = nuevoTexto;
  }

  get texto() {
    return this.texto;
  }
}

export function esInstanciaDeContenido(obj) {
  return obj instanceof Contenido;
}
