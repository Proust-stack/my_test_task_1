import React, { Component } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import CartItem from '../components/CartItem';
import { getTotalCost } from '../utils/getTotalCost';
import { getTotalQuantity } from '../utils/getTotalQuantity';
import CartFooter from '../components/CartFooter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  justify-content: space-around;
  flex: 0 1 auto;
`;

const CartTitle = styled.div`
  height: 84px;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-transform: uppercase;
  color: #1d1f22;
  text-align: start;
  margin:  80px 0 80px 0;
`;
const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;
const Divider = styled.div`
    width: 100%;
    height: 2px;
    background: #E5E5E5;
    margin-bottom: 10px;
`;


function withParams(Component) {
  return props => <Component 
  {...props}  
  dispatch={useDispatch()}
  items={useSelector(state => state.cart.items)}
  currencies={useSelector(state => state.currencies.currencies)}
  currentCurrencyIndex={useSelector(state => state.currencies.currentCurrency)}
  />;
}
class CartPage extends Component {
  state = {
    totalCost: 0,
    currencySymbol: '$',
  };

  componentDidMount() {
    const { currencies, currentCurrencyIndex, items } = this.props;
    this.setState(prev => {
      return {...prev, ...getTotalCost(currencies, currentCurrencyIndex, items)}
    }
    );
    this.setState(prev => {
      return {...prev, ...getTotalQuantity(items)}
    }
    );
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.currentCurrencyIndex !== prevProps.currentCurrencyIndex ||
      this.props.items !== prevProps.items
    ) {
      const { currencies, currentCurrencyIndex, items } = this.props;
      this.setState(prev => {
        return {...prev, ...getTotalCost(currencies, currentCurrencyIndex, items)}
      }
      );
      this.setState(prev => {
        return {...prev, ...getTotalQuantity(items)}
      }
      );
    }
  }
  componentDidCatch(error) {
    this.setState({
      error
    });
    console.log(error)
  }

  render() {
    if (!this.state) return <p>loading</p>;
    if (this.state?.error) return <p>ups, error occured</p>;
    const items = this.props.items;
    if (items.length === 0) return <p>Nothing is added yet..</p>;
    const {currencySymbol, quantity, totalCost} = this.state
    return (
        <Container>
          <CartTitle>Cart</CartTitle>
          <ItemsWrapper>
            {items.map((item) => (
              <div  key={item.cartId}>
              <Divider/>
              <CartItem productProperties={item} />
              </div>
            ))}
            <Divider/>
          </ItemsWrapper>
          <CartFooter currencySymbol={currencySymbol} quantity={quantity} totalCost={totalCost}/>
        </Container>
    );
  }
}

export default withParams(CartPage);
