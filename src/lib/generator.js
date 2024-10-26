import { createHash } from "crypto";

export async function obtenerUUID() {
  return createHash("sha256").update(new Date().toISOString()).digest("hex");
}

export async function cifrarClave(clave, semilla) {
  return createHash("sha256")
    .update(clave + semilla)
    .digest("hex");
}
