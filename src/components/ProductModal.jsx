import React, { Component } from 'react';
import styled from 'styled-components';
import Carousel from './Carousel';

const ProductItem = styled.div`
  width: 100%;
  height: 137px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
  margin-bottom: 40px;
`;

const LeftPart = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const ProductBrand = styled.div`
  font-size: 16px;
  line-height: 16px;
  font-style: normal;
  font-weight: 300;
`;
const ProductName = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 16px;
`;

const ProductPrice = styled.div`
  font-size: 18px;
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
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  border: 1px solid black;
  margin-right: 8px;
`;

const RightPart = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Quantity = styled.div`
  display: flex;
  width: 24px;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px;
`;
const QuantityValue = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 16%;
`;
const IncreaseQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 24px;
  border: 1px solid black;
`;
const DecreaseQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 24px;
  border: 1px solid black;
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 105px;
  height: 100%;
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

export default class ProductModal extends Component {
  componentDidMount() {
    this.setState({ ...this.props.productProperties });
  }
  render() {
    if (!this.state) return <p>loading</p>;
    const { imageBig, imagesSmall, brand, name, sizes, prices, description } =
      this.state;
    return (
      <ProductItem>
        <LeftPart>
          <ProductBrand>{brand}</ProductBrand>
          <ProductName>{name}</ProductName>
          <ProductPrice>{prices[0].amount}</ProductPrice>
          <ProductSizeWrapper>
            {sizes?.map((size) => {
              return <ProductSize key={size.value}>{size.value}</ProductSize>;
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
              {imagesSmall.map(image => {
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
