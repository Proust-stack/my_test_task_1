import React, { Component, PureComponent } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ProductCart from '../components/ProductCart';

const Wrapper = styled.div`
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
  margin:  80px 0 60px 0;
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

const Total = styled.div`
  height: 40px;
  font-weight: 700;
  text-transform: uppercase;
  color: #1d1f22;
  display: flex;
  justify-content: flex-start;
`;

const TotalTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-transform: uppercase;
  color: #1d1f22;
  text-align: start;
  margin-bottom: 30px;
  margin-right: 10px;
`;
const TotalPrice = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-transform: uppercase;
  color: #1d1f22;
  
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
class CartPageWithData extends Component {
  state = {
    totalCost: 0,
    currencySymbol: '$',
  };

  getTotalCost = () => {
    const items = this.props.items;
      const currencies = this.props.currencies; // array of currencies
      const currencyIndex = this.props.currentCurrencyIndex; // get index current currency (number)
      let totalCost = 0;
      items.forEach((item) => {
        totalCost += item.prices[currencyIndex].amount * item.quantity;
      });
      this.setState({
        totalCost: totalCost.toFixed(2),
        currencySymbol: currencies[currencyIndex].symbol,
      });
  }


  componentDidMount() {
    this.getTotalCost();
  }
  componentDidUpdate(prevProps) {
    if (this.props.currentCurrencyIndex !== prevProps.currentCurrencyIndex || this.props.items !== prevProps.items) {
      this.getTotalCost();
    }
  }
  render() {
    if (!this.state) return <p>loading</p>;
    const items = this.props.items;
    if (items.length === 0) return <p>Nothing is added yet..</p>;
    return (
        <Wrapper>
          <CartTitle>Cart</CartTitle>
          <ItemsWrapper>
            {items.map((item) => (
              <div  key={item.id}>
              <Divider/>
              <ProductCart productProperties={item} />
              </div>
            ))}
          </ItemsWrapper>
          <Total>
            <TotalTitle>total</TotalTitle>
            <TotalPrice>
              {this.state.currencySymbol} {this.state.totalCost}
            </TotalPrice>
          </Total>
        </Wrapper>
    );
  }
}

export default withParams(CartPageWithData);
