import React, { Component } from 'react';
import HeaderWithData from '../components/Header';
import ProductCart from '../components/ProductCart';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

const Wrapper = styled.div`
  min-height: 100vh;
  height: 100%;
`;

class CartPage extends Component {
  render() {
    return (
      <>
      <HeaderWithData />
      <Wrapper>
        <ProductCart/>
      </Wrapper>
      </>
    )
  }
}

const withCartQuery = graphql(gql`
query getCategory {
  category(input: {
    title: "all"
  }) {
  products {
    id, 
    name, 
    inStock, 
    gallery, 
    description, 
    category, 
    attributes {
      id,
      name, 
      type, 
      items {
        displayValue,
        value,
        id
      }
    }, 
    prices {
      currency {
        label,
        symbol
      },
      amount
    }, 
    brand
  }
}
}
`);
const CartPageWithData = withCartQuery(CartPage);
export default CartPageWithData;
