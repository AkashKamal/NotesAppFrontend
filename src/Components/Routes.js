import {React} from 'react';
import DashBoard from "../Pages/Dashboard";
import Labels from "../Pages/Labels";
import Notes from "../Pages/Notes";
import Layout from "./Layout"
import LoginForm from "../Components/LoginForm"
import { BrowserRouter, Route, Switch ,Redirect} from "react-router-dom";
import AuthService from '../Services/AuthService'
import history from "./History"

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={props => (
        AuthService.isTokenAvailable() ?
          <Component {...props} />
          : <Redirect to="/login" />
      )} />
    );
  };


function Routes() {
    return (
        <div>
            <BrowserRouter history={history}>
                <Switch>
                    <Route path="/login" >{ AuthService.isTokenAvailable() ?  <Redirect to="/" /> : <LoginForm />}</Route>
                    <PrivateRoute path='/' component={Layout} />
                    <PrivateRoute path="/dashboard" component={DashBoard} />
                    <PrivateRoute path="/labels" component={Labels} />
                    <PrivateRoute path="/notes" component={Notes} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes
