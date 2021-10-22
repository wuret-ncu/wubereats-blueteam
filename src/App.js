import React from 'react';
import './App.css';
import Home from './pages/Home';
import Stores from './pages/Stores';
import AddStore from './pages/AddStore';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/stores" component={Stores} />
        <Route exact path="/stores" component={AddStore} />
      </Switch>
    </BrowserRouter>
  );
}
