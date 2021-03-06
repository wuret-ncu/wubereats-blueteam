import React from 'react';
import './App.css';
import Home from './pages/Home';
import Stores from './pages/Stores';
import GroupStores from './pages/GroupStores';
import AddStore from './pages/AddStore';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Edit from './pages/Edit';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { Switch, Route, BrowserRouter, useParams } from 'react-router-dom';
import { StoreProvider } from './store';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/stores" component={Stores} />
        <Route exact path="/groupStores" component={GroupStores} />
        <Route exact path="/addStore" component={AddStore} />
        <Route exact path="/menu/:storeId" component={Menu} children={<Child2 />} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/edit/:storeId" component={Edit} children={<Child />} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
    </StoreProvider>
    
  );
  function Child() {
    let{ storeId } = useParams();
    return (
      <Edit storeId={storeId} />
    );
  }
  function Child2() {
    let{ storeId } = useParams();
    return (
      <Menu storeId={storeId} />
    );
  }
}
