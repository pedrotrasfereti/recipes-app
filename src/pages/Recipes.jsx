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
import { fetchCategories } from '../services/apiRequest';

function Recipes({ foodDrink }) {
  const { loading, results } = useSelector((state) => state.recipes);
  const recipes = results[foodDrink] || []; // se results estiver em fetching retorna []
  const foodDrinkCap = capitalize(foodDrink).slice(0, foodDrink.length - 1);
  const path = useLocation().pathname;

  const [categories, setCategories] = useState([]);

  // function filterCategories(maxOfCategoriesToFilter, categories) {
  //   const categoryForBTNS = categories.reduce((categoriesName, { strCategory }) => {
  //     const notInCategoriesName = !categoriesName.includes(strCategory);
  //     const hasSlotCategoriesName = categoriesName.length < maxOfCategoriesToFilter;

  //     if (notInCategoriesName && hasSlotCategoriesName) {
  //       const addToCategoryBTNS = [...categoriesName, strCategory];
  //       return addToCategoryBTNS; // Adiciona nova categoria
  //     }
  //     return categoriesName; // Encontrou uma categoria que já foi adicionada, então não adiciona
  //   }, []);
  //   return categoryForBTNS;
  // }

  const dispatch = useDispatch();
  const treatedPath = path.slice(1);

  useEffect(() => {
    const MAX_CATEGORIES = 5;
    const categoriesResult = fetchCategories(foodDrink)
      .then((categoriesData) => {
        console.log('L51', categoriesData, categoriesData[foodDrink]);
        setCategories(categoriesData[foodDrink].slice(0, MAX_CATEGORIES)); // foodDrink <= recebe "meals" ou "drinks"
      });
  }, [foodDrink]);

  useEffect(() => {
    dispatch(fetchRecipes('', '', `${treatedPath}`));
  }, [path]);

  const history = useHistory();
  return (
    <>
      <Header searchBtn title={ capitalize(path.slice(1, path.length)) } />
      {/* Filtro Por Categoria */}
      {categories.map(({ strCategory }, index) => (
        <button
          key={ `${strCategory} - ${index}` }
          onClick={ (e) => console.log(e.target) }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
        >
          {strCategory}
        </button>))}

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
