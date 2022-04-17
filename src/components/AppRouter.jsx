import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from '../routs/publicRoutes';
import MainWithData from '../pages/Main';

class AppRouter extends Component {
  render() {
    return (
        <Routes>
          <Route path="/" element={<MainWithData />}>
            {publicRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Routes>
    );
  }
}

export default AppRouter;
