// React
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Router
import { Route, Switch } from 'react-router';

// Children
import {
  Login,
  Recipes,
  Details,
  Progress,
  Profile,
  Explore,
  ExploreFoods,
  ExploreDrinks,
  ExploreFoodsArea,
  ExploreFoodsIngr,
  ExploreDrinksIngr,
  Done,
  Favorites,
} from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        exact
        path="/bebidas"
        render={ () => <Recipes foodDrink="drinks" /> }
      />
      <Route
        exact
        path="/comidas"
        render={ () => <Recipes foodDrink="meals" /> }
      />
      <Route
        exact
        path="/comidas/:id"
        render={ () => <Details foodDrink="meals" /> }
      />
      <Route
        exact
        path="/bebidas/:id"
        render={ () => <Details foodDrink="drinks" /> }
      />
      <Route
        exact
        path="/comidas/:id/in-progress"
        render={ () => <Progress foodDrink="meals" /> }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        render={ () => <Progress foodDrink="drinks" /> }
      />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodsArea } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodsIngr }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksIngr }
      />
      <Route exact path="/receitas-feitas" component={ Done } />
      <Route exact path="/receitas-favoritas" component={ Favorites } />
    </Switch>
  );
}

export default App;
