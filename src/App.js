import './App.css';
import Home from './pages/Home';
import Stores from './pages/Stores';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/stores" component={Stores} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
