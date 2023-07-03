const state = {
  favorites: [],
  interested: [],
  going: [],
};

const prueba = {
  getdata(value) {
    return [...state[value]];
  },
  addEvent(value, event) {
    state[value].push(event);
    if (value === 'interested') {
      state.going = state.going.filter((element) => element.id !== event.id);
    } else {
      state.interested = state.interested.filter((element) => element.id !== event.id);
    }
  },
};

export {prueba};














// // // stringify convierte un objeto o valor de JavaScript en una cadena de texto JSON
// // // condition ? exprIfTrue : exprIfFalse
// // //The conditional (ternary) operator is the only JavaScript operator that takes three operands: a condition followed by a question mark (?), then an expression to execute if the condition is truthy followed by a colon (:), and finally the expression to execute if the condition is falsy.
// // //La condición es una expresión que se evalúa como verdadera o falsa. Si la condición es verdadera, se devuelve el valorSiCierto. Si la condición es falsa, se devuelve el valorSiFalso.