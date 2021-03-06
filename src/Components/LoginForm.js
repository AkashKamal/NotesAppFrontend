import React, { useState } from 'react'
import AuthService from '../Services/AuthService'
import { BrowserRouter as Router,Route} from "react-router-dom"
import "../css/LoginPage.css"
import { useHistory } from 'react-router-dom';
import "../index.css"

export default function LoginForm(){

    const [details,setDetails] = useState({email :"" , password :""});
    const history = useHistory();
    const submitHandler = e => {
        e.preventDefault();
        if(details.email==""||details.password=="")
        {
            document.getElementById("errorMessage").innerHTML = "Please fill the details";
            return;
        }
        const authResponse = AuthService.login(details);
        authResponse.then(
            function(value){
                if(value.status == "success"){
                        history.push("/notes");
                }
                else{
                    console.log(authResponse);
                    document.getElementById("errorMessage").innerHTML = value.errorMessage;
                }
            }
        )
    }
    return(
        <>
       <div className= "loginComp">
        <form onSubmit={submitHandler}>
            <div className="loginForm">
            <h2>Sign in</h2>
            <div className="form-group">
                <input type="email" name ="email" id = "email" onChange={e => setDetails({...details, email : e.target.value})}></input>
                <label htmlFor = "email">Email ID : </label>
            </div>
            <div className="form-group">
                <input type="password" name ="password" id="password" onChange={e => setDetails({...details, password : e.target.value})}></input>
                <label htmlFor = "password">Password: </label>
            </div>
            
            <label className="errorMessage" id="errorMessage"></label>
            <input type="submit" value = "Login"></input> 
            <a className ="forgot-password" href="">Forgot password?</a>
            </div>
        </form>
        <div className="signup-content">
       <span>New to notes?   </span><a className ="signup-link" href="/signup">Signup here</a>
       </div>
        </div>
        
      
        </>
    )

}