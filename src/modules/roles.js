import { usuarios, Usuario, esInstanciaDeUsuario } from "./usuario.js";
import { extend } from "../lib/extend.js";
import { esObjeto } from "../utils/validator.js";
import { esInstanciaDeContenido } from "./contenido.js";

export function Administrador(nombre, email, clave) {
  Usuario.call(this, nombre, email, clave);

  this.agregarUsuario = function (usuario) {
    if (!esObjeto(usuario)) throw new Error("No es objeto.");
    if (!esInstanciaDeUsuario(usuario)) throw new Error("No es usuario.");

    usuarios.push(usuario);
  };

  this.eliminarUsuario = function (usuario) {
    if (!esObjeto(usuario)) throw new Error("No es objeto.");
    if (!esInstanciaDeUsuario(usuario)) throw new Error("No es usuario.");

    const indice = usuarios.findIndex((u) => 
      u.id === usuario.id
    );

    usuarios.splice(indice, 1);
  };

  usuarios.push(this);
}

export function Editor(nombre, email, clave) {
  Usuario.call(this, nombre, email, clave);

  this.editarContenido = function (contenido, { titulo, texto }) {
    if (typeof contenido !== "object") throw new Error("No es objeto.");
    if (!esInstanciaDeContenido(contenido)) throw new Error("No es contenido.");

    contenido.titulo = titulo;
    contenido.texto = texto;
  };
}

export function UsuarioRegular(nombre, email, clave) {
  Usuario.call(this, nombre, email, clave);

  this.verContenido = function (contenido) {
    if (!esObjeto(contenido)) throw new Error("No es objeto.");
    if (!esInstanciaDeContenido(contenido)) throw new Error("No es contenido.");

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
