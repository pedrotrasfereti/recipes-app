// React
import React from 'react';

// Icons
import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import FoodIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <button type="button" data-testid="drinks-bottom-btn">
        <img src={ DrinkIcon } alt="Drink icon button" />
      </button>
      <button type="button" data-testid="explore-bottom-btn">
        <img src={ ExploreIcon } alt="Explore icon button" />
      </button>
      <button type="button" data-testid="food-bottom-btn">
        <img src={ FoodIcon } alt="Food icon button" />
      </button>
    </footer>
  );
}

export default Footer;
