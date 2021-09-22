// React
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Router
import { Route, Switch } from 'react-router';

// Children
import Login from './pages/Login';
import FoodRecipes from './pages/FoodRecipes';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ FoodRecipes } />
      </Switch>
    </main>
  );
}

export default App;
