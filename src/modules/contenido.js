import { obtenerUID } from "../lib/generator.js";

class Contenido {
  constructor(titulo, texto) {
    this.id = obtenerUID();
    this.titulo = titulo;
    this.texto = texto;
  }

  editarTitulo(titulo) {
    this.titulo = titulo;
  }

  editarTexto(texto) {
    this.texto = texto;
  }
}

module.exports = {
  Contenido,
};
