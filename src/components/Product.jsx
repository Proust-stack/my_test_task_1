import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ProductImageWrapper = styled.div`
  height: 500px;
  margin-right: 100px;
  width: 600px;
  background-color: #c4c4c4;
  position: relative;
  overflow: hidden;
`;
const ProductImageSmall = styled.div`
  margin-right: 40px;
  width: 80px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const ProductImageWrapperSmall = styled.div`
  height: 80px;
  margin-bottom: 40px;
  width: 80px;
  background-color: #c4c4c4;
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

const ProductInfo = styled.div`
  height: 500px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 16px;
`;
const ProductInfoTitle = styled.div`
  width: 100%;
  font-size: 18px;
  color: black;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
`;
const ProductInfoSize = styled.div`
  width: 100%;
  font-size: 18px;
  color: black;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
  display: flex;
  justify-content: flex-start;
`;
const ProductInfoSizeTitle = styled.div`
  width: 100%;
  font-size: 18px;
  color: black;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
`;
const ProductInfoSizeBlocks = styled.div`
  width: 63px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: black;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
`;
const ProductInfoPrice = styled.div`
  width: 100%;
  font-size: 18px;
  color: black;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
  display: flex;
  justify-content: flex-start;
`;
const ProductInfoPriceTitle = styled.div`
  width: 100%;
  font-size: 18px;
  color: black;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
`;
const ProductInfoPriceValue = styled.div`
  width: 63px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: black;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
`;
const Button = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: #5ece7b;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  color: #ffffff;
  text-transform: uppercase;
`;
const ProductFooter = styled.div`
  height: 50px;
`;

class Product extends Component {
  componentDidMount() {
    this.setState({ ...this.props.productProperties });
  }

  render() {
    if (!this.state) return <p>loading</p>;
    const { imageBig, imagesSmall, brand, name, sizes, prices, description } =
      this.state;
    return (
      <ProductItem>
        <ProductImageSmall>
          {imagesSmall.map((image) => {
            return (
              <ProductImageWrapperSmall  key={image}>
                <ProductImage src={image} />
              </ProductImageWrapperSmall>
            );
          })}
        </ProductImageSmall>
        <ProductImageWrapper>
          <ProductImage src={imageBig} />
        </ProductImageWrapper>
        <ProductInfo>
          <ProductInfoTitle>{brand}</ProductInfoTitle>
          <ProductInfoSize>
            <ProductInfoSizeTitle>Size:</ProductInfoSizeTitle>
            <ProductInfoSizeBlocks></ProductInfoSizeBlocks>
          </ProductInfoSize>
          <ProductInfoPrice>
            <ProductInfoPriceTitle>$</ProductInfoPriceTitle>
            <ProductInfoPriceValue>{prices[0].amount}</ProductInfoPriceValue>
          </ProductInfoPrice>
          <Button>button</Button>
          <ProductFooter>{description}</ProductFooter>
        </ProductInfo>
      </ProductItem>
    );
  }
}

export default Product;
