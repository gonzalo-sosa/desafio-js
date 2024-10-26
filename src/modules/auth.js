import { usuarios } from "../modules/usuario.js";

export const iniciarSesion = ({ email, clave }) => {
  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) {
    throw new Error("El usuario no existe.");
  }

  if (!usuario.esClaveCorrecta(clave)) {
    throw new Error("La clave es incorrecta.");
  }

  usuario.login();
};

export const cerrarSesion = ({ id }) => {
  const usuario = usuarios.find((u) => u.esIdCorrecto(id));
  if (!usuario) {
    throw new Error("El usuario no existe.");
  }

  usuario.logout();
};

export function envioDeFormulario(evento) {
  console.log("Enviando formulario...");
  evento.preventDefault();
  const $form = evento.target;
  const datos = new FormData($form);
  const email = datos.get("email");
  const clave = datos.get("clave");

  iniciarSesion({ email, clave });
}

export function limpiarFormulario(evento) {
  console.log("Limpiando formulario...");
  evento.preventDefault();
  const $form = evento.target;
  $form.reset();
}
