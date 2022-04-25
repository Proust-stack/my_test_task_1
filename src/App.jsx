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
import Modal from './components/Modal';
import CurrenciesModal from './components/CurrenciesModal';

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
  toggleModal = (modalName) => {
    this.setState(prevState => ({ [modalName]: !prevState[modalName] }));
  }
  setCurrencyIndex = (currencyIndex) => {
    this.setState({ currency: currencyIndex});
  }


  render() {
    console.log(this.state);
    return (
      <AppWrapper>
          <HeaderWithData toggleModal={this.toggleModal}/>
          {/* <AppRouter /> */}
          <Routes>
						<Route path='/' element={<MainWithData/>}>
              <Route path=':category' element={<MainWithData/>}>
            </Route>
              <Route path='productId' element={<ProductPageWithData/>} />
            </Route>
            <Route path='cart' element={<CartPageWithData/>} />
            <Route path="*" element={<NotFound />} />
					</Routes>
          {this.state.cartModalOpened && <Modal toggleModal={this.toggleModal}/>}
          
          <GlobalStyles />
      </AppWrapper>
    );
  }
}
