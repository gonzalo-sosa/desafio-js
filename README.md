# Desafío JavaScript

[Ver consignas](./consignas.md)

## Introducción

Este proyecto tiene la finalidad de crear un sistema de autenticación que interactué con usuarios para iniciar sus sesiones o cerrarlas. Este sistema respeta los fundamentos OOP por lo que en sus módulos se ven las declaraciones de clases con propiedades y métodos.

## Estructura del proyecto

```bash
/src
  /assets
    favicon.ico
  /lib
    extend.js
    factory.js
    generator.js
  /modules
    auth.js
    contenido.js
    roles.js
    usuario.js
  /utils
    validator.js
  index.html
  index.js
  style.css
/dist
  main.bundle.js
package.json
webpack.config.cjs
README.md
.gitignore
```

- "src" contiene los archivos que van a ser utilizados por la aplicación web.
- "utils" contiene archivos que son útiles pero que no refieren estrictamente a funciones del sistema.
- "lib" contiene las funciones que se utilizan reiteradamente en las clases de "modules".
- "modules" contiene la declaración de las clases del proyecto: usuario, administrador, editor y usuario regular. Además, el sistema de autenticación que interactúa con las clases.

## Configuración e instalación

Este proyecto utiliza pnpm para el manejo de paquetes o node modules.

```bash
pnpm install
```

Además, existen unos comandos para ejecutar el proyecto de diferentes maneras:

- dev:serve para preparar un puerto en el que se ejecutará el navegador web

```bash
pnpm run dev:serve
```

- dev:watch para ejecutar en modo development un build con observación que ejecuta el build cada vez que se realiza un cambio en el código

```bash
pnpm run dev:watch
```

- dev:build para realizar un build del proyecto pero en modo development

```bash
pnpm run dev:build
```

- build para realizar un build del proyecto en modo production

```bash
pnpm run build
```

## Desafíos enfrentados

### Utilizar crypto en browser

Crypto es un módulo de node por que lo no puede ser accedido en el browser, para poder utilizarlo hay que agregar plugins a webpack para que genere el código faltante.

Primero se instalan los módulos a utilizar:

```bash
pnpm install crypto-browserify process stream-browserify
```

Luego se modifica el archivo de webpack:

```js
//webpack.config.cjs
const webpack = require("webpack");
```

```js
module.exports = {
 resolve: {
    fallback: {
      vm: false, // se evita un fallback para vm
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      process: require.resolve("process/browser"),
    },
  }
}
```

```js
module.exports = {
  plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
      new webpack.NormalModuleReplacementPlugin(/node:crypto/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      })
  ]
}
```

### Configuración webpack para index.html

El archivo entry de javascript se agrega automáticamente en el template de index.html

```js
// webpack.config.cjs
module.exports = {
 plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // archivo que se utilizará para agregar el js
      favicon: "./src/assets/favicon.ico", // para agregar favicon
    })
 ]
}
```

### Plugin CSS

El archivo de css hay que importarlo en el entry de javascript sino no se realizará el bundle sobre él.

```js
// index.js
import './style.css'
```

### Recursividad en setter de contenido

En la clase contenido se declaran propiedades _id, título y texto. Para modificar el título y el texto se crean setters para validar el valor antes de asignarlo al objeto.

```js
class Contenido {
  constructor(titulo, texto) {
    let _id = obtenerUUID();
    this.titulo = titulo;
    this.texto = texto;
  }

  set titulo(nuevoTitulo) {
     if (!esString(nuevoTitulo)) throw new Error("Título no válido.");
    
    this.titulo = nuevoTitulo;
  }

  set texto(nuevoTexto) {
     if (!esString(nuevoTexto)) throw new Error("Texto no válido.");
    
    this.texto = nuevoTexto;
  }
}
```

Pero al momento de cambiar una propiedad el programa deja de funcionar y se muestra un mensaje por consola "Maximum call stack size exceeded" que indica que programa se quedó sin memoria.
Entonces, realizo un debug del archivo "index.js" en visual studio code con "node.js" pero comentando el import de archivo css y el manejo del DOM.

