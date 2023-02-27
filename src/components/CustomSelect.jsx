import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import arrowDown from '../assets/icons/header/svg/options.svg'
import { changeCurrency } from '../store/currencySlice'

const DropDownContainer = styled('div')``

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
`

const DropDownListContainer = styled('div')`
  position: absolute;
  width: 114px;
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
`

const DropDownList = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  &:first-child {
    padding-top: 14px;
  }
  &:last-child {
    margin-bottom: 0;
  }
`

const ListItem = styled('div')`
  padding: 10px 0 10px 0;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
`

class CustomSelect extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  componentDidCatch(error) {
    console.log(error.message)
  }

  toggling = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  closeDropDownFromOuter = (e) => {
    this.setState({
      isOpen: false,
    })
  }

  onOpenDropDown = (e) => {
    e.stopPropagation()
    this.toggling()
  }

  onOptionClicked = (index) => (e) => {
    e.stopPropagation()
    this.toggling()
    this.props.dispatch(changeCurrency({ index }))
  }

  componentDidMount() {
    document.addEventListener('click', this.closeDropDownFromOuter)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeDropDownFromOuter)
  }

  render() {
    const { currencies, currentCurrency } = this.props.currencies
    return (
      <DropDownContainer>
        <DropDownHeader
          onClick={this.onOpenDropDown}
          img={arrowDown}
          isOpen={this.state.isOpen}
        >
          {currencies.length > 0 ? currencies[currentCurrency].symbol : null}
        </DropDownHeader>
        {this.state.isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {currencies &&
                currencies.map((item, index) => {
                  return (
                    <ListItem
                      key={item.symbol}
                      onClick={this.onOptionClicked(index)}
                    >
                      {item.symbol} {item.label}
                    </ListItem>
                  )
                })}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    )
  }
}

export default connect(null, null)(CustomSelect)
