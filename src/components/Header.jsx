// React
import React, { useState, useEffect } from 'react';

// Router
import { useLocation, useHistory } from 'react-router-dom';

// PropTypes
import PropTypes from 'prop-types';

// Images
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

// Helpers
import capitalize from '../helpers/capitalizeStr';

// Children
import SearchBar from './SearchBar';

function Header({ searchBtn }) {
  /* Router */
  const history = useHistory();
  const path = useLocation();

  /* Título: comidas ou bebidas */
  const [title, setTitle] = useState('');

  /* Mostra a barra de pesquisa */
  const [toggleSearch, setToggleSearch] = useState(false);

  /* Criar título baseado na rota */
  useEffect(() => {
    const fixedName = path.pathname.split('/')[1];
    const capitalizedName = capitalize(fixedName);
    setTitle(capitalizedName);
  }, [path]);

  return (
    <>
      <header>
        {/* Ir para a página de Perfíl */}
        <button
          type="button"
          data-testid="profile-top-btn"
          onClick={ () => history.push('/perfil') }
          disabled={ !searchBtn } // Desabilitar quando estiver na tela de perfil
        >
          <img src={ profileIcon } alt="User person icon" />
        </button>

        {/* Título da página */}
        <h2 data-testid="page-title">{ title }</h2>

        {
          searchBtn && (
            <button
              type="button"
              data-testid="search-top-btn"
              onClick={ () => setToggleSearch(!toggleSearch) }
            >
              <img src={ searchIcon } alt="Search button icon" />
            </button>
          )
        }
      </header>
      <div>
        { toggleSearch && <SearchBar /> }
      </div>
    </>
  );
}

Header.propTypes = {
  searchBtn: PropTypes.bool,
}.isRequired;

export default Header;
