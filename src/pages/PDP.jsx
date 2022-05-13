import React, { Component } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import PDPItem from '../components/PDPItem';
import { fetchProduct } from '../store/productSlice';

const Container = styled.main`
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 0 1 auto;
`;

function withParams(Component) {
  return props => <Component 
  {...props} 
  params={useParams()} 
  product={useSelector(state => state.product)}
  dispatch={useDispatch()}
  />;
}

class PDP extends Component {

  componentDidMount() {
    this.props.dispatch(fetchProduct(this.props.params.productId));
  }
  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params || this.props.product.product !== prevProps.product.product) {
      this.props.dispatch(fetchProduct(this.props.params.productId));
    }
  }
  componentDidCatch(error) {
    this.setState({
      error
    });
    console.log(error)
  }

  render() {
    if (this.state?.error) return <p>ups, error occured</p>;
    const { product, error, loading } = this.props.product;
    if (loading) return <p>loading...</p>;
    if (error) return null;
    return (
      <Container>
        <PDPItem productProperties={product} />
      </Container>
    );
  }
}

export default withParams(PDP);