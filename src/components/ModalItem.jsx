import React from 'react';
import styled from 'styled-components';
import { connect,} from 'react-redux';
import {increaseQuantity} from '../store/cartSlice';
import {decreaseQuantity} from '../store/cartSlice';
import { removeItem } from '../store/cartSlice';
import withHooks from '../hoc/withHooks';

const ProductItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 40px;
  width: 100%;
`;

const LeftPart = styled.div`
  width: 40%;
  height: 100%;
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
`;

const ProductProperties = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
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
  margin-bottom: 10px;
`;

const ProductProperty = styled.div`
  font-family: 'Source Sans Pro';
  min-width: 24px;
  min-height: 24px;
  text-align: center;
  line-height: 1.25;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-right: 12px;
  background-color: ${(props) => {
    if (props.selected)  {
      return props.type === 'swatch' ? props.data : 'white'
    } else {
      return props.type === 'swatch' ? props.data : 'rgba(166, 166, 166, 0.2)'
    }
  }};
  opacity:  ${(props) => {
    if (!props.selected)  {
       return props.type === 'swatch' ? '.15' : '1'
    } 
  }};
  border:   ${(props) => {
    if (props.selected)  {
      return props.type === 'swatch' ? 'none' : '1px solid black'
    } else {
      return props.type === 'swatch' ? 'none' : '1px solid #A6A6A6'
    }
  }};
  color: ${props => (props.selected ? '#1D1F22' : '#A6A6A6')};
  cursor: pointer;
  padding: 5px;
  &:last-child {
    margin-right: 0;
  }
`;

const RightPart = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
`;
const Quantity = styled.div`
  display: flex;
  width: 24px;
  height: 137px;
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
  line-height: 16%;
`;
const IncreaseQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 24px;
  border: 1px solid black;
  position: relative;
`;
const DecreaseQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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

const Close = styled.div`
    position: absolute;
    top: 5px;
    right: 0px;
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
  remove = (cartId) => (e) => {
    e.stopPropagation()
    this.props.dispatch(removeItem({cartId}))
  }
  render() {
    const {
      id,
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
          <Close onClick={this.remove(cartId)} />
        </RightPart>
        
      </ProductItem>
    );
  }
}

export default withHooks(connect(mapStateToProps)(ModalItem));
