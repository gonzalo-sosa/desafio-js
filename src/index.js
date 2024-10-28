import { usuarios } from "./modules/usuario.js";
import { crearUsuario } from "./lib/factory.js";
import { cambiarClave, envioDeFormulario } from "./modules/auth.js";
import { Contenido } from "./modules/contenido.js";
import "./style.css";

const $form = document.getElementById("iniciar-sesion");

$form.addEventListener("submit", envioDeFormulario);

try {
  const contenido = new Contenido(
    "Título de contenido",
    "Texto del contenido."
  );

  const admin = crearUsuario("admin", {
    nombre: "gonzalo",
    email: "gonzalo@email.com",
    clave: "123",
  });

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

  cambiarClave("emanuel@email.com", "321");

  editor.editarContenido(contenido, {
    titulo: "Contenido modificado por editor",
    texto: "Texto de contenido",
  });

  regular.verContenido(contenido);

  console.log(usuarios);
} catch (error) {
  console.log(error.message);
}
