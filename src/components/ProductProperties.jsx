import React, { Component } from 'react';
import styled from 'styled-components';

const ProductPropertiesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ProductPropertiesWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 20px;
`;
const ProductPropertyTitle = styled.div`
  height: 18px;
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 15px;
`;

const ProductPropertyWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ProductProperty = styled.div`
  cursor: pointer;
  padding: 1px;
  font-family: 'Source Sans Pro';
  display: flex;
  justify-content: center;
  align-items: center;
  width:  ${props => props.type === 'swatch' ? '32px' : '63px'};
  height: ${props => props.type === 'swatch' ? '32px' : '45px'};
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  margin-right: 15px;
  padding: 5px;
  color: ${props => (props.selected ? 'white' : '#1D1F22')};
  background-color:  ${(props) => {
    if (props.selected)  {
      return props.type === 'swatch' ? props.data : 'black'
    } else {
      return props.type === 'swatch' ? props.data : 'white'
    }
  }};
  outline:  ${(props) => {
    if (props.selected)  {
      return props.type === 'swatch' ? '2px solid #5ECE7B' : 'none'
    } 
  }};
  border:   ${(props) => {
    if (props.selected)  {
      return props.type === 'swatch' ? '2px solid white' : '1px solid #A6A6A6'
    } else {
      return props.type === 'swatch' ? 'none' : '1px solid #A6A6A6'
    }
  }};
`;

export default class ProductProperties extends Component {
  
  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    const {attributes, currentProperty, inStock} = this.props
    return (
      <ProductPropertiesContainer>
      { attributes.map((attr) => {
            return (<ProductPropertiesWrapper key={attr.id}>
            <ProductPropertyTitle>{attr.name}:</ProductPropertyTitle>
            <ProductPropertyWrapper>
            {attr.items.map((item) => {
              return <ProductProperty 
              parametresName={attr.name} //name of characteristic (for example "size")
              type={attr.type} 
              key={item.value}
              data={item.value}
              selected={(currentProperty && currentProperty[`${attr.name}`]) === `${item.value}`} // current  choice of this characteristic (for example  size "M")
              onClick={this.props.parameterHandler(attr.name, item, inStock)}
              >
                {attr.type !== 'swatch' && item.value}
                </ProductProperty>; 
            })}
            </ProductPropertyWrapper>
          </ProductPropertiesWrapper>)
          })
          }
      </ProductPropertiesContainer>
    )
  }
}
