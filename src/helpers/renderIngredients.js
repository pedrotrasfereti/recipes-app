// React
import React from 'react';

const renderIngredients = (details = {}) => {
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
