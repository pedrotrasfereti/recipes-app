// React
import React from 'react';
import { useSelector } from 'react-redux';

// PropTypes
import PropTypes from 'prop-types';

// Router
import { useHistory, useLocation } from 'react-router';

// Helpers
import capitalize from '../helpers/capitalizeStr';

// Children
import Header from '../components/Header';

function Recipes({ foodDrink }) {
  const { loading, results } = useSelector((state) => state.recipes);
  const recipes = results[foodDrink];
  const foodDrinkCap = capitalize(foodDrink).slice(0, foodDrink.length - 1);
  const path = useLocation().pathname;

  const history = useHistory();
  return (
    <>
      <Header searchBtn title={ capitalize(path.slice(1, path.length)) } />
      <main>
        {
          (!loading && !recipes) && <p>Digite algum termo de pesquisa</p>
        }
        {
          loading && <h1>Carregando...</h1>
        }
        {
          recipes === null && global
            .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
        }
        {
          recipes && recipes.length > 1 && (
            recipes.map((recipe, index) => {
              const PAGE_LIMIT = 11;
              if (index <= PAGE_LIMIT) {
                return (
                  <div
                    key={ recipe[`id${foodDrinkCap}`] }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <img
                      src={ recipe[`str${foodDrinkCap}Thumb`] }
                      data-testid={ `${index}-card-img` }
                      alt={ recipe[`str${foodDrinkCap}`] }
                    />
                    <span
                      data-testid={ `${index}-card-name` }
                    >
                      {recipe[`str${foodDrinkCap}`]}
                    </span>
                  </div>
                );
              } return null;
            })
          )
        }
        {
          (recipes && recipes.length === 1) && history
            .push(`${path}/${recipes[0][`id${foodDrinkCap}`]}`)
        }
      </main>
    </>
  );
}

Recipes.propTypes = {
  foodDrink: PropTypes.string,
}.isRequired;

export default Recipes;
