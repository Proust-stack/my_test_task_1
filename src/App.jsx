import React, { Component } from 'react';
import styled from 'styled-components';
import AppRouter from './components/AppRouter';
import GlobalStyles from './styles/global'

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
          <AppRouter />
          <GlobalStyles />
      </AppWrapper>
    );
  }
}
