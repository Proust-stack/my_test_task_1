import React, { Component } from 'react';
import styled from 'styled-components';
import GlobalStyles from '../styles/global';
import Header from './Header';
import Modal from './Modal';
import { Outlet } from 'react-router-dom';

const Container = styled.div`
   max-width: 1440px;
   margin: 0 auto;
`;


export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartModalOpened: false,
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
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
