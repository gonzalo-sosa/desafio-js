import { cifrarClave } from "../lib/generator.js";
import { usuarios } from "../modules/usuario.js";

export const iniciarSesion = ({ email, clave }) => {
  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) {
    throw new Error("El usuario no existe.");
  }
  if (usuario.clave !== cifrarClave(clave)) {
    throw new Error("La clave es incorrecta.");
  }

  usuario.login();
};

export const cerrarSesion = ({ id }) => {
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) {
    throw new Error("El usuario no existe.");
  }

  usuario.logout();
};
