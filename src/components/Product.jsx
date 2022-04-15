import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/react-hoc';

const ProductItem = styled.div`
  width: 386px;
  height: 444px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
  
`;

const ProductImageWrapper = styled.div`
  height: 330px;
  margin: 16px;
  width: 354px;
  background-color: #C4C4C4;
  position: relative;
  overflow: hidden;
`;
const ProductImage = styled.img`
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
	height: 100%;
  object-fit: cover;
`;

const ProductFooter = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 16px;
`;
const ProductTitle = styled.div`
  width: 100%;
  font-size: 18px;
  color: black;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
`;

class Product extends Component {
  
  render() {
    const {id, name, gallery} = this.props.post;
    return (
      <ProductItem key={id}>
        <ProductImageWrapper>
          <ProductImage src={gallery[0]}/>
        </ProductImageWrapper>
        <ProductFooter>
          <ProductTitle>{name}</ProductTitle>
          <ProductTitle>{id}</ProductTitle>
        </ProductFooter>
      </ProductItem>
    );
  }
}

const withProductQuery = graphql(gql`
query getProduct {
  product(id: 
     "huarache-x-stussy-le"
  ) {
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
`);
const ProductWithData = withProductQuery(Product);
export default ProductWithData;

