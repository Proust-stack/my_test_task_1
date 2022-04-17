import React, { Component } from 'react';
import styled from 'styled-components';
import AppRouter from './components/AppRouter';
import GlobalStyles from './styles/global';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import MainWithData from './pages/Main';
import ProductPageWithData from './pages/ProductPage';
import NotFound from './components/NotFound';
import CartPageWithData from './pages/CartPage';

const AppWrapper = styled.div`
  position: relative;
  max-width: 1440px;
  height: 1513px;
  width: 100%;
  margin: 0 auto;
`;


export default class App extends Component {
  render() {
    return (
      <AppWrapper>
          {/* <AppRouter /> */}
          <Routes>
						<Route path='/' element={<MainWithData/>} />
						<Route path='category' element={<MainWithData/>} />
            <Route path='productId' element={<ProductPageWithData/>} />
            <Route path='cart' element={<CartPageWithData/>} />
            <Route path="*" element={<NotFound />} />
					</Routes>
          <GlobalStyles />
      </AppWrapper>
    );
  }
}
