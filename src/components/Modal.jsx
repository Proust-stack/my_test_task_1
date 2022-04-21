import React, { Component } from 'react';
import styled from 'styled-components';
import { client } from '../index';
import { GET_PRODUCT } from '../utils/graphQLqueries';
import ProductModal from './ProductModal';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 325px;
  height: 540px;
  background: white;
  top: 20px;
  right: 30px;
  position: absolute;
  padding: 16px;
`;

const Title = styled.div`
  height: 40px;
  line-height: 16px;
  color: #1d1f22;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  text-align: left;
`;
const Total = styled.div`
  height: 40px;
  font-weight: 700;
  text-transform: uppercase;
  color: #1d1f22;
  display: flex;
  justify-content: space-between;
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
`;

const ButonsWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: ${(props) => (props.primary ? 'palevioletred' : 'white')};
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #ffffff;
  text-transform: uppercase;
  margin-bottom: 40px;
  border: ${(props) => (props.primary ? 'none' : 'black')};
`;

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }
  componentDidMount = async () => {
    const response = await client.query({
      query: GET_PRODUCT,
    });
    const { product } = await response.data;
    this.setState({
      productProperties: {
        imageBig: product.gallery[0],
        imagesSmall: product.gallery.slice(1),
        brand: product.brand,
        name: product.name,
        sizes: product.attributes[0].items,
        prices: product.prices,
        description: product.description,
      },
    });
  };
  render() {
    if (!this.state) return <p>loading...</p>;
    console.log(this.props);
    return (
      <Wrapper id="popup">
        <Content>
          <Title>title</Title>
          <ProductModal productProperties={this.state.productProperties} />
          <Total>
            <TotalTitle>total</TotalTitle>
            <TotalPrice>$</TotalPrice>
          </Total>
          <ButonsWrapper>
            <Button primary>VIEW BAG</Button>
            <Button>CHECK OUT</Button>
          </ButonsWrapper>
        </Content>
      </Wrapper>
    );
  }
}
