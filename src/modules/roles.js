import { usuarios, Usuario } from "./usuario.js";
import { extend } from "../lib/extend.js";

export function Administrador(nombre, email, clave) {
  Usuario.call(this, nombre, email, clave);

  this.agregarUsuario = function (usuario) {
    // TODO: verificar que es usuario válido
    if (typeof usuario !== "object") throw new Error("No es objeto.");

    usuarios.push(usuario);
  };

  this.eliminarUsuario = function (usuario) {
    // TODO: verificar que es usuario válido
    if (typeof usuario !== "object") throw new Error("No es objeto.");

    usuarios.splice(usuarios.findIndex(usuario), 1);
  };
}

export function Editor(nombre, email, clave) {
  Usuario.call(this, nombre, email, clave);

  this.editarContenido = function (contenido, { titulo, texto }) {
    if (typeof titulo !== "string") throw new Error("Titulo no es string.");
    if (typeof texto !== "string") throw new Error("Texto no es string.");
    if (typeof contenido !== "object") throw new Error("No es objeto.");

    contenido.editarTitulo(titulo);
    contenido.editarTexto(texto);
  };
}

export function UsuarioRegular(nombre, email, clave) {
  Usuario.call(this, nombre, email, clave);

  this.verContenido = function (contenido) {
    // TODO: verificar que es contenido válido
    if (typeof contenido !== "object") throw new Error("No es objeto.");

    console.log(`${this.nombre} viendo "${contenido.titulo}"`);
  };
}

extend(Administrador, Usuario);
extend(Editor, Usuario);
extend(UsuarioRegular, Usuario);

export const ROLES = {
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
  REGULAR: "REGULAR",
};
