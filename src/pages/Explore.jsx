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
import { explorePageTitle, shouldRenderIngrs } from '../helpers/explore';

// Services
import { ingredientsAPI } from '../services/apiRequest';

function Explore(props) {
  // Props
  const { foodDrink, explore } = props;
  const browseByArea = explore === 'area';
  const browseByIngr = explore === 'ingredients';

  // Hooks
  const history = useHistory();
  const dispatch = useDispatch();

  // State
  const [loading, setLoading] = useState(false); // Carregando
  const [ingredients, setIngredients] = useState([]); // Ingredientes

  // Explorar Ingredientes
  useEffect(() => {
    if (browseByIngr) {
      const fetchIngredients = async () => {
        setLoading(true);
        setIngredients(await ingredientsAPI(foodDrink));
        setLoading(false);
      };
      fetchIngredients();
    }
  }, [browseByIngr, foodDrink]);

  // Redirecionar para a tela de receitas e realizar busca por ingrediente
  const filterByIngredient = (name, filter, type) => {
    dispatch(fetchRecipes(name, filter, type));
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

      {/* Cards de ingredientes */}
      { loading && <span>Carregando...</span> }
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
                style={ { width: '50%' } }
                data-testid={ `${i}-card-img` }
              />
              <span data-testid={ `${i}-card-name` }>{ name }</span>
            </div>
          </Link>
        ))
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
