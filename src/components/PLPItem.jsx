import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import cartIcon from '../assets/icons/cart_green.png';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/cartSlice';
import ProductProperties from './ProductProperties';

const ItemCart = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;
  background-image: url(${cartIcon});
  top: 320px;
  left: 60%;
  flex: 1 1 auto;
`;

const ProductItem = styled.div`
  min-width: 386px;
  min-height: 444px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  margin-bottom: 100px;
  padding: 16px;
  flex: 0 1 auto;
  cursor: pointer;
  &:hover  ${ItemCart} {
      display: flex;
  }
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
`;

const ProductImageWrapper = styled.div`
  height: 330px;
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
`;

const ProductImage = styled.img`
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
	height: 100%;
  object-fit: cover;
  opacity: ${props => (props.inStock ? '1' : '.5')};
`;
const ProductOutOfStock = styled.div`
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
	height: 100%;
  object-fit: cover;
  color: #8D8F9A;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  
`;
const ProductTitle = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  color: #1D1F22;
  margin-bottom: 20px;
`;
const ProductPrice = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 10px;
`;



function withParams(Component) {
  return props => <Component 
  {...props}  
  cart={useSelector(state => state.cart)} 
  currentCurrencyIndex={useSelector(state => state.currencies.currentCurrency)} 
  dispatch={useDispatch()}
  navigate={useNavigate()}
  />;
}
class PLPItem extends Component {

  fetchInitialProperties = () => {
    const { attributes} = this.props.product;
    const obj = {}
    attributes.forEach(attr => {
      obj[attr.name] = attr.items[0].value
    })
    this.setState({ currentProperty: obj, quantity: 1});
  }

  componentDidMount() {
      this.fetchInitialProperties()
  }

  componentDidCatch(error) {
    console.log(error.message);
  }

  addToCart = (item) => e => {
    e.stopPropagation()
    return this.props.dispatch(addItem(item))
  }
  getProduct = (address) => {
    this.props.navigate(address)
  }

  render() {
    const {id, name, gallery, brand, inStock, prices, attributes} = this.props.product;
    const index = this.props.currentCurrencyIndex
    return (
      <ProductItem key={id} onClick={() => this.getProduct(`/products/${id}`)}>
        <ProductImageWrapper >
          <ProductImage src={gallery[0]} inStock/>
          {!inStock && <ProductOutOfStock>OUT OF STOCK</ProductOutOfStock>}
        </ProductImageWrapper>
        <ProductFooter>
          <ProductTitle>{name}</ProductTitle>
          <ProductPrice>{prices[index].currency.symbol}{Math.trunc(prices[index].amount).toFixed(2)}</ProductPrice>
          <ProductProperties 
          attributes={attributes} 
          parameterHandler={() => null}
          currentProperty = {() => null}
          />
        </ProductFooter>
        {inStock && <ItemCart  onClick={this.addToCart({id, gallery, prices, brand, name, attributes, ...this.state})}/>}
      </ProductItem>
    );
  }
}

export default withParams(PLPItem);
