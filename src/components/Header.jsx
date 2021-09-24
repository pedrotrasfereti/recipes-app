// React
import React, { useState, useEffect } from 'react';

// Router
import { useLocation, useHistory } from 'react-router-dom';

// Images
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

// Children
import SearchBar from './SearchBar';

function Header(searchBtn) {
  /* Router */
  const history = useHistory();
  const path = useLocation();

  /* Título: comidas ou bebidas */
  const [title, setTitle] = useState('');

  /* Mostra a barra de pesquisa */
  const [toggleSearch, setToggleSearch] = useState(false);

  /* Criar título baseado na rota */
  const capitalize = (str) => {
    const lower = str.toLowerCase(); // A string em minúsculo
    const first = lower.charAt(0); // A primeira letra
    const upper = first.toUpperCase(); // A primeira letra em maiúsculo
    const remain = lower.slice(1, lower.length); // A string menos a primeira letra
    return upper + remain;
  };

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
          disabled={ !searchBtn } // Disabilitar quando estiver na tela de perfil
        >
          <img src={ profileIcon } alt="User person icon" />
        </button>

        {/* Título da página */}
        <h2 data-testid="page-title">{ title }</h2>

        {
          searchBtn ? (
            <button
              type="button"
              data-testid="search-top-btn"
              onClick={ () => setToggleSearch(!toggleSearch) }
            >
              <img src={ searchIcon } alt="Search button icon" />
            </button>
          ) : null
        }
      </header>
      <div>
        { toggleSearch && <SearchBar /> }
      </div>
    </>
  );
}

export default Header;
