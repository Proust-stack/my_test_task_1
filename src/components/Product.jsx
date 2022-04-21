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
  color: #1D1F22;
`;
const ProductInfoBrand = styled.div`
  width: 100%;
  height: 27px;
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
  margin-bottom: 16px;
`;
const ProductInfoName = styled.div`
  width: 100%;
  height: 27px;
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
  margin-bottom: 43px;
`;
const ProductInfoSize = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 50px;
`;
const ProductInfoSizeTitle = styled.div`
  width: 100%;
  height: 18px;
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 8px;
`;

const ProductInfoSizeWrapper = styled.div`
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
  margin-bottom: 40px;
`;

const ProductInfoPrice = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 20px;
`;
const ProductInfoPriceTitle = styled.div`
  width: 100%;
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 10px;
`;
const ProductInfoPriceValue = styled.div`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
`;
const Button = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: #5ece7b;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #ffffff;
  text-transform: uppercase;
  margin-bottom: 40px;
  border: none;
`;
const ProductFooter = styled.div`
  height: 100px;
  width: 100%;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
`;

class Product extends Component {
  componentDidMount() {
    this.setState({ ...this.props.productProperties });
  }
  adjustHTML() {
    return {__html: this.state.description};
  }

  render() {
    if (!this.state) return <p>loading</p>;
    const { imageBig, imagesSmall, brand, name, sizes, prices } =
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
          <ProductInfoBrand>{brand}</ProductInfoBrand>
          <ProductInfoName>{name}</ProductInfoName>
          <ProductInfoSize>
            <ProductInfoSizeTitle>Size:</ProductInfoSizeTitle>
            <ProductInfoSizeWrapper>
            {sizes?.map((size) => {
              return <ProductSize key={size.value}>{size.value}</ProductSize>;
            })}
            </ProductInfoSizeWrapper>
          </ProductInfoSize>
          <ProductInfoPrice>
            <ProductInfoPriceTitle>PRICE</ProductInfoPriceTitle>
            <ProductInfoPriceValue>$ {prices[0].amount}</ProductInfoPriceValue>
          </ProductInfoPrice>
          <Button>button</Button>
          <ProductFooter dangerouslySetInnerHTML={this.adjustHTML()}></ProductFooter>
        </ProductInfo>
      </ProductItem>
    );
  }
}

export default Product;
