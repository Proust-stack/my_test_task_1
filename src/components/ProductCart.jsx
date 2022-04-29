import React, { Component } from 'react';
import styled from 'styled-components';
import Carousel from './Carousel';

const ProductItem = styled.div`
  height: 186px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  cursor: pointer;
  ::before {
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    background: #E5E5E5;
    margin-bottom: 2px;
    content: '';
  }
`;

const LeftPart = styled.div`
  width: 300px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const ProductBrand = styled.div`
  font-size: 30px;
  line-height: 27px;
  font-style: normal;
  font-weight: 600;
`;
const ProductName = styled.div`
  width: 100%;
  font-size: 18px;
  color: black;
  font-style: normal;
  font-weight: 400;
  line-height: 27px;
`;

const ProductPrice = styled.div`
  width: 100%;
  font-size: 18px;
  color: black;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  display: flex;
  justify-content: flex-start;
`;

const ProductSizeWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  
`;
const ProductSize = styled.div`
  width: 63px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  border: 1px solid black;
  margin-right: 12px;
`;

const RightPart = styled.div`
  width: 300px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Quantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 12px;
`;
const QuantityValue = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 24px;
  line-height: 160%;
`;
const IncreaseQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border: 1px solid black;
`;
const DecreaseQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border: 1px solid black;
`;
const ImageWrapper = styled.div`
  position: relative;
  
  
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  
`;

export default class ProductCart extends Component {
  componentDidMount() {
    this.setState({ ...this.props.productProperties });
  }
  render() {
    if (!this.state) return <p>loading</p>;
    const { id, gallery, prices, brand,  name, properties} =
      this.state;
    return (
      <ProductItem>
        <LeftPart>
          <ProductBrand>{brand}</ProductBrand>
          <ProductName>{name}</ProductName>
          <ProductPrice>{prices[0].amount}</ProductPrice>
          <ProductSizeWrapper>
            {properties && properties.map((property) => {
              return <ProductSize key={property.value}>{property.value}</ProductSize>;
            })}
          </ProductSizeWrapper>
        </LeftPart>
        <RightPart>
          <Quantity>
            <IncreaseQuantity>+</IncreaseQuantity>
            <QuantityValue>10</QuantityValue>
            <DecreaseQuantity>-</DecreaseQuantity>
          </Quantity>
          <ImageWrapper>
            <Carousel >
              {gallery.map(image => {
                return (
                     <ProductImage src={image} key={image}/>
                )
              })}
            </Carousel>
          </ImageWrapper>
        </RightPart>
      </ProductItem>
    );
  }
}
