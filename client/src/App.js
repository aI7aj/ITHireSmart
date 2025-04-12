import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';

import { Fragment } from 'react';

function App() {
  return (
    <BrowserRouter>
    <Fragment>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/Register' element={<Register />}/>
      </Routes>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
