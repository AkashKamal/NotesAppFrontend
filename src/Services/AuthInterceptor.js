import axios from "axios";
import React from 'react'
import {Route,Redirect,useHistory,Link} from "react-router-dom";
import Routes from "../Components/Routes"


function AuthInterceptor() {

  const history = useHistory();
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      
      const accessToken = token ? "Bearer "+ localStorage.getItem("token") : null;
      console.log(accessToken);
      if (accessToken) {
        config.headers["Authorization"] = accessToken;
        config.headers["Access-Control-Allow-Origin"]= "*"
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  

  axios.interceptors.response.use(
    (response) => {return response;},
    function (error)  {
        const originalRequest = error.config;
        // let refreshToken = localStorage.getItem("refreshToken");
        // if(refreshToken && error.response.status == 401 && ! originalRequest._retry)
        // {
        //     originalRequest._retry = true;
        //     return axios.post(`${baseUrl}/auth/refresh_token`, { refreshToken: refreshToken })
        //     .then((res) => {
        //     if (res.status === 200) {
        //         localStorage.setItem("accessToken", res.data.accessToken);
        //         console.log("Access token refreshed!");
        //         return axios(originalRequest);
        //     }
        // });
        //}
        if(error.response.data.code == 414)
        {
          localStorage.removeItem("token");
          history.push("/login")
          // return <Redirect to="/login" />
          // <Route render={props => (
          //   <Redirect to="/login" />
          // )} />

        }
        return Promise.reject(error);
    }
);
return (
  <div>
    
  </div>
)

}

export default AuthInterceptor



