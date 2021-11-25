import React from 'react';
import './App.css';
import Home from './pages/Home';
import Stores from './pages/Stores';
import AddStore from './pages/AddStore';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './store';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/stores" component={Stores} />
        <Route exact path="/addStore" component={AddStore} />
        <Route exact path="/menu/:storeId" component={Menu} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </BrowserRouter>
    </StoreProvider>
    
  );
}
