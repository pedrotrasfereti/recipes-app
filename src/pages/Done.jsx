// React
import React from 'react';
import { Link } from 'react-router-dom';

// Bootstrap
import { Button, Modal } from 'react-bootstrap';

// Children
import copy from 'clipboard-copy';
import Header from '../components/Header';

// Services

// Helpers
import { loadLocalStorage } from '../helpers/localStorageHelper';

// Images
import shareIcon from '../images/shareIcon.svg';

function Done() {
  const [showModal, setShowModal] = useState(false); // Mostrar mensagem
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [favorites, setFavorites] = useState(loadLocalStorage('favoriteRecipes'));
  const [filterBtns, setFilterBtns] = useState('all');

  function filterByType() {
    const filtering = favorites.filter((favorite) => favorite.type === filterBtns);
    return filtering;
  }

  return (
    <section>
      <Header title="Receitas Feitas" />
      <section>
        <Button
          variant="dark"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterBtns('all') }
        >
          All
        </Button>
        <Button
          variant="danger"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilterBtns('comida') }
        >
          Food
        </Button>
        <Button
          variant="success"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterBtns('bebida') }
        >
          Drinks
        </Button>
      </section>
    </section>
  );
}

export default Done;
