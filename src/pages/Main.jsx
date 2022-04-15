import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/react-hoc';
import ProductWithData from '../components/Product';
import Header from '../components/Header';

const Wrapper = styled.main`
  min-height: 100vh;
  height: 100%;
`;
const ItemsWrapper = styled.div`
  display: grid;
  flex-wrap: wrap;
  gap: 40px 119px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 50px;
`;

const posts = [
  { id: 2, title: 'Apollo Running Short', urlImage: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087" },
  { id: 3, title: 'Apollo Running Short', urlImage: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087" },
  { id: 4, title: 'Apollo Running Short', urlImage: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087" },
  { id: 5, title: 'Apollo Running Short', urlImage: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087" },
  { id: 6, title: 'Apollo Running Short', urlImage: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087" },
  { id: 7, title: 'Apollo Running Short', urlImage: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087" },
];

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {data, error, loading} = this.props;
    const itemsArray = data.category?.products;
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Error!</p>;
    }
    
    
    return (
      <Wrapper>
        <Header />
        <ItemsWrapper>
          {itemsArray && itemsArray.map((post) => {
            return (
              <ProductWithData post={post} key={post.id}/>
            );
          })}
        </ItemsWrapper>
      </Wrapper>
    );
  }
}

const withMainQuery = graphql(gql`
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
const MainWithData = withMainQuery(Main);
export default MainWithData;
