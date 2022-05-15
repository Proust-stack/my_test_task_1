import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";

import PDPItem from '../components/PDPItem';
import { fetchProduct } from '../store/productSlice';
import withHooks from '../hoc/withHooks';

const Container = styled.main`
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 0 1 auto;
`;


class PDP extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchProduct(this.props.params.productId));
  }

  componentDidCatch(error, info) {
    this.setState({
      error
    });
    console.log(error, info)
  }

  render() {
    
    return (
      <Container>
        <PDPItem/>
      </Container>
    );
  }
}

export default withHooks(connect(null, null)(PDP));