```js
//import "./style.css";
```

```js
/*
const $form = document.getElementById("iniciar-sesion");
$form.addEventListener("submit", envioDeFormulario);
*/
```

Luego, coloco un breakpoint cuando se modifica el contenido, concretamente en la línea 39. Al revisar veo que la función setter entra correctamente, realiza la validación pero cuando se quiere asignar el valor se vuelve a llamar a la función. Esto debido a que la propiedad el setter llevan el mismo nombre, por lo que para solucionar este problema sólo hay que modificar el nombre de las propiedades.

```js
class Contenido {
  constructor(titulo, texto) {
    let _id = obtenerUUID();
    this._titulo = titulo;
    this._texto = texto;
  }

  set titulo(nuevoTitulo) {
     if (!esString(nuevoTitulo)) throw new Error("Título no válido.");
    
    this._titulo = nuevoTitulo;
  }

  set texto(nuevoTexto) {
     if (!esString(nuevoTexto)) throw new Error("Texto no válido.");
    
    this._texto = nuevoTexto;
  }
}
```

## Mejoras a futuro

Interactividad con página index.html

Una vez iniciada la sesión redireccionar al usuario a otra ruta o modificar la página actual.

Evitar que se pueda cambiar de contraseña de un usuario sin realizar una verificación externa (por correo).


## Hoisting y Closures

Para demostrar el hoisting se utilizan las Constructor Function que son elevadas al inicio del archivo para ser creadas antes de que las utilicen, las closures en el uso de la variable con alcance global "usuarios" y la herencia prototipal en los métodos "login" y "logout" de "Usuario".

Variable con alcance global "usuarios", es un array vacío que permite que las clases interactúen con él para agregar usuarios mediante push o eliminar algún usuario con splice.

```js
var usuarios = []
```

Constructor Function "Usuario" que es afectada por Hoisting

```js
function Usuario(nombre, email, clave) {
  // Ver usuario.js
}
```

## Herencia Prototipal y OOP

La clase base "usuario" contiene propiedades privadas y método públicos que se detallarán a continuación:

Propiedades privadas de "usuario", se utiliza "WeakMap" para evitar el simple acceso ya que se necesitan crear getters y setters para interactuar con estas mismas:

```js
const _id = new WeakMap();
const _nombre = new WeakMap();
const _email = new WeakMap();
const _sesionIniciada = new WeakMap();

function Usuario(nombre, email, clave){
  _id.set(this, obtenerUUID());
  _nombre.set(this, nombre.trim());
  _email.set(this, email.trim());
  _sesionIniciada.set(this, false);
}
```

Getters de propiedades específicas:

```js
function Usuario(nombre, email, clave){
  // Ver usuario.js
  
  // Get de nombre
  Object.defineProperty(this, "nombre", {
    get: function () {
      return _nombre.get(this);
    },
  });

  // Get de email
  Object.defineProperty(this, "email", {
    get: function () {
      return _email.get(this);
    },
  });

  // Get de sesionIniciada
  Object.defineProperty(this, "sesionIniciada", {
    get: function () {
      return _sesionIniciada.get(this);
    },
  });
}
```

Propiedad "_clave" que únicamente existe en el contexto del usuario actual y es privada por el uso de "let":

```js
function Usuario(nombre, email, clave)
{
  let _clave = cifrarClave(clave);
}
```

Métodos públicos para verificación de datos:

```js
function Usuario(nombre, email, clave){
  // Ver usuario.js
  this.esIdCorrecto = function (id) {
    return _id.get(this) === id;
  };

  this.esClaveCorrecta = function (clave) {
    return _clave === cifrarClave(clave);
  };
}
```

Herencia prototipal de métodos "login" y "logout".

```js
Usuario.prototype.login = function () {
  // Ver implementación en usuario.js
};

Usuario.prototype.logout = function () {
  /// Ver implementación en usuario.js
};
```

Clase Administrador hereda de la clase base "Usuario".

