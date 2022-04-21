import React, { Component } from 'react';
import styled from 'styled-components';
import AppRouter from './components/AppRouter';
import GlobalStyles from './styles/global';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import MainWithData from './pages/Main';
import ProductPageWithData from './pages/ProductPage';
import NotFound from './components/NotFound';
import CartPageWithData from './pages/CartPage';
import HeaderWithData from './components/Header';

const AppWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;


export default class App extends Component {
  render() {
    return (
      <AppWrapper>
        <HeaderWithData />
          {/* <AppRouter /> */}
          <Routes>
						<Route path='/' element={<MainWithData/>} />
						<Route path=':category' element={<MainWithData/>} >
              <Route path=':productId' element={<ProductPageWithData/>} />
            </Route>
            <Route path='cart' element={<CartPageWithData/>} />
            <Route path="*" element={<NotFound />} />
					</Routes>
          <GlobalStyles />
      </AppWrapper>
    );
  }
}
