import React, { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [redirectProfile, setRedirectProfile] = useState(false);
  const [title, setTitle] = useState('');

  // https://reactrouter.com/web/api/Hooks
  const capitalize = (str) => {
    const lower = str.toLowerCase(); // A string em minúsculo
    const first = lower.charAt(0); // A primeira letra
    const upper = first.toUpperCase(); // A primeira letra em maiúsculo
    const remain = lower.slice(1, lower.length); // A string menos a primeira letra
    return upper + remain;
  };

  const actualPath = useLocation();
  useEffect(() => {
    const fixedName = actualPath.pathname.split('/')[1];
    const capitalizedName = capitalize(fixedName);
    setTitle(capitalizedName);
  }, []);

  return (
    redirectProfile ? (
      <Redirect to="/perfil" />
    ) : (
      <header>
        <button
          type="button"
          data-testid="profile-top-btn"
          onClick={ () => setRedirectProfile(true) }
        >
          <img src={ profileIcon } alt="User person icon" />
        </button>
        <h2 data-testid="page-title">{ title }</h2>
        <button
          type="button"
          data-testid="search-top-btn"
          //  onClick={ () => renderSearch() }
        >
          <img src={ searchIcon } alt="Search button icon" />
        </button>
      </header>
    )
  );
}

export default Header;
