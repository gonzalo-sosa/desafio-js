import { obtenerUID } from "../lib/generator.js";
import { esString } from "../utils/validator.js";

export class Contenido {
  constructor(titulo, texto) {
    let id = obtenerUID();
    let titulo = titulo;
    let texto = texto;
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
