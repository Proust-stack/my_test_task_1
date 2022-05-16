import React from 'react';
import styled from 'styled-components';

import TotalItem from './TotalItem';

const Container = styled.div`
  max-width: 280px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  margin-top: 30px;
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
  margin-top: 16px;
  border: none;
  cursor: pointer;
  &:active{
   transform: scale(.9);
}
`;

export default class CartFooter extends React.PureComponent {
  render() {
    const {currencySymbol, quantity, totalCost} = this.props
    return (
      <Container>
      <TotalItem title={'Tax 21%:'} value={Math.trunc(totalCost*0.21).toFixed(2)} symbol={currencySymbol}/>
      <TotalItem title={'Quantity:'} value={quantity}/>
      <TotalItem title={'Total'} value={totalCost} symbol={currencySymbol}/>
      <Button>order</Button>
      </Container>
    );
  }
}
