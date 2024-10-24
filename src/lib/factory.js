import { Administrador, Editor, UsuarioRegular, ROLES } from "../modules/roles";
import { esString } from "../utils/validator";

/**
 @param tipo string - Tipo de usuario a crear. Ver ROLES en roles.js
 @param usuario - nombre, email y clave.
 **/
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

export const crearContenido = () => {
  return new Contenido();
};
