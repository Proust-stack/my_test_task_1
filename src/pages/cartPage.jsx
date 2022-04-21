import React, { Component } from 'react';
import HeaderWithData from '../components/Header';
import ProductCart from '../components/ProductCart';
import styled from 'styled-components';
import { client } from '../index';
import { GET_PRODUCT } from '../utils/graphQLqueries';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export default class CartPageWithData extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }
  componentDidMount = async () => {
    const response = await client.query({
      query: GET_PRODUCT
    })
    const { product } = await response.data;
      this.setState({
        productProperties: {
        imageBig: product.gallery[0],
        imagesSmall: product.gallery.slice(1),
        brand: product.brand,
        name: product.name,
        sizes: product.attributes[0].items,
        prices: product.prices,
        description: product.description,
        }
    });
}
  render() {
    if (!this.state) return <p>loading...</p>
    
    return (
      <>
      <Wrapper>
        <ProductCart productProperties={this.state.productProperties}/>
        <ProductCart productProperties={this.state.productProperties}/>
        <ProductCart productProperties={this.state.productProperties}/>
        <ProductCart productProperties={this.state.productProperties}/>
        <ProductCart productProperties={this.state.productProperties}/>
      </Wrapper>
      </>
    )
  }
}
