import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Layout from './components/Layout';
import PLP from './pages/PLP';
import PDP from './pages/PDP';

export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="categories" element={<Main />}>
            <Route path=":categoryId" element={<PLP />} />
          </Route>
          <Route path="products" element={<ProductPage />}>
            <Route path=":productId" element={<PDP />} />
          </Route>
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<Main />} />
        </Route>
      </Routes>
    );
  }
}

