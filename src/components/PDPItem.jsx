import React, { Component } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../store/cartSlice';
import ProductProperties from './ProductProperties';

const ProductItem = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 513px;
  padding: 20px;
`;

const ProductImageWrapper = styled.div`
  height: 513px;
  width: 600px;
  position: relative;
  overflow: hidden;
  margin-right: 20px;
  flex: 0 1 auto;
`;
const ProductImageSmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100%;
  width: 200px; 
  flex: 0 1 auto;
`;
const ProductImageSmallWrapper = styled.div`
  height: 80px;
  width: 80px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;
const ProductImageSmall = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;  
  transition: all 300ms 0ms ease-in-out;
  &:hover {
    transform: scale(1.1);
}
`;
const ProductImageBig = styled.img.attrs(
  (props) => ({
    style: {
      left: 150 -props.coord.x / 1.2 + 'px',
      top:  150 -props.coord.y / 1.2 + 'px',
    }
  })
)`
  position: absolute;
  left: 0;
  top: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: all 300ms 0 linear;
  &:hover {
    transform: scale(1.8);
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 16px;
  height: 100%;
  width: 300px;
  flex: 1 1 auto;
`;
const ProductInfoBrand = styled.div`
  height: 27px;
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 16px;
`;
const ProductInfoName = styled.div`
  height: 27px;
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  margin-bottom: 43px;
`;

const ProductInfoPrice = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 20px;
`;
const ProductInfoPriceTitle = styled.div`
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
`;
const ProductInfoPriceValue = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
`;
const Button = styled.button`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: #5ece7b;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  text-transform: uppercase;
  margin-bottom: 40px;
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  &:active{
   transform: scale(.7);
}
`;
const ProductFooter = styled.div`
  height: 100px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  overflow-y: auto;
  width: 100%;
`;

function withParams(Component) {
  return props => <Component 
  {...props}  
  dispatch={useDispatch()}
  navigate={useNavigate()}
  currentCurrencyIndex={useSelector(state => state.currencies.currentCurrency)} 
  />;
}
class PDPItem extends Component {
  constructor(props) {
    super(props)
     this.state = {
    quantity: 1,
    imageCoord: {x: 0, y: 0}
  }
  }
  fetchInitialProperties = () => {
    const { attributes} = this.props.productProperties;
    const obj = {}
    attributes.forEach(attr => {
      obj[attr.name] = attr.items[0].value
    })
    this.setState({ currentProperty: obj, currentImageSrc: this.props.productProperties.gallery[0]});
  }
 
  componentDidMount() {
    if (this.props.productProperties) {
      this.fetchInitialProperties()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.productProperties !== prevProps.productProperties) {
      this.fetchInitialProperties()
    }
  }

  componentDidCatch(error) {
    console.log(error.message);
  }
  adjustHTML(description) {
    return {__html: description};
  }

  changeImage = (e) => {
    e.stopPropagation()
    this.setState({
      currentImageSrc: e.target.src,
  });
  }

  _onMouseMove = (e) => {
    this.setState({ imageCoord: {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}});
  }
  addToCart = (item) => e => {
    e.stopPropagation()
    return this.props.dispatch(addItem(item))
  }

  parameterHandler = (parameterName, item) => e => {
    e.stopPropagation()
    this.setState((prevState) => ({currentProperty: {...prevState.currentProperty , [parameterName]: item.value}}))
  }

  render() {
    if (!this.props.productProperties) return <p>loading...</p>;
    const { gallery, brand, name, prices, attributes, id, inStock, description } =
    this.props.productProperties;
    const index = this.props.currentCurrencyIndex;
    const {currentProperty, quantity} = this.state
    return (
      <ProductItem>
        <ProductImageSmallContainer>
          {gallery && gallery.map((image) => {
            return (
              <ProductImageSmallWrapper  key={image} >
                <ProductImageSmall 
                src={image} 
                onClick={this.changeImage}
                current={this.state.currentImageSrc}
                />
              </ProductImageSmallWrapper>
            );
          })}
        </ProductImageSmallContainer>
        <ProductImageWrapper>
          <ProductImageBig 
          src={this.state.currentImageSrc || gallery[0]} 
          coord={this.state.imageCoord}
          onMouseMove={this._onMouseMove}
          />
        </ProductImageWrapper>
        <ProductInfo>
          <ProductInfoBrand>{brand}</ProductInfoBrand>
          <ProductInfoName>{name}</ProductInfoName>
          <ProductProperties 
          attributes={attributes} 
          parameterHandler={this.parameterHandler}
          currentProperty = {this.state.currentProperty}
          />
          <ProductInfoPrice>
            <ProductInfoPriceTitle>PRICE</ProductInfoPriceTitle>
            <ProductInfoPriceValue>{prices[index].currency.symbol} {Math.trunc(prices[index].amount).toFixed(2)}</ProductInfoPriceValue>
          </ProductInfoPrice>
          { inStock && <Button 
          onClick={this.addToCart({id, gallery, prices, brand, name, attributes, currentProperty, quantity})}
          
          >ADD TO CART</Button>}
          <ProductFooter dangerouslySetInnerHTML={this.adjustHTML(description)}></ProductFooter>
        </ProductInfo>
      </ProductItem>
    );
  }
}

export default withParams(PDPItem);