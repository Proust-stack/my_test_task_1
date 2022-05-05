import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";

import AppRouter from './components/AppRouter';
import GlobalStyles from './styles/global';
import { Routes, Route } from 'react-router-dom';
import MainWithData from './pages/Main';
import ProductPageWithData from './pages/ProductPage';
import CartPageWithData from './pages/CartPage';
import Layout from './components/Layout';

export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index path=":categoryId" element={<MainWithData />} />
          <Route path="product" element={<ProductPageWithData />}>
            <Route path=":productId" element={<ProductPageWithData />} />
          </Route>
          <Route path="/cart" element={<CartPageWithData />} />
          <Route path="*" element={<MainWithData />} />
        </Route>
      </Routes>
    );
  }
}

