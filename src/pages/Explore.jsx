// React
import React, { useEffect, useState } from 'react';

// Router
import { Link, useHistory } from 'react-router-dom';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/actions';

// Children
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreNav from '../components/ExploreNav';
import ExploreNavFd from '../components/ExploreNavFd';

// Helpers
import {
  explorePageTitle,
  shouldRenderIngrs,
  shouldRenderAreas,
} from '../helpers/explore';

// Services
import { ingredientsAPI, areasAPI, recipesByAreaAPI } from '../services/apiRequest';

function Explore(props) {
  // Props
  const { foodDrink, explore } = props;
  const browseByArea = explore === 'area';
  const browseByIngr = explore === 'ingredients';

  // Hooks
  const history = useHistory();
  const dispatch = useDispatch();

  // State Hooks
  const [loading, setLoading] = useState(false); // Carregando
  const [ingredients, setIngredients] = useState([]); // Ingredientes
  const [areas, setAreas] = useState([]); // Areas
  const [recipes, setRecipes] = useState([]); // Receitas, por area
  const [option, setOption] = useState('All'); // Area, valor do dropdown
  console.log(option);

  useEffect(() => {
    if (browseByIngr) {
      const fetchIngredients = async () => {
        setLoading(true);
        setIngredients(await ingredientsAPI(foodDrink));
        setLoading(false);
      };
      fetchIngredients();
    } else if (browseByArea) {
      const fetchAreas = async () => {
        setLoading(true);
        setAreas(await areasAPI());
        setLoading(false);
      };
      fetchAreas();
    }
  }, [browseByIngr, browseByArea, foodDrink]);

  useEffect(() => {
    if (browseByArea) {
      const fetchRecipesByArea = async () => {
        setLoading(true);
        setRecipes(await recipesByAreaAPI(option));
        setLoading(false);
      };
      fetchRecipesByArea();
    }
  }, [browseByArea, option]);

  // Redirecionar para a tela de receitas e realizar busca por ingrediente
  const filterByIngredient = (name, filter, type) => {
    dispatch(fetchRecipes(name, filter, type));
  };

  // Mudar filtro de area
  const handleChange = ({ target: { value } }) => {
    setOption(value);
  };

  return (
    <section>
      {/* Cabeçalho */}
      <Header
        title={ explorePageTitle(props) }
        searchBtn={ browseByArea }
      />

      {/* Botões de navegar bebidas ou comidas */}
      { !Object.keys(props).length && <ExploreNav history={ history } /> }

      {/* Botões de navegar por ingredientes e/ou por origem */}
      { (foodDrink && !explore) && (
        <ExploreNavFd
          foodDrink={ foodDrink }
          explore={ explore }
          history={ history }
        />
      ) }

      { loading && <span>Carregando...</span> }

      {/* Cards de ingredientes */}
      { shouldRenderIngrs(browseByIngr, ingredients, loading) && (
        ingredients.map(({ name, thumb, type }, i) => (
          <Link
            to={ `/${type}` }
            onClick={ () => filterByIngredient(name, 'ingredient', type) }
            key={ i }
          >
            <div data-testid={ `${i}-ingredient-card` }>
              <img
                src={ thumb }
                alt={ name }
                style={ { width: '300px' } }
                data-testid={ `${i}-card-img` }
              />
              <span data-testid={ `${i}-card-name` }>{ name }</span>
            </div>
          </Link>
        ))
      ) }

      {/* Dropdown areas */}
      { shouldRenderAreas(browseByArea, loading) && (
        <>
          <select
            data-testid="explore-by-area-dropdown"
            onChange={ (evt) => handleChange(evt) }
          >
            {/* Mostra todas as receitas */}
            <option data-testid="All-option" value="All">All</option>

            {/* Receitas por país */}
            { areas.map((area, i) => (
              <option
                key={ i }
                data-testid={ `${area}-option` }
                value={ area }
              >
                { area }
              </option>
            )) }
          </select>

          { recipes.map(({ idMeal, strMeal, strMealThumb }, i) => (
            <div key={ i } data-testid={ `${i}-recipe-card` }>
              <Link to={ `/comidas/${idMeal}` }>
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                  data-testid={ `${i}-card-img` }
                  style={ { width: '300px' } }
                />
                <span data-testid={ `${i}-card-name` }>
                  { strMeal }
                </span>
              </Link>
            </div>
          )) }
        </>
      ) }

      <Footer />
    </section>
  );
}

Explore.propTypes = {
  foodDrink: PropTypes.string,
  explore: PropTypes.string,
}.isRequired;

export default Explore;
