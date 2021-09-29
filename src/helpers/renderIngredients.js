// React
import React from 'react';

const renderIngredients = (details = {}, checkbox = '') => {
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

  /* Retornar lista de elementos */
  if (checkbox) {
    return combined.map((item, i) => (
      <label data-testid={ `${i}-ingredient-step` } htmlFor={ i } key={ i }>
        {item}
        <input type="checkbox" id={ i } />
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
};

export default renderIngredients;
