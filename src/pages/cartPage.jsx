import React, { Component, PureComponent } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ProductCart from '../components/ProductCart';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  justify-content: flex-start;
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
  currencies={useSelector(state => state.currencies)}
  />;
}
class CartPageWithData extends PureComponent {
  state = {
    totalCost: 0,
    currencySymbol: '$'
  }
  
  componentDidMount() {
    const items = this.props.items
    const {currencies, currentCurrency} = this.props.currencies // get index current currency (number)
    let totalCost = 0;
    items.forEach(item => {
      totalCost += item.prices[currentCurrency].amount
    });
    console.log(this.state);
    this.setState({totalCost: totalCost, currencySymbol: currencies[currentCurrency].symbol })
  }
  componentDidUpdate() {
    
  }
  render() {
    const {currencies, currentCurrency} = this.props.currencies
    if (!this.state) return <p>loading</p>
    const items = this.props.items
    if (items.length === 0) return <p>Nothing is added yet..</p>
    return (
      <>
      <Wrapper>
        <CartTitle>Cart</CartTitle>
        {
        items.map(item => <ProductCart productProperties={item} key={item.id}/>)
        }
        <Total>
            <TotalTitle>total</TotalTitle>
            <TotalPrice>{currencies[currentCurrency].symbol || this.state.currencySymbol} {this.state.totalCost}</TotalPrice>
          </Total>
      </Wrapper>
      </>
    )
  }
}

export default withParams(CartPageWithData);
