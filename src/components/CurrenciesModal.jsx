import React, { Component } from 'react';
import styled from 'styled-components';
import { GET_CURRENCIES } from '../utils/graphQLqueries';
import { client } from '../index';


const SelectWrapper = styled.select`
  margin-right: 22px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  font-size: 18px;
`;
const Option = styled.option`
  display: block;
  font-weight: 500;
  font-size: 18px;
  
  padding: 20px;
  cursor: pointer;
  border: none;
`;


export default class CurrenciesModal extends Component {
    constructor(props) {
        super(props);
        this.state = null;
      }
      componentDidMount = async () => {
        const response = await client.query({
          query:GET_CURRENCIES
        })
        const {currencies} = await response.data;
          this.setState({
            currencies: currencies,
        });
    }
    
  render() {
    if (!this.state) return <p>loading...</p>
    return (
        <SelectWrapper onChange={(e) => this.setState({currIndex: e.target.value})}>
        {
                this.state.currencies && Array.from(this.state.currencies).map(({label, symbol}, index) => {
                  return (
                   <Option
                    key={symbol}
                    value={index}
                    >
                    {symbol}{' '}{label}
                    </Option>
                  )
                })
              }
              </SelectWrapper>
    )
  }
}
