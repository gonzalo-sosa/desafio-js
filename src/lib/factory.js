import {
  Administrador,
  Editor,
  UsuarioRegular,
  ROLES,
} from "../modules/roles.js";
import { esString } from "../utils/validator.js";

/**
 * Crea un usuario de tipo Administrador, Editor o UsuarioRegular.
 * @param {string} tipo - Tipo de usuario a crear. Ver ROLES en roles.js
 * @param {{nombre: string, email: string, clave: string}} usuario - nombre, email y clave.
 * @returns {Administrador|Editor|UsuarioRegular|null} - El nuevo usuario o null si no
 * se pudo crear.
 */
export const crearUsuario = (tipo, { nombre, email, clave }) => {
  if (!esString(tipo)) throw new Error("Tipo no es string.");

  if (tipo.toUpperCase() === ROLES.ADMIN)
    return new Administrador(nombre, email, clave);

  if (tipo.toUpperCase() === ROLES.EDITOR)
    return new Editor(nombre, email, clave);

  if (tipo.toUpperCase() === ROLES.REGULAR)
    return new UsuarioRegular(nombre, email, clave);

  return null;
};

export const crearContenido = ({ titulo, texto }) => {
  return new Contenido(titulo, texto);
};
