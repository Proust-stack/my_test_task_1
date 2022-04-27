import React, { Component } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

function withParams(Component) {
  return props => <Component 
  {...props}  
  dispatch={useDispatch()}
  cart={useSelector(state => state.cart)}
  />;
}
class CartPageWithData extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log(this.props.cart);
    return (
      <>
      <Wrapper>
        cart
      </Wrapper>
      </>
    )
  }
}

export default withParams(CartPageWithData);
