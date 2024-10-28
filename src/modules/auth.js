import { usuarios } from "../modules/usuario.js";
import { verificarEmail } from "../utils/validator.js";

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

export function cambiarClave(email, nuevaClave) {
  verificarEmail(email);

  const usuario = usuarios.find((u) => u.email === email);

  if (!usuario) throw new Error(`Usuario con email ${email} inexistente.`);

  usuario.cambiarClave(nuevaClave);
}

export function envioDeFormulario(evento) {
  console.log("Enviando formulario...");
  evento.preventDefault();
  const $form = evento.target;
  const datos = new FormData($form);
  const email = datos.get("email");
  const clave = datos.get("clave");

  iniciarSesion({ email, clave });
}
