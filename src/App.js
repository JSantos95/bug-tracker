import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from './components/navbar';
import BugList from './components/bugList';
import EditBug from './components/editBug';
import CreateBug from './components/createBug';
import CreateUser from './components/createUser';

const App = () => {
  return (
    <Router>
      <NavBar />
      <br/>
      <Route path="/" exact component={BugList}/>
      <Route path="/edit/:id" component={EditBug}/>
      <Route path="/create" component={CreateBug}/>
      <Route path="/user" component={CreateUser}/>
    </Router>
  );
}

export default App;