```js
function Administrador(nombre, email, clave) {
  Usuario.call(this, nombre, email, clave); // Llamada al constructor de usuario

  // Ver roles.js
}
```

Clase Editor hereda de la clase base "Usuario".

```js
function Editor(nombre, email, clave) {
  Usuario.call(this, nombre, email, clave); // Llamada al constructor de usuario

  // Ver roles.js
}
```

Clase UsuarioRegular hereda de la clase base "Usuario".

```js
function UsuarioRegular(nombre, email, clave) {
  Usuario.call(this, nombre, email, clave); // Llamada al constructor de usuario

  // Ver roles.js
}
```

La clase Administrador puede agregar o eliminar usuarios:

```js
function Administrador(){
  // Ver roles.js
  
  // Agrega usuario realizando el push a la variable global usuarios
  this.agregarUsuario = function (usuario) {
    // Ver validaciones en roles.js
    usuarios.push(usuario);
  };

  // Elimina usuario al quitarlo de la variable global usuarios
  this.eliminarUsuario = function (usuario) {
    // Ver validaciones en roles.js
    const indice = usuarios.findIndex((u) => u.id === usuario.id);
    
    if (indice === -1) throw new Error("No se encontró el usuario.");
    
    usuarios.splice(indice, 1);
  };
}
```

El Editor puede modificar contenido pero no usuarios:

```js
function Editor(nombre, email, clave){
  // Ver roles.js
  this.editarContenido = function (contenido, { titulo, texto }) {
    // Ver validaciones en roles.js
    contenido.titulo = titulo;
    contenido.texto = texto;
  };
}
```

El UsuarioRegular sólo puede ver contenido:

```js
function UsuarioRegular(nombre, email, clave){
   this.verContenido = function (contenido) {
    // Ver en roles.js
  };
}
```

## Características modernas de javascript

Arrow Functions, en la función "iniciarSesion" se crea una función flecha que se ejecuta en cada iteración de usuarios.

```js
const iniciarSesion = ({ email, clave }) => {
  // Find recibe una Arrow Function que, a su vez, recibe un usuario en cada iteración y realiza la comparación de email
  const usuario = usuarios.find((u) => u.email === email);
  
  // Ver validaciones en auth.js

  usuario.login();
};
```

Template Literals, con el uso de los backticks se escribe un mensaje por consola dando una bienvenida al usuaria que ha iniciado sesión.

```js
Usuario.prototype.login = function () {
  // Ver implementación en usuario.js

  // Se accede al nombre mediante el getter
  console.log(`Bienvenido, ${this.nombre}.`);
};
```

Destructuring, al el segundo parámetro que es un objeto, se desestructuran sus propiedades mediante el uso de las llaves y enunciar sus propiedades.

```js
const crearUsuario = (tipo, { nombre, email, clave }) => {
  // Ver en factory.js
}
```

## Módulos y Webpack

### Módulos

Estructura de módulos

```bash
/modules
  usuario.js
  roles.js
  auth.js
```

- [Clase usuario](./src/modules/usuario.js)

- [Roles y permisos](./src/modules/roles.js)

- [Autenticación y gestión de sesiones](./src/modules/auth.js)

### Webpack

[Archivo de configuración webpack](./webpack.config.cjs)

- [Entrada](./src/index.js)

```js
module.exports = {
  entry: "./src/index.js"
}
```

- Salida en "dist/main.bundle.js" (no visible ya que se ignore en .gitignore)

```js
module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  }
} 

```

- Loaders y Plugins:

Loaders

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // loader de babel
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // css loader
      },
    ],
  }
}
```

Plugins

```js
module.exports = {
  plugins: [
    // Plugin para HTML
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/assets/favicon.ico",
    }),
    // Plugin para CSS
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    // para poder utilizar crypto en browser
    new webpack.NormalModuleReplacementPlugin(/node:crypto/, (resource) => {
      resource.request = resource.request.replace(/^node:/, "");
    }),
  ]
}
```

DevServer para ejecutar código en el navegador dado un puerto específico: 

```js
module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
    open: true,
  }
}
```
