import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Article from './pages/Article.jsx';
import AllArticles from './pages/AllArticles.jsx';
import AddNewArticle from './pages/AddNewArticle.jsx';
import AuthorProfile from './pages/AuthorProfile.jsx';
import AuthorArticles from './pages/AuthorArticles.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Home from './pages/Home.jsx';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename=''>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<Home/>} />
          <Route path='signup' element={<SignUp/>} />
          <Route path='signin' element={<SignIn/>} />

          <Route path='author-profile' element={<AuthorProfile/>}>
            <Route path='' element={<AuthorArticles/>} />
            <Route path='my-articles/:authorName' element={<AuthorArticles/>} />
            <Route path='write-article' element={<AddNewArticle/>} />
            <Route path='article/:articleId' element={<Article/>} />
          </Route>

          <Route path='user-profile' element={<UserProfile/>}>
            <Route path='' element={<AllArticles/>} />
            <Route path='article/:articleId' element={<Article/>} />
          </Route>

          <Route path='adminprofile' element={<AuthorProfile/>}>
            <Route path='userslist' element={<ErrorPage/>} />
            <Route path='authorslist' element={<ErrorPage/>} />
            <Route path='allarticles' element={<AllArticles/>} />
            <Route path='article' element={<Article/>} />
          </Route>
        </Route>
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
