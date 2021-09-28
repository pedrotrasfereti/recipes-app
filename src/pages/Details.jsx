// React
import React, { useEffect, useState } from 'react';

// Router
import { useLocation, useHistory } from 'react-router-dom';

// PropTypes
import PropTypes from 'prop-types';

// Services
import { Modal } from 'react-bootstrap';
import copy from 'clipboard-copy';
import { detailsAPI } from '../services/apiRequest';

// Helpers
import capitalize from '../helpers/capitalizeStr';
import renderIngredients from '../helpers/renderIngredients';
import renderRecs from '../helpers/renderRecs';

// Images
import emptyHeart from '../images/whiteHeartIcon.svg';
import fullHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

// Styles
import '../styles/Details.css';

function Details({ foodDrink = '' }) {
  const history = useHistory(); // History

  const path = useLocation().pathname; // Rota
  const id = path.split('/')[2]; // Id da receita
  const foodDrinkPT = path.split('/')[1]; // Comida ou Bebida
  const foodDrinkCap = capitalize(foodDrink).slice(0, foodDrink.length - 1);

  const [details, setDetails] = useState({}); // Detalhes
  const [loading, setLoading] = useState(false); // Carregando
  const [isFavorite, setIsFavorite] = useState(false); // Favoritado
  const [showModal, setShowModal] = useState(false); // Mostrar mensagem
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [recs, setRecs] = useState(); // Recomendados

  /* Fetch dos detalhes e das receitas recomendadas */
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setDetails(await detailsAPI(id, foodDrinkPT));
      setLoading(false);
      setRecs(await renderRecs(foodDrinkPT));
    };
    fetchRecipe();
  }, [path, id, foodDrinkPT]);

  /* Renderização condicional do texto "iniciar"/"continuar" receita */
  const recipeProgress = () => {
    if (localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const mealCocktail = foodDrink === 'meals' ? 'meals' : 'cocktails';
      return inProgressRecipes[mealCocktail][id];
    }
    return null;
  };

  /* Ta favoritado ou não */
  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes.find((favorite) => favorite.id === id)) setIsFavorite(true);
      else setIsFavorite(false);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, [id, isFavorite]);

  /* Gerencia as receitas favoritas */
  const manageFavorites = () => {
    if (isFavorite) { // Caso seja favorito - desfavoritar
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const removed = favoriteRecipes.filter((recipe) => recipe.id !== id);

      localStorage.setItem('favoriteRecipes', JSON.stringify(removed));
      setIsFavorite(false);
    } else {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const currRecipe = { // Receita favoritada
        id,
        type: foodDrinkPT.slice(0, foodDrinkPT.length - 1),
        area: foodDrink === 'meals' ? details[foodDrink][0].strArea : '',
        category: details[foodDrink][0].strCategory,
        alcoholicOrNot: foodDrink === 'drinks' ? details[foodDrink][0].strAlcoholic : '',
        name: details[foodDrink][0][`str${foodDrinkCap}`],
        image: details[foodDrink][0][`str${foodDrinkCap}Thumb`],
      };

      favoriteRecipes.push(currRecipe);

      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setIsFavorite(true);
    }
  };

  return (
    <section>
      {/* Carregando */}
      { loading && <span>Carregando...</span> }
      { Object.prototype.hasOwnProperty.call(details, foodDrink) && (
        <>
          {/* Thumb */}
          <img
            src={ details[foodDrink][0][`str${foodDrinkCap}Thumb`] }
            alt={ details[foodDrink][0][`str${foodDrinkCap}`] }
            className="details-thumb"
            data-testid="recipe-photo"
          />

          {/* Título */}
          <h1 className="details-title" data-testid="recipe-title">
            { details[foodDrink][0][`str${foodDrinkCap}`] }
          </h1>

          {/* Compartilhar */}
          <button
            type="button"
            className="details-share-btn"
            data-testid="share-btn"
            onClick={ () => {
              copy(window.location.href);
              handleShowModal();
            } }
          >
            <img src={ shareIcon } alt="Copiar Link" />
          </button>

          {/* Favoritar */}
          <button
            type="button"
            className="details-favorites-btn"
            onClick={ () => manageFavorites() }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? fullHeart : emptyHeart }
              alt={ isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos' }
            />
          </button>

          {/* Categoria */}
          <span className="details-category" data-testid="recipe-category">
            {
              foodDrink === 'drinks' ? (
                details[foodDrink][0].strAlcoholic
              ) : (
                details[foodDrink][0].strCategory
              )
            }
          </span>

          {/* Ingredientes */}
          <ol>
            { renderIngredients(details[foodDrink][0]) }
          </ol>

          {/* Instruções */}
          <p className="details-instructions" data-testid="instructions">
            { details[foodDrink][0].strInstructions }
          </p>

          {/* Vídeo YT */}
          { foodDrink === 'meals' && (
            <iframe
              title={ `How to prepare ${details[foodDrink][0][`str${foodDrinkCap}`]}` }
              data-testid="video"
              src={ (details[foodDrink][0].strYoutube.replace('watch?v=', 'embed/')) }
              allowFullScreen
            />
          )}

          {/* Carrossel de receitas recomendadas */}
          <div className="details-carousel">
            { recs }
          </div>

          {/* Iniciar receita */}
          <button
            type="button"
            className="details-start"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`${path}/in-progress`) }
          >
            { recipeProgress() ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
          <Modal show={ showModal } onHide={ handleCloseModal }>
            <Modal.Header closeButton>
              Link copiado!
            </Modal.Header>
          </Modal>
        </>
      )}
    </section>
  );
}

Details.propTypes = {
  foodDrink: PropTypes.string,
}.isRequired;

export default Details;
