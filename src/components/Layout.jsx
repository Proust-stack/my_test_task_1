import React, { Component } from 'react';
import styled from 'styled-components';
import GlobalStyles from '../styles/global';
import { fetchCurrencies } from '../store/currencySlice';
import Header from './Header';
import Modal from './Modal';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const Container = styled.div`
   max-width: 1440px;
   margin: 0 auto;
   display: flex;
   flex-direction: column;
`;

function withParams(Component) {
  return props => <Component 
  {...props} 
  category={useSelector(state => state.category)}
  dispatch={useDispatch()}
  
  />;
}
class Layout extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      cartModalOpened: false,
      currenciesModalOpened: false,
      currency: null
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchCurrencies())
  }

  toggleModal = () => {
    this.setState(prevState => ({ cartModalOpened: !prevState.cartModalOpened}));
    if (!this.state.cartModalOpened) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }
  render() {
    return (
      <Container>
        <Header toggleModal={this.toggleModal} />
        <Outlet/>
        {this.state.cartModalOpened && <Modal toggleModal={this.toggleModal} />}
        <GlobalStyles />
      </Container>
    )
  }
}

export default withParams(Layout);