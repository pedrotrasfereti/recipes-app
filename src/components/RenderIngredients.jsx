// React
import React, { useEffect } from 'react';
import useIngredients from '../hooks/useIngredients';

function RenderIngredients({ details, checkbox, id, foodDrink }) {
  const detailsArr = Object.entries(details);

  /* Pegar ingredientes */
  const ingrValues = detailsArr.filter((entry) => (
    entry[0].includes('strIngredient') && entry[1]
  )).map((e) => e[1]);

  /* Pegar medidas */
  const measureValues = detailsArr.filter((entry) => (
    entry[0].includes('strMeasure') && entry[1]
  )).map((e) => e[1]);

  /* Mergiar arrays */
  const combined = ingrValues.map((value, i) => [`${value} - ${measureValues[i]}`]);

  const INITIAL_STATE = {
    cocktails: {},
    meals: {},
  };
  const [ingredients,
    setIngredients] = useIngredients('inProgressRecipes', INITIAL_STATE);
  const pushIngredient = (ingredient) => {
    const key = foodDrink === 'meals' ? 'meals' : 'cocktails';
    const list = ingredients[key][id];
    console.log(ingredients);
    setIngredients({ ...ingredients, [key]: { [id]: [...list, ingredient] } });
  };

  /* Retornar lista de elementos */
  if (checkbox) {
    return combined.map((item, i) => (
      <label data-testid={ `${i}-ingredient-step` } htmlFor={ i } key={ i }>
        {item}
        <input
          type="checkbox"
          id={ i }
          value={ item }
          onClick={ (e) => pushIngredient(e.target.value) }
        />
      </label>
    ));
  }
  return combined.map((item, i) => (
    <li
      key={ item }
      data-testid={ `${i}-ingredient-name-and-measure` }
    >
      { item }
    </li>
  ));
}

export default RenderIngredients;
