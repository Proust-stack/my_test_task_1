import React, { Component } from 'react';
import styled from 'styled-components';
import HeaderWithData from '../components/Header';
import Product from '../components/Product';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import { client } from '../index';
import { GET_PRODUCT } from '../utils/graphQLqueries';
import ProductCart from '../components/ProductCart';

const Wrapper = styled.main`
  min-height: 100vh;
  height: 100%;
`;
const Title = styled.div`
  font-size: 18px;
`;

export default class ProductPageWithData extends Component {
    constructor(props) {
        super(props);
        this.state = null;
      }
      componentDidMount = async () => {
        const response = await client.query({
          query:GET_PRODUCT
        })
        const { product } = await response.data;
          this.setState({
            productProperties: {
            imageBig: product.gallery[0],
            imagesSmall: product.gallery.slice(1),
            brand: product.brand,
            name: product.name,
            sizes: product.attributes.items,
            prices: product.prices,
            description: product.description,
            }
        });
    }
  render() {
    if (!this.state) return <p>loading...</p>
    return (
      <>
        <HeaderWithData />
        <Wrapper>
          <Title>{this.state.name}</Title>
          <ProductCart productProperties={this.state.productProperties}/>
        </Wrapper>
        
      </>
    );
  }
}

