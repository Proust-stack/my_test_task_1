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
  return props => <Component 
  {...props} 
  params={useParams()} 
  product={useSelector(state => state.product)}
  dispatch={useDispatch()}
  />;
}

class ProductPageWithData extends Component {
      componentDidMount() {
        this.props.dispatch(fetchProduct(this.props.params.productId))
        const {product} = this.props.product
          this.setState({
            productProperties: {
            gallery: product.gallery,
            brand: product.brand,
            name: product.name,
            attributes: product?.attributes,
            prices: product.prices,
            description: product.description,
            id: product.id
            }
        });
    }
  render() {
    const {error, loading} = this.props.product
    const {gallery, brand, name, attributes, prices, description, id}  = this.props.product.product
    if (loading) return <p>loading...</p>;
    if (error) return <p>error...</p>;
    if (!this.state) return <p>error...</p>;
    console.log(this.props.product);
    console.log(this.state);
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

