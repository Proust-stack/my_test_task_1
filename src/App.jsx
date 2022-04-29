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
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencies } from './store/currencySlice';

const AppWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

function withParams(Component) {
  return props => <Component 
  {...props} 
  category={useSelector(state => state.category)}
  dispatch={useDispatch()}
  />;
}
class App extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchCurrencies())
    this.state = {
      cartModalOpened: false,
      currenciesModalOpened: false,
      currency: null
    };
  }
  toggleModal = () => {
    this.setState(prevState => ({ cartModalOpened: !prevState.cartModalOpened}));
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

export default withParams(App);