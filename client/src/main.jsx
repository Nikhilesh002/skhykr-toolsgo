import './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Signin from '../components/Signin.jsx';
import Signup from '../components/Signup.jsx';
import Home from '../components/Home.jsx';

ReactDOM.render(
    <BrowserRouter basename=''>
      <Routes>
        <Route path='' element={<App/>}>
          <Route path='signin' element={<Signin/>}></Route>
          <Route path='signup' element={<Signup/>}></Route>
          <Route path='home' element={<Home/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);
