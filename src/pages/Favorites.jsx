// React
import React, { useState } from 'react';

// Bootstrap
import { Button, Modal } from 'react-bootstrap';

// Services
import copy from 'clipboard-copy';

// Children
import Header from '../components/Header';

// Helpers
import { loadLocalStorage, saveLocalStorage } from '../helpers/localStorageHelper';

// Images
import shareIcon from '../images/shareIcon.svg';
import fullHeart from '../images/blackHeartIcon.svg';

function Favorites() {
  const [showModal, setShowModal] = useState(false); // Mostrar mensagem
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [favorites, setFavorites] = useState(loadLocalStorage('favoriteRecipes'));

  function removeFavorite(target) {
    return target; // implemetar funcao
  }
  function renderFavorites() {
    return favorites.map(({
      id,
      image,
      category,
      type,
      name,
      area,
      alcoholicOrNot,
    }, index) => (
      <div key={ index } data-testid={ type }>
        <img src={ image } alt="" data-testid={ `${index}-horizontal-image` } />
        <h4
          data-testid={ `${index}-horizontal-top-text` }
        >
          { type === 'comida' ? `${area} - ${category}` : `${alcoholicOrNot}` }
        </h4>
        <p>{type === 'comida' ? `${area} - ${category}` : `${alcoholicOrNot}`}</p>
        <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
        <button
          type="button"
          className="details-share-btn"
          onClick={ () => {
            copy(`http://localhost:3000/${type}s/${id}`); // Copia o link de acordo com o tipo e id
            handleShowModal();
          } }
        >
          <img
            src={ shareIcon }
            alt="Copiar Link"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <button
          type="button"
          className="details-favorites-btn"
          onClick={ ({ target }) => removeFavorite(target) }
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ fullHeart }
            alt="Remover dos favoritos"
          />
        </button>
        <Modal show={ showModal } onHide={ handleCloseModal }>
          <Modal.Header closeButton>
            Link copiado!
          </Modal.Header>
        </Modal>
      </div>
    ));
  }

  return (
    <section>
      <Header title="Receitas Favoritas" />
      <section>
        <Button variant="dark" data-testid="filter-by-all-btn">All</Button>
        <Button variant="danger" data-testid="filter-by-food-btn">Food</Button>
        <Button variant="success" data-testid="filter-by-drink-btn">Success</Button>
      </section>
      {renderFavorites()}
    </section>
  );
}

export default Favorites;
