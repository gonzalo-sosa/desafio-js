// TODO: verificación de email
// TODO: hash de clave
import { obtenerUID, cifrarClave } from "../lib/generator.js";

export var usuarios = [];

const _id = new WeakMap();
const _nombre = new WeakMap();
const _email = new WeakMap();
const _sesionIniciada = new WeakMap();

export function Usuario(nombre, email, clave) {
  _id.set(this, obtenerUID());
  _nombre.set(this, nombre);
  _email.set(this, email);
  _sesionIniciada.set(this, false);
  let _clave = cifrarClave(clave);
}

Usuario.prototype.login = function () {
  let sesionIniciada = _sesionIniciada.get(this);

  if (sesionIniciada) throw new Error("La sesión ya está iniciada.");

  _sesionIniciada.set(this, !sesionIniciada);
};

Usuario.prototype.logout = function () {
  let sesionIniciada = _sesionIniciada.get(this);

  if (!sesionIniciada) throw new Error("La sesión ya está cerrada.");

  _sesionIniciada.set(this, !sesionIniciada);
};
