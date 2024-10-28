import { usuarios, Usuario, esInstanciaDeUsuario } from "./usuario.js";
import { extend } from "../lib/extend.js";
import { esInstanciaDeContenido } from "./contenido.js";

export function Administrador(nombre, email, clave) {
  Usuario.call(this, nombre, email, clave);

  this.agregarUsuario = function (usuario) {
    console.log("Agregando usuario...");

    if (!esInstanciaDeUsuario(usuario))
      throw new Error("No es usuario válido.");

    usuarios.push(usuario);

    console.log(`Usuario ${usuario.nombre}, agregado correctamente.\n`);
  };

  this.eliminarUsuario = function (usuario) {
    console.log(`Eliminando usuario...`);

    if (!esInstanciaDeUsuario(usuario))
      throw new Error("No es usuario válido.");

    const indice = usuarios.findIndex((u) => u.id === usuario.id);

    if (indice === -1) throw new Error("No se encontró el usuario.");

    usuarios.splice(indice, 1);

    console.log(`Usuario ${usuario.nombre}, eliminado correctamente.\n`);
  };

  usuarios.push(this);
}

export function Editor(nombre, email, clave) {
  Usuario.call(this, nombre, email, clave);

  this.editarContenido = function (contenido, { titulo, texto }) {
    if (!this.sesionIniciada)
      throw new Error(
        "La sesión no está iniciada. Inicie sesión para poder editar contenido."
      );

    console.log(`${this.nombre} está modificando contenido...`);
    if (!esInstanciaDeContenido(contenido))
      throw new Error("No es contenido válido.");

    contenido.titulo = titulo;
    contenido.texto = texto;
  };
}

export function UsuarioRegular(nombre, email, clave) {
  Usuario.call(this, nombre, email, clave);

  this.verContenido = function (contenido) {
    if (!this.sesionIniciada)
      throw new Error(
        "La sesión no está iniciada. Inicie sesión para poder ver contenido"
      );

    if (!esInstanciaDeContenido(contenido))
      throw new Error("No es contenido válido.");

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
