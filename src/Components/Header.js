import React from 'react'
import AuthService from "../Services/AuthService";
import LoginForm from "../Components/LoginForm"
import history from "./History"
function Header() {

    function logout() {
        AuthService.logout();
        console.log("out");
        history.push("/login");

    }


    return (
        <>
            <div className="header">
                <input type="text" placeholder="Search.."></input>
                <button className="header-button" onClick={() => logout()}>Logout</button>
            </div>
        </>
    )
}

export default Header
