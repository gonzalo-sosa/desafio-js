# Desafío JavaScript

[Ver consignas](./consignas.md)

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

### Clase Base Usuario

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
  