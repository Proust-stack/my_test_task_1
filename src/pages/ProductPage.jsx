import React, { Component } from 'react';
import styled from 'styled-components';
import Product from '../components/Product';
import { client } from '../index';
import { GET_PRODUCT } from '../utils/graphQLqueries';
import { useParams } from "react-router-dom";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 80px;
`;
const Title = styled.div`
  width: 84px;
  height: 40px;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-transform: uppercase;
  color: #1d1f22;
`;
const Divider = styled.div`
    background: #E5E5E5;
    width: 100%;
    height: 1px;
    margin: 2px 0;
`;

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class ProductPageWithData extends Component {
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
            sizes: product.attributes[0].items,
            prices: product.prices,
            description: product.description,
            }
        });
    }
  render() {
    if (!this.state) return <p>loading...</p>
    console.log(this.props);
    return (
      <>
        <Wrapper>
          <Title>{this.state.name}</Title>
          <Product productProperties={this.state.productProperties}/>
        </Wrapper>
        
      </>
    );
  }
}

export default withParams(ProductPageWithData);

