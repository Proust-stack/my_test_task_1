import React, { Component } from 'react';
import styled from 'styled-components';
import ProductWithData from '../components/ProductItem';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../store/categorySlice';


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
  return props => <Component 
  {...props} 
  params={useParams()} 
  category={useSelector(state => state.category)}
  dispatch={useDispatch()}
  />;
}
class MainWithData extends Component {
  update = () => {
    this.props.dispatch(fetchCategory(this.props.params.categoryId))
  };
  componentDidMount()  {
    this.update()
  };

  componentDidUpdate(prevProps) {
    if (this.props.params.categoryId !== prevProps.params.categoryId) this.update();
  }

  componentDidCatch(error) {console.log(error)}
  render() {
    const {category, error, loading} = this.props.category
    if (loading) return <p>loading...</p>;
    if (error) return <p>error...</p>;
    return (
      <Wrapper>
        <Title>{this.props.params.category}</Title>
        <ItemsWrapper>
          {category.products &&
            category.products.map((category) => {
              return <ProductWithData category={category} key={category.id} />;
            })}
        </ItemsWrapper>
      </Wrapper>
    );
  }
}

export default withParams(MainWithData);
