import React, { Component } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../store/cartSlice';

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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const ProductImageWrapperSmall = styled.div`
  height: 80px;
  margin-bottom: 40px;
  width: 80px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
 
`;
const ProductImage = styled.img`
  position: absolute;
  left: 0%;
  top: 0%;
  width: ${(props) => (props.big ? '100%' : '100%;')} center / cover no-repeat;
  height: ${(props) => (props.big ? '100%' : '100%;')} center / cover  no-repeat;
  object-fit: cover;
  cursor: pointer;  
  
`;

const ProductInfo = styled.div`
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
const ProductInfoPropertyTitle = styled.div`
  width: 100%;
  height: 18px;
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 8px;
`;

const ProductInfoPropertyWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ProductParametr = styled.div`
  width: 63px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  border: ${(props) => (props.selected  ? '2px solid green' : '1px solid black')};
  margin-right: 12px;
  margin-bottom: 20px;
  background-color: ${(props) => (props.type === 'swatch' ? props.data : '')};
  cursor: pointer;
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
  cursor: pointer;
  &:active {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
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

function withParams(Component) {
  return props => <Component 
  {...props}  
  dispatch={useDispatch()}
  navigate={useNavigate()}
  currentCurrencyIndex={useSelector(state => state.currencies.currentCurrency)} 
  />;
}
class Product extends Component {

  componentDidMount() {
    this.setState({ imageCoord: {x: 0, y: 0}, properties: [], quantity: 1 });
  }
  adjustHTML() {
    return {__html: this.state.description};
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

  parameterHandler = (parametresName, item) => e => {
    e.preventDefault()
    // this.setState({properties: [...this.state.properties, {[parametresName]: item.value}]})
    this.setState((prevState) => ({currentProperty: {...prevState.currentProperty , [parametresName]: item.value}}))
  }

  render() {
    if (!this.state) return <p>loading</p>;
    const { gallery, brand, name, prices, attributes, id } =
    this.props.productProperties;
    const index = this.props.currentCurrencyIndex
    return (
      <ProductItem>
        <ProductImageSmall>
          {gallery.map((image) => {
            return (
              <ProductImageWrapperSmall  key={image} >
                <ProductImage 
                src={image} 
                onClick={this.changeImage}
                current={this.state.currentImageSrc}
                />
              </ProductImageWrapperSmall>
            );
          })}
        </ProductImageSmall>
        <ProductImageWrapper>
          <ProductImage 
          src={this.state.currentImageSrc || gallery[0]} 
          // onMouseMove={this._onMouseMove}
          />
        </ProductImageWrapper>
        <ProductInfo>
          <ProductInfoBrand>{brand}</ProductInfoBrand>
          <ProductInfoName>{name}</ProductInfoName>
          { attributes.map((attr) => {
            return (<ProductInfoSize key={attr.id}>
            <ProductInfoPropertyTitle>{attr.name}:</ProductInfoPropertyTitle>
            <ProductInfoPropertyWrapper>
            {attr.items.map((item) => {
              return <ProductParametr 
              parametresName={attr.name} //name of characteristic (for example "size")
              type={attr.type} 
              key={item.value}
              data={item.value}
              selected={(this.state.currentProperty && this.state.currentProperty[`${attr.name}`]) === `${item.value}`} // current  choice of this characteristic (for example  size "M")
              onClick={this.parameterHandler(attr.name, item)}
              >
                {attr.type !== 'swatch' && item.value}
                </ProductParametr>; 
            })}
            </ProductInfoPropertyWrapper>
          </ProductInfoSize>)
          })
          }
          <ProductInfoPrice>
            <ProductInfoPriceTitle>PRICE</ProductInfoPriceTitle>
            <ProductInfoPriceValue>{prices[index].currency.symbol} {prices[index].amount}</ProductInfoPriceValue>
          </ProductInfoPrice>
          <Button onClick={this.addToCart({id, gallery, prices, brand, name, attributes, ...this.state})}>ADD TO CART</Button>
          <ProductFooter dangerouslySetInnerHTML={this.adjustHTML()}></ProductFooter>
        </ProductInfo>
      </ProductItem>
    );
  }
}

export default withParams(Product);
