import { usuarios } from "./modules/usuario.js";
import { crearUsuario } from "./lib/factory.js";

try {
  const admin = crearUsuario("admin", {
    nombre: "gonzalo",
    email: "gonzalo@email.com",
    clave: "123",
  });

  console.log("Los usuarios existentes son:", usuarios);

  const editor = crearUsuario("editor", {
    nombre: "agustin",
    email: "agustinemail.com",
    clave: "123",
  });

  const regular = crearUsuario("regular", {
    nombre: "emanuel",
    email: "emanuel@email.com",
    clave: "123",
  });

  admin.agregarUsuario(editor);
  admin.agregarUsuario(regular);

  admin.eliminarUsuario(); // ERROR

  console.log(usuarios);

  for (let usuario of usuarios) {
    usuario.login();
    usuario.logout();
  }
} catch (error) {
  console.log(error.message);
}
