export const recipesAPI = async (searchText, searchFilter, foodDrink) => {
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

export const detailsAPI = async (id, foodDrink) => {
  const domain = foodDrink === 'comidas' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${domain}.com/api/json/v1/1/lookup.php?i=${id}`;
  const details = await (await fetch(url)).json();
  return details;
};

export const categoriesAPI = async (foodDrink) => {
  const domain = foodDrink === 'meals' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${domain}.com/api/json/v1/1/list.php?c=list`;
  const categories = await (await fetch(url)).json();
  return categories;
};

export const filterCategoryAPI = async (foodDrink, categoryBtn) => {
  const domain = foodDrink === 'meals' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${domain}.com/api/json/v1/1/filter.php?c=${categoryBtn}`;
  const categoryItens = await (await fetch(url)).json();
  return categoryItens[foodDrink];
};
