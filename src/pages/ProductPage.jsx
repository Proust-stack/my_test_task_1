import React, { Component } from 'react';
import styled from 'styled-components';
import Product from '../components/Product';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/productSlice';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 80px;
`;

function withParams(Component) {
  return props => <Component 
  {...props} 
  params={useParams()} 
  product={useSelector(state => state.product)}
  dispatch={useDispatch()}
  />;
}

class ProductPageWithData extends Component {
      constructor(props) {
        super(props)
        this.props.dispatch(fetchProduct(this.props.params.productId))
      }
      componentDidMount() {
    }
  render() {
    const {error, loading} = this.props.product
    const {gallery, brand, name, attributes, prices, description, id}  = this.props.product.product
    const productProperties = {gallery, brand, name, attributes, prices, description, id}
    if (loading) return <p>loading...</p>;
    if (error) return <p>error...</p>;
    return (
        <Wrapper>
          <Product productProperties={productProperties}/>
        </Wrapper>
    );
  }
}

export default withParams(ProductPageWithData);

