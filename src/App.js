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
  Profile,
  Explore,
  ExploreFoods,
  ExploreDrinks,
  ExploreFoodsArea,
  ExploreFoodsIngr,
  ExploreDrinksIngr,
} from './pages';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route
          exact
          path="/bebidas"
          render={ (/* foodDrink */) => Recipes(/* foodDrink */) }
        />
        <Route
          exact
          path="/comidas"
          render={ (/* foodDrink */) => Recipes(/* foodDrink */) }
        />
        <Route
          exact
          path="/comidas/:id"
          render={ (/* foodDrink */) => Details(/* foodDrink */) }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (/* foodDrink */) => Details(/* foodDrink */) }
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
      </Switch>
    </main>
  );
}

export default App;
