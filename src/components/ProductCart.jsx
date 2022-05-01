import React, { Component } from 'react';
import styled from 'styled-components';
import Carousel from './Carousel';
import { useDispatch, useSelector } from 'react-redux';
import {increaseQuantity} from '../store/cartSlice';
import {decreaseQuantity} from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
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

const ProductPropertiesWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;


const ProductPropertyWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ProductProperty = styled.div`
  min-width: 63px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  border: ${(props) => (props.selected  ? '2px solid green' : '1px solid black')};
  margin-right: 12px;
  margin-bottom: 20px;
  background-color: ${(props) => (props.type === 'swatch' ? props.data : '')};
  cursor: pointer;
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

function withParams(Component) {
  return props => <Component 
  {...props}  
  dispatch={useDispatch()}
  navigate={useNavigate()}
  currentCurrencyIndex={useSelector(state => state.currencies.currentCurrency)}
  />;
}
  class ProductCart extends Component {
    parameterHandler = (parametresName, item) => e => {
      e.preventDefault()
      this.setState((prevState) => ({currentProperty: {...prevState.currentProperty , [parametresName]: item.value}}))
    }
    getProduct = (address) => {
      this.props.navigate(address)
    }

    increase = (id) => (e) => {
      e.stopPropagation()
      this.props.dispatch(increaseQuantity({id}))
    }
    decrease = (id) => (e) => {
      e.stopPropagation()
      this.props.dispatch(decreaseQuantity({id}))
    }
  render() {
    const {
      id,
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
      <ProductItem onClick={() => this.getProduct(`/product/${id}`)}>
        <LeftPart>
          <ProductBrand>{brand}</ProductBrand>
          <ProductName>{name}</ProductName>
          <ProductPrice>{prices[index].currency.symbol} {prices[index].amount}</ProductPrice>
          <ProductPropertiesWrapper>
          { attributes.map((attr) => {
            return (
            <ProductPropertyWrapper key={attr.id}>
            {attr.items.map((item) => {
              return <ProductProperty 
              parametresName={attr.name} //name of characteristic (for example "size")
              type={attr.type} 
              key={item.value}
              data={item.value}
              selected={(currentProperty && currentProperty[`${attr.name}`]) === `${item.value}`} // current  choice of this characteristic (for example  size "M")
              onClick={this.parameterHandler(attr.name, item)}
              >
                {attr.type !== 'swatch' && item.value}
                </ProductProperty>; 
            })}
            </ProductPropertyWrapper>
          )
          })
          }
          </ProductPropertiesWrapper>
        </LeftPart>
        <RightPart>
          <Quantity>
            <IncreaseQuantity onClick={this.increase(id)}>+</IncreaseQuantity>
            <QuantityValue>{quantity}</QuantityValue>
            <DecreaseQuantity onClick={this.decrease(id)}>-</DecreaseQuantity>
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

export default withParams(ProductCart);