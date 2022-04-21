import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../index';
import styled from 'styled-components';
import ProductWithData from '../components/ProductItem';
import { GET_CATEGORY } from '../utils/graphQLqueries';
import { useParams } from "react-router-dom";
import Modal from '../components/Modal';


const Wrapper = styled.main`
`;
const ItemsWrapper = styled.main`
  display: grid;
  flex-wrap: wrap;
  gap: 40px 119px;
  grid-template-columns: repeat(auto-fit, minmax(386px, 1fr));
  margin-top: 50px;
`;

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}
class MainWithData extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }
  componentDidMount = async () => {
    const response = await client.query({
      query:GET_CATEGORY
    })
    const { category } = await response.data;
      this.setState({
        modalOpened: true,
        category: category.products
    });
}
  toggleModal() {
    this.setState(prevState => ({ modalOpened: !prevState.modalOpened }));
  }

  render() {
    if (!this.state) return <p>loading...</p>
    console.log(this.props);
    return (
      <>
        
        <ItemsWrapper>
          {this.state.category && this.state.category.map((post) => {
            return (
              <ProductWithData post={post} key={post.id}/>
            );
          })}
        </ItemsWrapper>
        {this.state.modalOpened && <Modal />}
      </>
    );
  }
}

export default withParams(MainWithData);
