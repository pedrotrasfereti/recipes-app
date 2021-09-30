// React
import React from 'react';

// Router
import { useHistory } from 'react-router-dom';

// PropTypes
import PropTypes from 'prop-types';

// Children
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreNav from '../components/ExploreNav';
import ExploreNavFd from '../components/ExploreNavFd';

// Helpers
import explorePageTitle from '../helpers/explorePageTitle';

function Explore(props) {
  // Props
  const { foodDrink, explore } = props;

  // History
  const history = useHistory();

  return (
    <section>
      {/* Cabeçalho */}
      <Header
        title={ explorePageTitle(props) }
        searchBtn={ explore === 'area' }
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

      <Footer />
    </section>
  );
}

Explore.propTypes = {
  foodDrink: PropTypes.string,
  explore: PropTypes.string,
}.isRequired;

export default Explore;
