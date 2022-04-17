import React, { Component } from 'react';
import styled from 'styled-components';


const ProductItem = styled.div`
  width: 386px;
  height: 444px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
  :hover {
    filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  }
`;

const LeftPart = styled.div`
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

const ProductBrand = styled.div`
  width: 100%;
  font-size: 18px;
  color: black;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
`;
const ProductName = styled.div`
  width: 100%;
  font-size: 18px;
  color: black;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
`;

const ProductPrice = styled.div`
  width: 100%;
  font-size: 18px;
  color: black;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
  display: flex;
  justify-content: flex-start;
`;

const ProductSize = styled.div`
  width: 100%;
  font-size: 18px;
  color: black;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
  display: flex;
  justify-content: flex-start;
`;

const RightPart = styled.div`
  min-height: 100vh;
  height: 100%;
`;
const Quantity = styled.div`
  min-height: 100vh;
  height: 100%;
`;
const ImageWrapper = styled.div`
  min-height: 100vh;
  height: 100%;
`;

export default class ProductCart extends Component {
  render() {
    return (
      <ProductItem>
        <LeftPart>
          <ProductBrand/>
          <ProductName/>
          <ProductPrice/>
          <ProductSize/>
        </LeftPart>
        <RightPart>
          <Quantity/>
          <ImageWrapper/>
        </RightPart>
      </ProductItem>
    )
  }
}
