import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Article from './pages/Article.jsx';
import AllArticles from './pages/AllArticles.jsx';
import AddNewArticle from './pages/AddNewArticle.jsx';
import AuthorProfile from './pages/AuthorProfile.jsx';
import Home from './pages/Home.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/signin' element={<SignIn/>}>
            <Route path='authorprofile' element={<AuthorProfile/>}>
              <Route path='writearticle' element={<AddNewArticle/>} />
              <Route path='allarticles' element={<AllArticles/>} />
              <Route path='article' element={<Article/>} />
            </Route>
            <Route path='userprofile' element={<AuthorProfile/>}>
              <Route path='usercomments' element={<ErrorPage/>} />
              <Route path='allarticles' element={<AllArticles/>} />
              <Route path='article' element={<Article/>} />
            </Route>
            <Route path='adminprofile' element={<AuthorProfile/>}>
              <Route path='userslist' element={<ErrorPage/>} />
              <Route path='authorslist' element={<ErrorPage/>} />
              <Route path='allarticles' element={<AllArticles/>} />
              <Route path='article' element={<Article/>} />
            </Route>
          </Route>
          <Route path='*' element={<ErrorPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
