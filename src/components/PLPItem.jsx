import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import cartIcon from '../assets/icons/cart_green.png'

import { addItem } from '../store/cartSlice'
import { uniqueCartId } from '../utils/uniqueCartId'
import withHooks from '../hoc/withHooks'
import { setInitialProperties } from '../utils/setInitialProperties'

const ItemCart = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;
  background-image: url(${cartIcon});
  top: 320px;
  left: 60%;
  flex: 1 1 auto;
`

const ProductItem = styled.div`
  min-width: 386px;
  min-height: 444px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 16px;
  flex: 0 1 auto;
  cursor: pointer;
  opacity: ${(props) => (props.inStock ? '1' : '.5')};
  &:hover ${ItemCart} {
    display: flex;
  }
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
`

const ProductImageWrapper = styled.div`
  height: 330px;
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
`

const ProductImage = styled.img`
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const ProductOutOfStock = styled.div`
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  color: #8d8f9a;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProductFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`
const ProductInfo = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  margin-bottom: 20px;
`

const ProductPrice = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 10px;
`

const mapStateToProps = (state) => ({
  currentCurrencyIndex: state.currencies.currentCurrency,
})
class PLPItem extends Component {
  componentDidMount() {
    const { attributes } = this.props.product
    if (attributes) {
      this.setState((prevState) => ({
        ...prevState,
        quantity: 1,
        currentProperty: setInitialProperties(attributes),
      }))
    }
  }

  componentDidCatch(error, info) {
    console.log(error, info)
  }

  addToCart = (item) => (e) => {
    e.stopPropagation()
    const cartId = uniqueCartId(item.id, item.currentProperty)
    if (item.cartId !== cartId) {
      item.cartId = cartId
    }
    return this.props.dispatch(addItem(item))
  }
  getProduct = (address) => {
    this.props.navigate(address)
  }

  render() {
    const { id, name, gallery, brand, inStock, prices, attributes } =
      this.props.product
    const index = this.props.currentCurrencyIndex
    return (
      <ProductItem
        key={id}
        onClick={() => this.getProduct(`/products/${id}`)}
        inStock={inStock}
      >
        <ProductImageWrapper>
          <ProductImage src={gallery[0]} />
          {!inStock && <ProductOutOfStock>OUT OF STOCK</ProductOutOfStock>}
        </ProductImageWrapper>
        <ProductFooter>
          <ProductInfo>
            {brand} {name}
          </ProductInfo>
          <ProductPrice>
            {prices[index].currency.symbol}
            {Math.trunc(prices[index].amount).toFixed(2)}
          </ProductPrice>
        </ProductFooter>
        {inStock && (
          <ItemCart
            onClick={this.addToCart({
              id,
              gallery,
              prices,
              brand,
              name,
              attributes,
              ...this.state,
            })}
          />
        )}
      </ProductItem>
    )
  }
}

export default withHooks(connect(mapStateToProps)(PLPItem))
