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
  overflow-y: hidden;
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
  overflow-y: auto;
  max-height: 540px;
  ::-webkit-scrollbar {
  width: 0;
}
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 23px;
`;

const Title = styled.div`
  line-height: 16px;
  color: #1d1f22;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  margin-right: 5px;
`;

const ItemsTitle = styled(Title)`
  font-weight: 500;
`;
const PropertiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start ;
  margin-bottom: 23px;
`;
const Total = styled.div`
  max-height: 30px;
  font-weight: 700;
  color: #1d1f22;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const TotalTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 1.25;
  text-transform: uppercase;
  color: #1d1f22;
`;
const TotalPrice = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 1.25;
  text-transform: uppercase;
  color: #1d1f22;
`;

const ButonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
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
  items={useSelector(state => state.cart.items)}
  currencies={useSelector(state => state.currencies.currencies)}
  currentCurrencyIndex={useSelector(state => state.currencies.currentCurrency)}
  navigate={useNavigate()}
  />;
}
class Modal extends Component {
  state = {
    totalCost: 0,
    currencySymbol: '$',
  };

  getTotalCost = () => {
      const currencies = this.props.currencies; // array of currencies
      const currencyIndex = this.props.currentCurrencyIndex; // get index current currency (number)
      let totalCost = 0;
      this.props.items.forEach((item) => {
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
  toLink = (address) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.navigate(address)
    this.props.toggleModal()
  }

  render() {
    const itemsQuantity = this.props.items.length;
    return (
      <Wrapper>
        <Content onMouseLeave={() => this.props.toggleModal()}>
          <TitleWrapper>
            <Title>My bag,</Title>
            <ItemsTitle>{itemsQuantity} {itemsQuantity === 1 ? 'item' : 'items'}</ItemsTitle>
          </TitleWrapper>
          <PropertiesWrapper>
            {this.props.items.map((item) => (
              <ProductModal productProperties={item} key={item.id} />
            ))}
          </PropertiesWrapper>
          <Total>
            <TotalTitle>total</TotalTitle>
            <TotalPrice>
              {this.state.currencySymbol}{' '}
              {Math.trunc(this.state.totalCost).toFixed(2)}
            </TotalPrice>
          </Total>
          <ButonsWrapper>
            <Button primary="true" onClick={this.toLink(`/cart`)}>
              VIEW BAG
            </Button>
            <Button onClick={this.toLink(`/`)}>CHECK OUT</Button>
          </ButonsWrapper>
        </Content>
      </Wrapper>
    );
  }
}

export default withParams(Modal);