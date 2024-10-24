export function obtenerUID(n = 100) {
  return Date.now() * Math.floor(Math.random() * n);
}

// TODO: cifrar clave con semilla
export function cifrarClave(semilla) {
  return semilla;
}
