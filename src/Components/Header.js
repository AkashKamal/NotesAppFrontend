import React from 'react'
import AuthService from "../Services/AuthService";
import { useHistory } from 'react-router-dom';


function Header() {

    const history = useHistory();
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
