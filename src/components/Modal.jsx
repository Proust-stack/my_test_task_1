import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductModal from './ProductModal';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 80px;
  left: 0;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  top: 0;
  right: 250px;
  position: absolute;
  padding: 16px;
  
`;

const Title = styled.div`
  line-height: 16px;
  color: #1d1f22;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  margin-bottom: 23px;
`;
const Total = styled.div`
  height: 40px;
  font-weight: 700;
  text-transform: uppercase;
  color: #1d1f22;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const TotalTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-transform: uppercase;
  color: #1d1f22;
  text-align: start;
`;
const TotalPrice = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-transform: uppercase;
  color: #1d1f22;
  margin-bottom: 30px;
`;

const ButonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled(Link)`
  width: 48%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: ${(props) => (props.primary ? 'white' : '#5ECE7B')};
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: ${(props) => (props.primary ? 'black' : 'white')};
  text-transform: uppercase;
  border: ${(props) => (props.primary ? '1px solid black' : 'none')};
  cursor: pointer;
`;

function withParams(Component) {
  return props => <Component 
  {...props}  
  dispatch={useDispatch()}
  cart={useSelector(state => state.cart.items)}
  currentCurrencyIndex={useSelector(state => state.currencies.currentCurrency)}
  navigate={useNavigate()}
  />;
}
class Modal extends Component {

  componentDidMount = () => {
    
  };
  render() {
    const cartItems = this.props.cart
    // if (!this.state) return <p>loading...</p>;
    return (
      <Wrapper>
        <Content onMouseLeave={() => this.props.toggleModal()}>
          <Title>My bag</Title>
          {cartItems.map(item => <ProductModal productProperties={item} key={item.id}/>)}
          <Total>
            <TotalTitle>total</TotalTitle>
            <TotalPrice>100$</TotalPrice>
          </Total>
          <ButonsWrapper>
            <Button primary="true" to={`/cart`}>VIEW BAG</Button>
            <Button to={`/`}>CHECK OUT</Button>
          </ButonsWrapper>
        </Content>
      </Wrapper>
    );
  }
}

export default withParams(Modal);