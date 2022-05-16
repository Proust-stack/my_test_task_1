import React from 'react';
import styled from 'styled-components';
import { connect,} from 'react-redux';

import {increaseQuantity} from '../store/cartSlice';
import {decreaseQuantity} from '../store/cartSlice';
import withHooks from '../hoc/withHooks';

const ProductItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 0 1 auto;
  cursor: pointer;
  margin-bottom: 40px;
  height: 100%;
`;

const LeftPart = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const ProductBrand = styled.div`
  font-size: 16px;
  line-height: 16px;
  font-style: normal;
  font-weight: 300;
  margin-bottom: 5px;
`;
const ProductName = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 16px;
  margin-bottom: 10px;
`;

const ProductPrice = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 5px;
`;

const ProductPropertiesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: -10px;
`;

const ProductProperties = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 8px;
`;

const ProductPropertyTitle = styled.div`
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.25;
  margin-bottom: 10px;
`;

const ProductPropertyWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ProductProperty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;
  font-family: 'Source Sans Pro';
  width:  ${props => props.type === 'swatch' ? '20px' : ''};
  height: ${props => props.type === 'swatch' ? '20px' : '24px'};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
  background-color: ${(props) => {
    if (props.selected)  {
      return props.type === 'swatch' ? props.data : '#1D1F22'
    } else {
      return props.type === 'swatch' ? props.data : 'rgba(255, 255, 255, 0.2)'
    }
  }};
  border:   ${(props) => {
    if (props.selected)  {
      return props.type === 'swatch' ? '2px solid white' : '1px solid #1D1F22'
    } else {
      return props.type === 'swatch' ? 'none' : '1px solid #1D1F22'
    }
  }};
  outline:  ${(props) => {
    if (props.selected)  {
      return props.type === 'swatch' ? '2px solid #5ECE7B' : 'none'
    } 
  }};
  
  color: ${props => (props.selected ? 'white' : '#1D1F22')};
  cursor: pointer;
  padding: 5px;
  &:last-child {
    margin-right: 0;
  }
`;

const RightPart = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const Quantity = styled.div`
  display: flex;
  width: 24px;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px;
`;
const QuantityValue = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
`;
const IncreaseQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid black;
  position: relative;
`;
const DecreaseQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid black;
`;

const HorLine = styled.div`
  border-bottom: 1px solid #1D1F22;
  width: 8px;
  height: 1px;
`;
const VerLine = styled.div`
  border-right: 1px solid #1D1F22;
  width: 1px;
  height: 8px;
  position: absolute;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 105px;
  height: 137px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const mapStateToProps = (state) => ({
  currentCurrencyIndex: state.currencies.currentCurrency,
});

class ModalItem extends React.PureComponent {

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
            {prices[index].currency.symbol}{' '}
            {Math.trunc(prices[index].amount).toFixed(2)}
          </ProductPrice>
          <ProductPropertiesWrapper>
            {attributes.map((attr) => {
              return (
                <ProductProperties key={attr.id}>
                  <ProductPropertyTitle>
                    {attr.name}:
                  </ProductPropertyTitle>
                  <ProductPropertyWrapper>
                    {attr.items.map((item) => {
                      return (
                        <ProductProperty
                          parametresName={attr.name} //name of characteristic (for example "size")
                          type={attr.type}
                          key={item.value}
                          data={item.value}
                          selected={
                            (currentProperty &&
                              currentProperty[`${attr.name}`]) ===
                            `${item.value}`
                          } // current  choice of this characteristic (for example  size "M")
                        >
                          {attr.type !== 'swatch' && item.value}
                        </ProductProperty>
                      );
                    })}
                  </ProductPropertyWrapper>
                </ProductProperties>
              );
            })}
          </ProductPropertiesWrapper>
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
          <ImageWrapper>
            <ProductImage src={gallery[0]} />
          </ImageWrapper>
        </RightPart>
      </ProductItem>
    );
  }
}

export default withHooks(connect(mapStateToProps)(ModalItem));
