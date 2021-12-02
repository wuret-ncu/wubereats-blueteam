import React from 'react';
import './App.css';
import Home from './pages/Home';
import Stores from './pages/Stores';
import AddStore from './pages/AddStore';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Edit from './pages/Edit';
import EditDetail from './components/EditDetail';
import { Switch, Route, BrowserRouter, useParams } from 'react-router-dom';
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
        <Route exact path="/edit/:storeId" component={Edit} children={<Child />} />
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
}
