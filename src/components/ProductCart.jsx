import React, { Component } from 'react';
import styled from 'styled-components';


const ProductItem = styled.div`
  width: 1098px;
  height: 186px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  :hover {
    filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
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
  margin-right: 12px;
`;
const ProductSize = styled.div`
  width: 63px;
  height: 45px;
  margin: 0 auto;
  text-align: center;
  line-height: 100%;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
`;


const RightPart = styled.div`
  width: 200px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Quantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const QuantityValue = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
`;
const IncreaseQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DecreaseQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
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

export default class ProductCart extends Component {
  componentDidMount() {
    this.setState({ ...this.props.productProperties });
  }
  render() {
    if (!this.state) return <p>loading</p>;
    const { imageBig, imagesSmall, brand, name, sizes, prices, description } =
      this.state;
    console.log(this.props);
    return (
      <ProductItem>
        <LeftPart>
          <ProductBrand>{brand}</ProductBrand>
          <ProductName>{name}</ProductName>
          <ProductPrice>{prices[0].amount}</ProductPrice>
          <ProductSizeWrapper>
              {sizes?.map(size => {
                return (
                  <ProductSize>{size}</ProductSize>
                )
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
            <ProductImage src={imageBig}/>
          </ImageWrapper>
        </RightPart>
      </ProductItem>
    )
  }
}
