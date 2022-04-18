import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
query getProduct {
  product(id: "huarache-x-stussy-le") {
    id
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        label
        symbol
      }
      amount
    }
    brand
  }
}
`
