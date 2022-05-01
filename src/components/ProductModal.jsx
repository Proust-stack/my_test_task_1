import React, { Component } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {increaseQuantity} from '../store/cartSlice';
import {decreaseQuantity} from '../store/cartSlice';
import {changeProperties} from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductItem = styled.div`
  width: 100%;
  height: 137px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
  margin-bottom: 40px;
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
`;
const ProductName = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 16px;
`;

const ProductPrice = styled.div`
  font-size: 18px;
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
  min-width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  border: ${(props) => (props.selected  ? '2px solid green' : '1px solid black')};
  margin-right: 12px;
  margin-bottom: 20px;
  background-color: ${(props) => (props.type === 'swatch' ? props.data : '')};
  cursor: pointer;
`;

const RightPart = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Quantity = styled.div`
  display: flex;
  width: 24px;
  height: 100%;
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
const ImageWrapper = styled.div`
  position: relative;
  width: 105px;
  height: 100%;
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

function withParams(Component) {
  return props => <Component 
  {...props}  
  dispatch={useDispatch()}
  navigate={useNavigate()}
  currentCurrencyIndex={useSelector(state => state.currencies.currentCurrency)}
  />;
}
class ProductModal extends Component {
  componentDidMount() {
    this.setState({
      currentProperty: this.props.productProperties.currentProperty,
    });
  }

  parameterHandler = (id, parametresName, item) => (e) => {
    e.stopPropagation();
    this.props.dispatch(changeProperties({ id, currentProperty: {parametresName: item.value} }))
    this.setState((prevState) => ({
      currentProperty: {
        ...prevState.currentProperty,
        [parametresName]: item.value,
      },
    }));
    console.log(this.state);
  };
  toProduct = (address) => {
    this.props.navigate(address);
  };
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
      <ProductItem onClick={() => this.toProduct(`/product/${id}`)}>
        <LeftPart>
          <ProductBrand>{brand}</ProductBrand>
          <ProductName>{name}</ProductName>
          <ProductPrice>
            {prices[index].currency.symbol} {prices[index].amount}
          </ProductPrice>
          <ProductPropertiesWrapper>
            {attributes.map((attr) => {
              return (
                <ProductPropertyWrapper key={attr.id}>
                  {attr.items.map((item) => {
                    return (
                      <ProductProperty
                        parametresName={attr.name} //name of characteristic (for example "size")
                        type={attr.type}
                        key={item.value}
                        data={item.value}
                        selected={
                          (currentProperty &&
                            currentProperty[`${attr.name}`]) === `${item.value}`
                        } // current  choice of this characteristic (for example  size "M")
                        onClick={this.parameterHandler(id, attr.name, item)}
                      >
                        {attr.type !== 'swatch' && item.value}
                      </ProductProperty>
                    );
                  })}
                </ProductPropertyWrapper>
              );
            })}
          </ProductPropertiesWrapper>
        </LeftPart>
        <RightPart>
          <Quantity>
            <IncreaseQuantity
              onClick={this.increase(id)}
            >
              +
            </IncreaseQuantity>
            <QuantityValue>{quantity}</QuantityValue>
            <DecreaseQuantity
              onClick={this.decrease(id)}
            >
              -
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

export default withParams(ProductModal);