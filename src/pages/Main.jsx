import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import ProductWithData from '../components/ProductItem';
import HeaderWithData from '../components/Header';


const Wrapper = styled.main`
  min-height: 100vh;
  height: 100%;
`;
const ItemsWrapper = styled.main`
  display: grid;
  flex-wrap: wrap;
  gap: 40px 119px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 50px;
`;
class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {data, error, loading} = this.props;
    const itemsArray = data.category?.products;
    console.log(data);
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Error!</p>;
    }
    
    
    return (
      <>
        <HeaderWithData />
        <ItemsWrapper>
          {itemsArray && itemsArray.map((post) => {
            return (
              <ProductWithData post={post} key={post.id}/>
            );
          })}
        </ItemsWrapper>
      </>
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
