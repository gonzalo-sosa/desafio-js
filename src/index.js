import { usuarios } from "./modules/usuario.js";
import { crearUsuario } from "./lib/factory.js";

const admin = crearUsuario("admin", {
  nombre: "gonzalo",
  email: "gonzalo@email.com",
  clave: "123",
});

console.log({ usuarios });

const editor = crearUsuario("editor", {
  nombre: "agustin",
  email: "agustin@email.com",
  clave: "123",
});

const regular = crearUsuario("regular", {
  nombre: "emanuel",
  email: "emanuel@email.com",
  clave: "123",
});

admin.agregarUsuario(editor);
admin.agregarUsuario(regular);
admin.eliminarUsuario(regular);

console.log({ usuarios });

for (let usuario of usuarios) {
  usuario.login();
  usuario.logout();
}
