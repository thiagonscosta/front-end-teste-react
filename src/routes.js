import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from './pages/login/LoginPage';
import RecipesPage from './pages/recipes/RecipesPage';
import RecipePage from './pages/recipe/RecipePage';
import MyRecipesPage from './pages/myRecipes/MyRecipesPage';
import AddRecipePage from './pages/addRecipe/AddRecipePage';
import EditRecipePage from './pages/editRecipe/EditRecipePage';

import StoreContext from './store/context'; 

const Routes = () => {

const { user } = useContext(StoreContext);

  const PrivateRoutes = ({ component: Component, ...rest}) => (
      <Route { ...rest } render={props => (
          user
           ? (
              <Component {...props} />
          ) : (
              <Redirect to={{ pathname: '/', state: { from: props.location }}} />
          )
      )}></Route>
  );
  return (
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <PrivateRoutes path="/receitas" component={RecipesPage} />
        <PrivateRoutes path="/receita/:id" component={RecipePage} />
        <PrivateRoutes path="/minhas_receitas" component={MyRecipesPage} />
        <PrivateRoutes path="/adicionar_receita" component={AddRecipePage} />
        <PrivateRoutes path="/editar_receita/:id" component={EditRecipePage} />
      </Switch>
  );
}

export default Routes;
