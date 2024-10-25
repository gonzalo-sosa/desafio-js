/**
 * Establece herencia de prototipos de Parent a Child.
 * @param {Function} Child - La función constructor de la clase child.
 * @param {Function} Parent - La función constructor de la clase parent.
 */
export function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}
