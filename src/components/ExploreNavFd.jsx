// React
import React from 'react';

// Router
import { withRouter } from 'react-router';

// PropTypes
import PropTypes from 'prop-types';

const ExploreNavFd = ({ history = [] } = props) => (
  <>
    {/* Explorar por ingredientes */}
    <button
      type="button"
      data-testid="explore-food"
      onClick={ () => history.push('/explorar/comidas') }
    >
      Por Ingredientes
    </button>

    {/* Explorar por local de origem - area */}
    <button
      type="button"
      data-testid="explore-drinks"
      onClick={ () => history.push('/explorar/bebidas') }
    >
      Por Local de Origem
    </button>

    {/* Receita aleatória */}
    <button
      type="button"
      data-testid="explore-drinks"
      onClick={ () => history.push('/explorar/bebidas') }
    >
      Me Surpreenda!
    </button>
  </>
);

ExploreNavFd.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ExploreNavFd);
