const validate = (game) => {
  const errorForm = {};

  if (game.nombre.length <= 2) {
    errorForm.nombre =
      "El nombre ingresado no puede contener mas de 2 caracteres";
  }
  if (game.descripcion.length >= 254) {
    errorForm.descripcion =
      "La descripcion tiene que ser mayor a 255 caracteres";
  }
  if (game.rating < 0 || game.rating >= 5) {
    errorForm.rating = "Rating tiene que ser mayor a 0 y menor o igual a 5";
  }
  if (game.genero.length <= 1) {
    errorForm.genero = "el juego debe de tener al menos un tipo de genero";
  }
  if (game.plataformas.length <= 1) {
    errorForm.plataformas =
      "el juego debe de tener al menos un tipo de plataforma";
  }

  return errorForm;
};

export default validate;
