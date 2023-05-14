
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import { Container } from 'semantic-ui-react';
import { useState } from 'react';
//import {AuthProvider} from './context/auth'
function App() {
  const[urlRedirect, setUrlRedirect] = useState('')
 function updateRedirectRoute(path){
    setUrlRedirect(path)
    window.location.href=path
  }
   //<container>gives left right margins and padding centerise the content
  return (
    //<AuthProvider>
    <Router>
    <MenuBar/>
    <Container>
      <Routes>
        <Route  path='/' element=<Home/>/>
        
        <Route  path='/login' element=<Login redirectCallback={updateRedirectRoute}/>/>

        
        <Route  path='/register' element=<Register redirectCallback={updateRedirectRoute}/>/>
        </Routes>
        </Container>
    </Router>
   // </AuthProvider>
  );
}

export default App;
