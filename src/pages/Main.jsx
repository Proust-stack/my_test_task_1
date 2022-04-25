import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../index';
import styled from 'styled-components';
import ProductWithData from '../components/ProductItem';
import { GET_CATEGORY } from '../utils/graphQLqueries';
import { useParams } from "react-router-dom";


const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 80px;
`;
const ItemsWrapper = styled.main`
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 42px;
  line-height: 1.25;
`;


function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

const fetchData = async (title = 'all') => {
  const response = await client.query({
    query:GET_CATEGORY,
      variables: {
        title
      }
  })
  .catch(error => console.log(error))
  const { category } = await response.data;
  return category
}
class MainWithData extends Component {
  constructor(props) {
    super(props);
    this.state = null
  }

  update = async () => {
    const category = await fetchData(this.props.params.category);
    this.setState({
      category: category.products,
    });
  };
  componentDidMount = async () => {
    const category = await fetchData();
    this.setState({
      category: category.products,
    });
  };
  componentDidUpdate(prevProps) {
    if (this.props.params.category !== prevProps.params.category) this.update();
  }

  render() {
    if (!this.state) return <p>loading...</p>;
    return (
      <Wrapper>
        <Title>{this.props.params.category}</Title>
        <ItemsWrapper>
          {this.state.category &&
            this.state.category.map((category) => {
              return <ProductWithData category={category} key={category.id} />;
            })}
        </ItemsWrapper>
      </Wrapper>
    );
  }
}

export default withParams(MainWithData);
