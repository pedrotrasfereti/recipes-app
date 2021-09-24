import React from 'react';

import DrinkIcon from '../images/DrinkIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <button type="button" data-testid="drinks-bottom-btn">
        <img src={ DrinkIcon } alt="Drink icon button" />
      </button>
    </footer>
  );
}

export default Footer;
