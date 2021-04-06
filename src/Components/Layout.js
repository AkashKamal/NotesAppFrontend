import "../css/HomePage.css"
import SideBar from "./SideBar"
import Routes from "./Routes";
import loginForm from "./LoginForm"
import DashBoard from "../Pages/Dashboard";
import Labels from "../Pages/Labels";
import Notes from "../Pages/Notes";
import Header from "./Header"
import history from "./History"
import {BrowserRouter, Route, Switch} from "react-router-dom";

export default function Layout() {
    return (
        <>
        <BrowserRouter history={history}>
        <div className = "totalLayout">
            <div className="sidelayout">
            <SideBar/>
            </div>
            <div className = "mainLayout">
            <Header/>
            <div className="contentLayout">
            <Switch>
                <Route path="/login" component={loginForm}/>
                <Route path="/dashboard" component={DashBoard}/>
                <Route path="/labels" component={Labels}/>
                <Route path="/notes" component={Notes}/>
            </Switch>
            </div>
            </div>
            </div>
            </BrowserRouter>
        </>
    )
}
