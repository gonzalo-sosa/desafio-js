// TODO: verificación de email
// TODO: hash de clave
import { obtenerUID, cifrarClave } from "../lib/generator.js";
import { verificarEmail } from "../utils/validator.js";

export var usuarios = []; // Variable global

const _id = new WeakMap();
const _nombre = new WeakMap();
const _email = new WeakMap();
const _sesionIniciada = new WeakMap();

export function Usuario(nombre, email, clave) {
  verificarEmail(email);

  _id.set(this, obtenerUID());
  _nombre.set(this, nombre);
  _email.set(this, email.trim());
  _sesionIniciada.set(this, false);
  let _clave = cifrarClave(clave);

  Object.defineProperty(this, "_id", {
    get: function () {
      return _id.get(this);
    },
  });
}

Usuario.prototype.login = function () {
  let sesionIniciada = _sesionIniciada.get(this);

  if (sesionIniciada) throw new Error("La sesión ya está iniciada.");

  _sesionIniciada.set(this, !sesionIniciada);

  console.log(`Bienvenido, ${_nombre.get(this)}.`);
};

Usuario.prototype.logout = function () {
  let sesionIniciada = _sesionIniciada.get(this);

  if (!sesionIniciada) throw new Error("La sesión ya está cerrada.");

  _sesionIniciada.set(this, !sesionIniciada);

  console.log(`Hasta la proxima ${_nombre.get(this)}.`);
};

export function esInstanciaDeUsuario(obj) {
  return obj instanceof Usuario;
}
