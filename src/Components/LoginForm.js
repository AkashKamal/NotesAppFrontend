import React, { useState } from 'react'
import AuthService from '../Services/AuthService'
import { BrowserRouter as Router} from "react-router-dom"
import "../css/LoginPage.css"
import history from "./History"

export default function LoginForm(){

    const [details,setDetails] = useState({email :"" , password :""});

    const submitHandler = e => {
        e.preventDefault();
        if(details.email==""||details.password=="")
        {
            document.getElementById("errorMessage").innerHTML = "Please fill the details";
            return;
        }
        if(AuthService.login(details)){
            console.log("test");
            history.push("/");
        }
        else{
            document.getElementById("errorMessage").innerHTML = "Invalid credentials";
        }
       
    }
    return(
        <>
        <Router>
        <form onSubmit={submitHandler}>
            <div className="loginComp">
            <h1>Login</h1>
            <div className="form-group">
                <input type="email" name ="email" id = "email" onChange={e => setDetails({...details, email : e.target.value})}></input>
                {/* <span></span> */}
                <label htmlFor = "email">Email ID : </label>
            </div>
            <div className="form-group">
                <input type="password" name ="password" id="password" onChange={e => setDetails({...details, password : e.target.value})}></input>
                {/* <span></span> */}
                <label htmlFor = "password">Password: </label>
            </div>
            <label className="errorMessage" id="errorMessage"></label>
            <input type="submit" value = "Login"></input> 
            </div>
        </form>
        </Router>
        </>
    )

}