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
export const GET_CATEGORY = gql`
query getCategory($title: String!) {
  category(input: {
    title: $title
  }) {
  products {
    id, 
    name, 
    inStock, 
    gallery, 
    description, 
    category, 
    attributes {
      id,
      name, 
      type, 
      items {
        displayValue,
        value,
        id
      }
    }, 
    prices {
      currency {
        label,
        symbol
      },
      amount
    }, 
    brand
  }
}
}
`

export const GET_CATEGORY_NAME = gql`
query getCategoriesNames {
  categories {
    name
  }
}
`
export const GET_CURRENCIES = gql`
query getCurrencies {
  currencies {
    label, symbol
  }
}
`
