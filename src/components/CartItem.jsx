import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Carousel from './Carousel';
import {increaseQuantity} from '../store/cartSlice';
import {decreaseQuantity} from '../store/cartSlice';
import { removeItem } from '../store/cartSlice';
import ProductProperties from './ProductProperties';
import withHooks from '../hoc/withHooks';

const ProductItem = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  flex: 1 1 auto;
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
`;

const LeftPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  flex: 0 1 auto;
`;

const ProductBrand = styled.div`
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 16px;
`;
const ProductName = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 16px;
`;

const ProductPrice = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  display: flex;
  margin-bottom: 16px;
`;

const RightPart = styled.div`
  width: 300px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 0 1 auto;
  position: relative;
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
  font-size: 36px;
  position: relative;
`;
const HorLine = styled.div`
  border-bottom: 1px solid #1D1F22;
  width: 15px;
  height: 1px;
`;
const VerLine = styled.div`
  border-right: 1px solid #1D1F22;
  width: 1px;
  height: 15px;
  position: absolute;
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

const Close = styled.div`
    position: absolute;
    top: -10px;
    right: -17px;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;

&:before {
  content: "";
    position: absolute;
    top: 2px;
    left: 15px;
    width: 15px;
    height: 2px;
    background: #1D1F22;
    transform: rotate(45deg);
}
&:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 15px;
    width: 15px;
    height: 2px;
    background: #555;
    transform: rotate(-45deg);
}
`

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const mapStateToProps = (state) => ({
  currentCurrencyIndex: state.currencies.currentCurrency
});

  class CartItem extends Component {

    componentDidCatch(error) {
      console.log(error.message);
    }

    increase = (cartId) => (e) => {
      e.stopPropagation()
      this.props.dispatch(increaseQuantity({cartId}))
    }
    decrease = (cartId) => (e) => {
      e.stopPropagation()
      this.props.dispatch(decreaseQuantity({cartId}))
    }
    remove = (cartId) => (e) => {
      e.stopPropagation()
      this.props.dispatch(removeItem({cartId}))
    }
  render() {
    const {
      cartId,
      gallery,
      prices,
      brand,
      name,
      attributes,
      currentProperty,
      quantity,
    } = this.props.productProperties;
    const index = this.props.currentCurrencyIndex;
    return (
      <ProductItem>
        <LeftPart>
          <ProductBrand>{brand}</ProductBrand>
          <ProductName>{name}</ProductName>
          <ProductPrice>
            {prices[index].currency.symbol} {Math.trunc(prices[index].amount).toFixed(2)}
          </ProductPrice>
          <ProductProperties
            attributes={attributes}
            parameterHandler={() => null}
            currentProperty={currentProperty}
          />
        </LeftPart>
        <RightPart>
          <Quantity>
            <IncreaseQuantity onClick={this.increase(cartId)}>
              <HorLine/>
              <VerLine/>
            </IncreaseQuantity>
            <QuantityValue>{quantity}</QuantityValue>
            <DecreaseQuantity onClick={this.decrease(cartId)}>
              <HorLine/>
            </DecreaseQuantity>
          </Quantity>
            <Carousel>
              {gallery.map((image) => {
                return <ProductImage src={image} key={image} />;
              })}
            </Carousel>
            <Close onClick={this.remove(cartId)} />
        </RightPart>
      </ProductItem>
    );
  }
}

export default withHooks(connect(mapStateToProps)(CartItem));