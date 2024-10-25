export async function obtenerUUID() {
  const { randomUUID } = await import("crypto");

  return randomUUID();
}

export async function cifrarClave(clave, semilla) {
  const { createHash } = await import("crypto");

  return createHash("sha256")
    .update(clave + semilla)
    .digest("hex");
}
