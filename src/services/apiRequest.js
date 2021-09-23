const apiRequest = async (searchText, searchFilter) => {
  let url = '';
  if (searchFilter === 'ingredient') {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`;
  } else if (searchFilter === 'name') {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  } else if (searchFilter === 'first-letter') {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`;
  }
  const recipes = await (await fetch(url)).json();
  return recipes;
};

export default apiRequest;
