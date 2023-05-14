
import './App.css';
import {BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import { Container } from 'semantic-ui-react';
import { useState } from 'react';
import {AuthProvider} from './context/auth'
function App() {
  
   //<container>gives left right margins and padding centerise the content
  return (
    
    <Router>
    <AuthProvider>
    <MenuBar/>
    <Container>
      <Routes>
        <Route  path='/' element=<Home/>/>
        
        <Route  path='/login' element=<Login />/>

        
        <Route  path='/register' element=<Register/>/>
        </Routes>
        </Container>
        
    </AuthProvider>
    </Router>
  );
}

export default App;
