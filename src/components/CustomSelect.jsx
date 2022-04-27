import React, { Component } from 'react';
import styled from 'styled-components';
import { GET_CURRENCIES } from '../utils/graphQLqueries';
import { client } from '../index';
import arrowDown from '../assets/icons/header/svg/options.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencies } from '../store/currencySlice';

const DropDownContainer = styled('div')``;

const DropDownHeader = styled('div')`
  padding: 0.4em 2em 0.4em 1em;
  font-weight: 500;
  font-size: 18px;
  margin-right: 20px;
  position: relative;
  cursor: pointer;
  &::after {
    width: 10px;
    height: 6px;
    background: url('${(props) => props.img}') center / cover no-repeat;
    position: absolute;
    right: 10px;
    bottom: 50%;
    transform: ${(props) =>
      props.isOpen ? 'translateY(50%) rotate(180deg)' : 'translateY(50%)'};
    content: '';
    display: block;
    transition: 0.2s ease-in;
  }
`;

const DropDownListContainer = styled('div')`
  position: absolute;
  width: 114px;
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
`;

const DropDownList = styled('ul')`
  padding-left: 1em;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled('li')`
  list-style: none;
  margin-bottom: 0.8em;
  cursor: pointer;
`;

function withParams(Component) {
  return props => <Component 
  {...props}  
  dispatch={useDispatch()}
  currencies={useSelector(state => state.currencies)}
  />;
}

class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currentCurrency: 0,
    };
  }

  componentDidMount = async () => {
    this.props.dispatch(fetchCurrencies())
    const response = await client.query({
      query: GET_CURRENCIES,
    });
    const { currencies } = await response.data;
    this.setState({
      currencies: currencies,
    });
  };
  toggling = () =>
    this.setState({
      isOpen: !this.state.isOpen,
    });

  onOptionClicked = (value) => (e) => {
    e.stopPropagation();
    this.setState({
      currentCurrency: value,
    });
    this.toggling();
  };

  render() {
    if (!this.state?.currencies) return <p>loading...</p>;
    return (
      <DropDownContainer>
        <DropDownHeader
          onClick={this.toggling}
          img={arrowDown}
          isOpen={this.state.isOpen}
        >
          {this.state.currentCurrency.symbol}
        </DropDownHeader>
        {this.state.isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {this.state.currencies &&
                Array.from(this.state.currencies).map(
                  ({ label, symbol }) => {
                    return (
                      <ListItem
                        key={symbol}
                        onClick={this.onOptionClicked({ label, symbol })}
                      >
                        {symbol} {label}
                      </ListItem>
                    );
                  }
                )}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    );
  }
}

export default withParams(CustomSelect);