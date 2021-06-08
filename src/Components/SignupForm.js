import React, { useState } from 'react'
import AuthService from '../Services/AuthService'
import { BrowserRouter as Router,Route} from "react-router-dom"
import "../css/LoginPage.css"
import { useHistory } from 'react-router-dom';
import "../index.css"

export default function SignupForm(){

    const [details,setDetails] = useState({email :"" , password :"",confirmPassword:""});
    const history = useHistory();
    const submitHandler = e => {
        e.preventDefault();
        if(details.email==""||details.password=="")
        {
            document.getElementById("errorMessage").innerHTML = "Please fill the details";
            return;
        }
        if(details.password !=  details.confirmPassword){
            document.getElementById("errorMessage").innerHTML = "Password mismatches. Try again";
            return;
        }
        const authResponse = AuthService.signup(details);
        authResponse.then(
            function(value){
                if(value.status == "success"){
                        history.push("/login");
                }
                else{
                    // console.log(authResponse);
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
            <h2>Create your New Account</h2>
            <div className="form-group">
                <input type="email" name ="email" id = "email" onChange={e => setDetails({...details, email : e.target.value})}></input>
                <label htmlFor = "email">Email ID : </label>
            </div>
            <div className="form-group">
                <input type="password" name ="password" id="password" onChange={e => setDetails({...details, password : e.target.value})}></input>
                <label htmlFor = "password">Password: </label>
            </div>
            <div className="form-group">
                <input type="password" name ="confirm-password" id="confirm-password" onChange={e => setDetails({...details, confirmPassword : e.target.value})}></input>
                <label htmlFor = "password">Confirm Password: </label>
            </div>
            
            <label className="errorMessage" id="errorMessage"></label>
            <input type="submit" value = "Sign up"></input> 
            </div>
        </form>
        <a className ="signup-content signup-link" href="/login">Back to login</a>
        </div>
        
      
        </>
    )

}