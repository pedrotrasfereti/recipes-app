const apiRequest = async (searchText, searchFilter, foodDrink) => {
  const domain = foodDrink === 'comidas' ? 'themealdb' : 'thecocktaildb';
  let url = '';
  if (searchFilter === 'ingredient') {
    url = `https://www.${domain}.com/api/json/v1/1/filter.php?i=${searchText}`;
  } else if (searchFilter === 'name') {
    url = `https://www.${domain}.com/api/json/v1/1/search.php?s=${searchText}`;
  } else if (searchFilter === 'first-letter') {
    url = `https://www.${domain}.com/api/json/v1/1/search.php?f=${searchText}`;
  } else {
    url = `https://www.${domain}.com/api/json/v1/1/search.php?s=`;
  }
  const recipes = await (await fetch(url)).json();
  return recipes;
};

export default apiRequest;
