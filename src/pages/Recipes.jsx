// React
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// PropTypes
import PropTypes from 'prop-types';

// Router
import { useHistory, useLocation } from 'react-router';

// Helpers
import { Link } from 'react-router-dom';
import capitalize from '../helpers/capitalizeStr';

// Children
import Footer from '../components/Footer';
import Header from '../components/Header';

// Action async
import { fetchRecipes } from '../redux/actions';
import { categoriesAPI, filterCategoryAPI } from '../services/apiRequest';

const INITIAL_CATEGORY_FILTER = 'ALL';
function Recipes({ foodDrink }) {
  const { loading, results } = useSelector((state) => state.recipes);
  const recipes = results[foodDrink] || []; // se results estiver em fetching retorna []
  const foodDrinkCap = capitalize(foodDrink).slice(0, foodDrink.length - 1);
  const path = useLocation().pathname;

  const [categories, setCategories] = useState(['ALL']);
  const [categoryFilter, setCategoryFilter] = useState(INITIAL_CATEGORY_FILTER);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const dispatch = useDispatch();
  const treatedPath = path.slice(1);

  useEffect(() => {
    const MAX_CATEGORIES = 5;
    const fetchCategories = async () => {
      const categoriesResult = await categoriesAPI(foodDrink); // retorno da API => { drinks :{}}  || { meals: {}}
      setCategories(await categoriesResult[foodDrink].slice(0, MAX_CATEGORIES)); // foodDrink => 'meals' or 'drinks'
    };
    fetchCategories();
  }, [foodDrink]);

  useEffect(() => {
    async function categoryFilterRecipes() {
      if (categoryFilter !== 'ALL') {
        setLoadingFetch(true);
        const categoryItens = await filterCategoryAPI(foodDrink, categoryFilter);
        setFilteredRecipes(await categoryItens);
        setLoadingFetch(false);
      }
    }
    categoryFilterRecipes();
  }, [categoryFilter]);

  useEffect(() => {
    const foodOrDrinkLoad = () => {
      setCategoryFilter(INITIAL_CATEGORY_FILTER);
      dispatch(fetchRecipes('', '', `${treatedPath}`));
    };
    foodOrDrinkLoad();
  }, [path]);

  function renderRecipes() {
    console.log('renderRecipes()');
    if (categoryFilter === 'ALL') return recipes;
    if (filteredRecipes && filteredRecipes.length > 1) console.log(filteredRecipes, 'L65');
    return (filteredRecipes && filteredRecipes.length ? filteredRecipes : recipes);
  }

  const history = useHistory();
  return (
    <>
      <Header searchBtn title={ capitalize(path.slice(1, path.length)) } />
      {/* Filtro Por Categoria */}
      <button
        onClick={ ({ target: { value } }) => {
          setCategoryFilter(value);
        } }
        type="button"
        data-testid="All-category-filter"
        value="ALL"
      >
        All
      </button>
      {categories.map(({ strCategory }, index) => (
        <button
          key={ `${strCategory} - ${index}` }
          onClick={ ({ target: { value } }) => {
            setCategoryFilter(categoryFilter !== value ? value : INITIAL_CATEGORY_FILTER);
          } }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          value={ strCategory }
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
            (renderRecipes()).map((recipe, index) => {
              const PAGE_LIMIT = 11;
              if (index <= PAGE_LIMIT) { // && categoryFilter ?
                return (
                  <div
                    key={ recipe[`id${foodDrinkCap}`] }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <Link to={ `${(foodDrink === 'meals' ? 'comidas' : 'bebidas')}/${recipe[`id${foodDrinkCap}`]}` }>
                      <img
                        src={ recipe[`str${foodDrinkCap}Thumb`] }
                        data-testid={ `${index}-card-img` }
                        alt={ recipe[`str${foodDrinkCap}`] }
                      />
                    </Link>
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
