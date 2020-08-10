import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './services/auth';

import Home from './pages/Home';
import Login from './pages/Login';
import CriarNoticia from './pages/CriarNoticia';
import ListarEditarNoticia from './pages/ListarEditarNoticia';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route 
      {...rest} 
      render={props => 
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
        )
      }
  />
);

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home}   />
      <Route path="/login" component={Login}  />
      <PrivateRoute path="/cadastrar-noticia" component={CriarNoticia}  />
      <PrivateRoute path="/listar-editar-noticia" component={ListarEditarNoticia} />
    </BrowserRouter>
  );
}

export default Routes;