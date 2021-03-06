import React from 'react';
import styled from 'styled-components';
import { connect} from 'react-redux';
import { Interweave } from 'interweave';

import { addItem } from '../store/cartSlice';
import ProductProperties from './ProductProperties';
import { uniqueCartId } from '../utils/uniqueCartId';
import withHooks from '../hoc/withHooks';


const ProductItem = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 513px;
  padding: 20px;
  flex: 1 1 auto;
  flex-wrap: wrap;
`;

const ProductImageWrapper = styled.div`
  height: 513px;
  width: 600px;
  position: relative;
  overflow: hidden;
  margin-right: 100px;
  flex: 0 1 auto;
  opacity: ${props => (props.inStock ? '1' : '.5')};
`;
const ProductImageSmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex: 0 1 auto;
  margin-right: 40px;
`;
const ProductImageSmallWrapper = styled.div`
  height: 80px;
  width: 80px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 40px;
`;
const ProductImageSmall = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
  cursor: pointer;  
`;
const ProductImageBig = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  height: auto;
  width: 100%;
  object-fit: cover;
  display: block;
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

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  margin: 16px;
  height: 100%;
  max-width: 400px;
  flex: 0 1 auto;
  max-width: 300px;
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
  &:active{
   transform: scale(.9);
}
`;
const ProductDescription = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  flex: 1 1 auto;
`;

const mapStateToProps = (state) => ({
  currentCurrencyIndex: state.currencies.currentCurrency,
  productProperties: state.product
});

class PDPItem extends React.PureComponent {

  setInitialProperties = (attributes, gallery) => {
    const obj = {};
    attributes.forEach((attr) => {
      obj[attr.name] = attr.items[0].value;
    });
    return {
      currentProperty: obj,
      currentImageSrc: gallery[0],
      quantity: 1,
    };
  };

  componentDidUpdate( prevProps, prevState) {
    if (prevProps.productProperties !== this.props.productProperties) {
      const { product, error, loading } = this.props.productProperties;
    if (!loading && !error) {
      const { attributes, gallery } = product;
      if (attributes) {
        this.setState((prevState) => ({
          ...prevState, 
          ...this.setInitialProperties(attributes, gallery)
        }));
      }
    }
    }
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  changeImage = (e) => {
    e.stopPropagation();
    this.setState({
      currentImageSrc: e.target.src,
    });
  };

  addToCart = (item) => (e) => {
    e.stopPropagation();
    const cartId = uniqueCartId(item.id, item.currentProperty);
    if (item.cartId !== cartId) {
      item.cartId = cartId;
    }
    return this.props.dispatch(addItem(item));
  };

  parameterHandler = (parameterName, item, inStock) => (e) => {
    if (!inStock) return;
    e.stopPropagation();
    this.setState((prevState) => ({
      currentProperty: {
        ...prevState.currentProperty,
        [parameterName]: item.value,
      },
    }));
  };
  render() {
    const { product, error, loading } = this.props.productProperties;
    if (loading) return <p>loading...</p>;
    if (error) return null;
    if (!this.state) return null;
    const {
      gallery,
      brand,
      name,
      prices,
      attributes,
      id,
      inStock,
      description,
    } = product;
    const index = this.props.currentCurrencyIndex;
    const { currentProperty, quantity } = this.state;
    return (
      <ProductItem>
        <ProductImageSmallContainer>
          {gallery &&
            gallery.map((image) => {
              return (
                <ProductImageSmallWrapper key={image}>
                  <ProductImageSmall
                    src={image}
                    onClick={this.changeImage}
                    current={this.state.currentImageSrc}
                  />
                </ProductImageSmallWrapper>
              );
            })}
        </ProductImageSmallContainer>
        <ProductImageWrapper inStock={inStock}>
          <ProductImageBig src={this.state.currentImageSrc || gallery[0]} />
          {!inStock && <ProductOutOfStock>OUT OF STOCK</ProductOutOfStock>}
        </ProductImageWrapper>
        <ProductInfo>
          <ProductInfoBrand>{brand}</ProductInfoBrand>
          <ProductInfoName>{name}</ProductInfoName>
          <ProductProperties
            attributes={attributes}
            parameterHandler={this.parameterHandler}
            currentProperty={this.state.currentProperty}
            inStock={inStock}
          />
          <ProductInfoPrice>
            <ProductInfoPriceTitle>PRICE</ProductInfoPriceTitle>
            <ProductInfoPriceValue>
              {prices[index].currency.symbol}{' '}
              {Math.trunc(prices[index].amount).toFixed(2)}
            </ProductInfoPriceValue>
          </ProductInfoPrice>
          {inStock && (
            <Button
              onClick={this.addToCart({
                id,
                gallery,
                prices,
                brand,
                name,
                attributes,
                currentProperty,
                quantity,
              })}
            >
              ADD TO CART
            </Button>
          )}
          <ProductDescription>
            <Interweave content={description} />
          </ProductDescription>
        </ProductInfo>
      </ProductItem>
    );
  }
}

export default withHooks(connect(mapStateToProps)(PDPItem));
