import React, { Component } from 'react';
import styled from 'styled-components';
import PLPItem from '../components/PLPItem';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../store/categorySlice';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
`;
const ItemsWrapper = styled.main`
  display: flex;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Title = styled.div`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 42px;
  flex: 1 1 auto;
`;

function withParams(Component) {
    return props => <Component 
    {...props} 
    params={useParams()} 
    category={useSelector(state => state.category)}
    dispatch={useDispatch()}
    />;
  }

class PLP extends Component {
    update = () => {
        this.props.dispatch(fetchCategory(this.props.params.categoryId))
      };
      componentDidMount()  {
        this.update()
      };
    
      componentDidUpdate(prevProps) {
        if (this.props.params.categoryId !== prevProps.params.categoryId) this.update();
      }
    
      componentDidCatch(error) {
        this.setState({
          error
        });
        console.log(error)
      }
  render() {
    const {category, error, loading} = this.props.category
    if (this.state?.error) return <p>ups, error occured</p>;
    if (loading) return <p>loading...</p>;
    if (error) return null;
    return (
        <Container>
        <Title>{this.props.params.categoryId}</Title>
        <ItemsWrapper>
          {category.products &&
            category.products.map((product) => {
              return <PLPItem product={product} key={product.id} />;
            })}
        </ItemsWrapper>
      </Container>
    )
  }
}

export default withParams(PLP);
