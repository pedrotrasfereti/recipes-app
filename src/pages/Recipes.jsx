// React
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// PropTypes
import PropTypes from 'prop-types';

// Router
import { useHistory, useLocation } from 'react-router';

// Helpers
import capitalize from '../helpers/capitalizeStr';

// Children
import Footer from '../components/Footer';
import Header from '../components/Header';

// Action async
import { fetchRecipes } from '../redux/actions';

function Recipes({ foodDrink }) {
  const { loading, results } = useSelector((state) => state.recipes);
  const recipes = results[foodDrink] || [];
  const foodDrinkCap = capitalize(foodDrink).slice(0, foodDrink.length - 1);
  const path = useLocation().pathname;

  const [categories, setCategories] = useState([]);

  function filterCategories() {
    let btnsLimit = [];
    const categoryBTNS = recipes.filter((item) => {
      const FIVE = 5;
      if (btnsLimit.length < FIVE && !(btnsLimit.includes(item.strCategory))) {
        btnsLimit = [...btnsLimit, item.strCategory];
        return item.strCategory;
      }
    });
    console.log(categoryBTNS, '39');
    return categoryBTNS;
  }

  const dispatch = useDispatch();
  const treatedPath = path.slice(1);

  useEffect(() => {
    if (recipes.length) {
      filterCategories();
      console.log(filterCategories(), '47');
    }
  }, [recipes]);

  useEffect(() => {
    dispatch(fetchRecipes('', '', `${treatedPath}`));
  }, [path]);

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
      <Footer />
    </>
  );
}

Recipes.propTypes = {
  foodDrink: PropTypes.string,
}.isRequired;

export default Recipes;
