export const recipesAPI = async (searchText, searchFilter, foodDrink) => {
  const domain = foodDrink === 'comidas' ? 'themealdb' : 'thecocktaildb';

  let url = '';
  if (searchFilter === 'ingredient') {
    url = `https://www.${domain}.com/api/json/v1/1/filter.php?i=${searchText}`;
  } else if (searchFilter === 'name') {
    url = `https://www.${domain}.com/api/json/v1/1/search.php?s=${searchText}`;
  } else if (searchFilter === 'first-letter') {
    url = `https://www.${domain}.com/api/json/v1/1/search.php?f=${searchText}`;
  }
  const recipes = await (await fetch(url)).json();
  return recipes;
};

export const detailsAPI = async (id, foodDrink) => {
  const domain = foodDrink === 'comidas' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${domain}.com/api/json/v1/1/lookup.php?i=${id}`;
  const details = await (await fetch(url)).json();
  return details;
};
