const newRecipe = (details, foodDrink, foodDrinkPT, foodDrinkCap) => ({
  id: details[foodDrink][0][`id${foodDrinkCap}`],
  type: foodDrinkPT.slice(0, foodDrinkPT.length - 1),
  area: foodDrink === 'meals' ? details[foodDrink][0].strArea : '',
  category: details[foodDrink][0].strCategory,
  alcoholicOrNot: foodDrink === 'drinks' ? details[foodDrink][0].strAlcoholic : '',
  name: details[foodDrink][0][`str${foodDrinkCap}`],
  image: details[foodDrink][0][`str${foodDrinkCap}Thumb`],
});

export default newRecipe;
