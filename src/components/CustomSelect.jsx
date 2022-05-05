import React, { Component } from 'react';
import styled from 'styled-components';
import arrowDown from '../assets/icons/header/svg/options.svg';
import { useDispatch, useSelector } from 'react-redux';
import {changeCurrency} from '../store/currencySlice';

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  &:first-child {
    padding-top: 14px;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;


const ListItem = styled('li')`
  list-style: none;
  margin-bottom: 14px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    transform: scale(1.1);
  }
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
    };
  }

  componentDidMount = () => {
  };
  toggling = () =>
    this.setState({
      isOpen: !this.state.isOpen,
    });

  onOptionClicked = (index) => (e) => {
    e.stopPropagation();
    this.toggling();
    this.props.dispatch(changeCurrency({index}))
  };

  render() {
    
    const {currencies, currentCurrency} = this.props.currencies
    return (
      <DropDownContainer>
        <DropDownHeader
          onClick={this.toggling}
          img={arrowDown}
          isOpen={this.state.isOpen}
        >
          {currencies[currentCurrency].symbol}
        </DropDownHeader>
        {this.state.isOpen && (
          <DropDownListContainer onMouseLeave={this.toggling}>
            <DropDownList>
              {currencies &&
                currencies.map(
                  (item, index) => {
                    return (
                      <ListItem
                        key={item.symbol}
                        onClick={this.onOptionClicked(index)}
                      >
                        {item.symbol} {item.label}
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