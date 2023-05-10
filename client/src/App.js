
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import { Container } from 'semantic-ui-react';
function App() {
  return (
    <Router>
    <MenuBar/>
      <Routes>
        <Route  path='/' Component={Home}/>
        
        <Route  path='/login' Component={Login}/>

        
        <Route  path='/register' Component={Register}/>
        </Routes>
     
    </Router>
  );
}

export default App;
