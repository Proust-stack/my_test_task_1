import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from '../routs/publicRoutes';
import Category from './Category';
import Header from './Header';

class AppRouter extends Component {
  render() {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Category />}>
            {publicRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Routes>
      </>
    );
  }
}

export default AppRouter;
