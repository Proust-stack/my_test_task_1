import React, { Component } from 'react';
import styled from 'styled-components';
import HeaderWithData from '../components/Header';
import Product from '../components/Product';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

const Wrapper = styled.main`
  min-height: 100vh;
  height: 100%;
`;

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
          };
      }
      componentDidMount() {
        const {data} = this.props;
        if (data.product) {
        const { product } = data;
        this.setState = {
            productProperties: {
            imageBig: product.gallery[0],
            imagesSmall: product.gallery.slice(1),
            brand: product.brand,
            name: product.name,
            sizes: product.attributes.items,
            prices: product.prices,
            description: product.description,
            }
        };
        }
    }
  render() {
    const {data, error, loading} = this.props;
    console.log(this.state);
    if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p>Error!</p>;
      }
    return (
      <>
        <HeaderWithData />
        <Product />
      </>
    );
  }
}

const withMainQuery = graphql(gql`
  query getProduct {
    product(id: "huarache-x-stussy-le") {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`);
const ProductPageWithData = withMainQuery(ProductPage);
export default ProductPageWithData;
