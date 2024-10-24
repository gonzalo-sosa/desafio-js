export function esString(str) {
  return typeof str === "string";
}

export function esObjeto(obj) {
  return typeof obj === "object";
}

export function verificarEmail(email) {
  if (!esString(email)) throw new Error("Email no es string.");
  if (!email.includes("@")) throw new Error("Email no contiene @.");
}
