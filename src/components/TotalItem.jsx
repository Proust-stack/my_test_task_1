import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  min-width: 280px;
`;

const ItemTitle = styled.div`
  font-family: 'Raleway';
  font-weight: 400;
  font-size: 24px;
  text-align: start;
  width: 40%
`;
const ItemValue = styled.div`
  font-family: 'Raleway';
  font-weight: 700;
  font-size: 24px;
  text-align: start;
`;


export default class TotalItem extends React.PureComponent {
    
  render() {
    const {title, value, symbol} = this.props
    return (
        <Item>
        <ItemTitle>{title}</ItemTitle>
        <ItemValue>
          {symbol}  {value}
        </ItemValue>
      </Item>
    )
  }
}
