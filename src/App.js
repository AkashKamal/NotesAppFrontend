
import { useState, useEffect, Redirect } from 'react';
import History from "./Components/History"
import Routes from "./Components/Routes"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {


  return (
    <>
    <Router history={History}>
      <Switch>
      <Routes/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
