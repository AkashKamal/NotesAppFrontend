import {React} from 'react';
import DashBoard from "../Pages/Dashboard";
import Labels from "../Pages/Labels";
import Notes from "../Pages/Notes";
import Layout from "./Layout"
import LoginForm from "../Components/LoginForm"
import SignupForm from "../Components/SignupForm"
import { BrowserRouter, Route, Switch ,Redirect} from "react-router-dom";
import AuthService from '../Services/AuthService'
import history from "./History"

function Routes() {
const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log("inside private route")
    return (
      <Route {...rest} render={props => (
        AuthService.isTokenAvailable() ?
          <Component {...props} />
          : <Redirect to="/login" />
      )} />
    );
  };



    return (
        <div>
            <BrowserRouter history={history}>
                <Switch>
                    <Route exact path="/login" >{ AuthService.isTokenAvailable() ?  <Redirect to="/notes" /> : <LoginForm />}</Route>
                    <Route exact path="/signup" ><SignupForm/></Route>
                    {/* <PrivateRoute path='/' component={Layout} /> */}
                    <PrivateRoute exact path="/labels/"><Layout props={<Labels/>} /></PrivateRoute>
                    <PrivateRoute exact path="/labels/:id"><Layout props={<Labels/>} /></PrivateRoute>
                    <PrivateRoute exact path="/notes" ><Layout props={<Notes/>} /></PrivateRoute>
                    <Route exact path="/" >{ AuthService.isTokenAvailable() ?  <Redirect to="/notes" /> : <Redirect to="/login" />}</Route>
                    {/* <PrivateRoute exact path="/notes" component={{main : <Notes/>}} /> */}
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes
