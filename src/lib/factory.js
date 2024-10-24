import { Administrador, Editor, UsuarioRegular, ROLES } from "../modules/roles";

/**
 @param tipo string - Tipo de usuario a crear. Ver ROLES en roles.js
 @param usuario - nombre, email y clave.
 **/
export const crearUsuario = function (tipo, { nombre, email, clave }) {
  if (typeof tipo !== "string") throw new Error("Tipo no es string.");
  if (tipo.toUpperCase() === ROLES.ADMIN)
    return new Administrador(nombre, email, clave);
  if (tipo.toUpperCase() === ROLES.EDITOR)
    return new Editor(nombre, email, clave);
  if (tipo.toUpperCase() === ROLES.REGULAR)
    return new UsuarioRegular(nombre, email, clave);
  return null;
};
