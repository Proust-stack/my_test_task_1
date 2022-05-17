import React from 'react';
import styled from 'styled-components';
import { connect} from 'react-redux';

import ModalItem from './ModalItem';
import withHooks from '../hoc/withHooks';
import { getTotalCost } from '../utils/getTotalCost';
import { getTotalQuantity } from '../utils/getTotalQuantity';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(57, 55, 72, 0.22);;
  position: fixed;
  top: 80px;
  left: 0;
  overflow-y: hidden;
`;
const Content = styled.div`
  max-height: 677px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  top: 0;
  left: 70%;
  position: absolute;
  z-index: 2;
  padding: 16px;
  overflow-y: auto;
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
  justify-content: center;
  padding: 16px 28px;
  background: ${(props) => (props.primary ? 'white' : '#5ECE7B')};
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => (props.primary ? 'black' : 'white')};
  text-transform: uppercase;
  border: ${(props) => (props.primary ? '1px solid black' : 'none')};
  cursor: pointer;
`;

const mapStateToProps = (state) => ({
  currentCurrencyIndex: state.currencies.currentCurrency,
  currencies: state.currencies.currencies,
  items: state.cart.items
});
class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalCost: 0,
      currencySymbol: '$',
      quantity: 0
    };
  }

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

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  toLink = (address) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.navigate(address);
    this.props.toggleModal();
  };

  getTotalQuantity = (items) => {
    const totalQuantity = items.reduce((prev, next) => prev + next.quantity, 0);
    this.setState(prev => {
      return {...prev, quantity: totalQuantity}
    }
    );
  };

  render() {
    const {quantity} = this.state;
    return (
      <Wrapper>
        <Content onMouseLeave={() => this.props.toggleModal()}>
          <TitleWrapper>
            <Title>My bag,</Title>
            <ItemsTitle>
              {quantity} {quantity === 1 ? 'item' : 'items'}
            </ItemsTitle>
          </TitleWrapper>
          <PropertiesWrapper>
            {this.props.items.map((item) => (
              <ModalItem productProperties={item} key={item.cartId} />
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
            <Button onClick={this.toLink(`/categories/all`)}>CHECK OUT</Button>
          </ButonsWrapper>
        </Content>
      </Wrapper>
    );
  }
}


export default withHooks(connect(mapStateToProps)(Modal));