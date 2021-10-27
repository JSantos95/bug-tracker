import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from './components/navbar';
import Home from './components/home';
import BugList from './components/bugList';
import ViewBug from './components/viewBug';
import CreateBug from './components/createBug';
import CreateUser from './components/createUser';

const App = () => {
  return (
    <div className="container">
      <Router>
        <NavBar />
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/bug" component={BugList}/>
        <Route path="/view/:id" component={ViewBug}/> 
        <Route path="/create" component={CreateBug}/>
        <Route path="/user" component={CreateUser}/>
      </Router>
    </div>
  );
}

export default App;
