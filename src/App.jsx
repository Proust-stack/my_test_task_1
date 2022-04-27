import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
import styled from 'styled-components';
import AppRouter from './components/AppRouter';
import GlobalStyles from './styles/global';
import { Routes, Route } from 'react-router-dom';
import MainWithData from './pages/Main';
import ProductPageWithData from './pages/ProductPage';
import NotFound from './components/NotFound';
import CartPageWithData from './pages/CartPage';
import HeaderWithData from './components/Header';
import Modal from './components/Modal';

const AppWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartModalOpened: false,
      currenciesModalOpened: false,
      currency: null
    };
  }
  toggleModal = () => {
    this.setState(prevState => ({ cartModalOpened: !prevState.cartModalOpened}));
    console.log(this.state);
  }
  setCurrencyIndex = (currencyIndex) => {
    this.setState({ currency: currencyIndex});
  }

  render() {
    return (
      <AppWrapper>
        <HeaderWithData toggleModal={this.toggleModal} />
        {/* <AppRouter /> */}
        <Routes>
            <Route path="category" element={<MainWithData />}>
              <Route index path=":categoryId" element={<MainWithData />} />
            </Route>
            <Route path="product" element={<ProductPageWithData />}>
              <Route path=":productId" element={<ProductPageWithData />} />
            </Route>
            <Route path="/cart" element={<CartPageWithData />} />
            <Route path="*" element={<MainWithData />} />
        </Routes>
        {this.state.cartModalOpened && <Modal toggleModal={this.toggleModal} />}
        <GlobalStyles />
      </AppWrapper>
    );  
  }
}
