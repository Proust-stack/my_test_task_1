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
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 43px;
  min-height: 25px;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  margin-right: 15px;
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) => (props.type === 'swatch' ? props.data : '')};
  box-shadow:  ${(props) => (props.selected  ? '0px 4px 15px rgba(168, 172, 176, 0.5)' : '')};
  transform: ${(props) => (props.selected  ? 'scale(1.3)' : '')};
  cursor: pointer;
`;

export default class ProductProperties extends Component {
  render() {
    return (
      <ProductPropertiesContainer>
      { this.props.attributes.map((attr) => {
            return (<ProductPropertiesWrapper key={attr.id}>
            <ProductPropertyTitle>{attr.name}:</ProductPropertyTitle>
            <ProductPropertyWrapper>
            {attr.items.map((item) => {
              return <ProductProperty 
              parametresName={attr.name} //name of characteristic (for example "size")
              type={attr.type} 
              key={item.value}
              data={item.value}
              selected={(this.props.currentProperty && this.props.currentProperty[`${attr.name}`]) === `${item.value}`} // current  choice of this characteristic (for example  size "M")
              onClick={this.props.parameterHandler(attr.name, item)}
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
