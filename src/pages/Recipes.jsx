// React
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Header from '../components/Header';

function Recipes({ foodDrink }) {
  const { loading, results } = useSelector((state) => state.recipes);
  const recipes = results[foodDrink];

  const history = useHistory();
  return (
    <>
      <Header searchBtn />
      <main>
        {(!loading && !recipes) && <p>Digite algum termo de pesquisa</p>}
        {loading && <h1>Carregando...</h1>}
        {recipes === null && global
          .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')}
        {recipes && recipes.length > 1 && recipes.map((recipe, index) => {
          const PAGE_LIMIT = 11;
          if (index <= PAGE_LIMIT) {
            return (
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  src={ recipe.strMealThumb }
                  data-testid={ `${index}-card-img` }
                  alt={ recipe.strMeal }
                />
                <span data-testid={ `${index}-card-name` }>{recipe.strMeal}</span>
              </div>
            );
          } return null;
        })}
        {(recipes && recipes.length === 1) && history
          .push(`/comidas/${recipes[0].idMeal}`) }
      </main>
    </>
  );
}

Recipes.propTypes = {
  foodDrink: PropTypes.string,
}.isRequired;

export default Recipes;
