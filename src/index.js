import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AxiosInterceptor from "./Services/AuthInterceptor"
import Routes from "./Components/Routes"

ReactDOM.render(
  <React.StrictMode>
    <AxiosInterceptor/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

