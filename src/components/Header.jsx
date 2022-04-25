import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { client } from '../index';
import myImage from '../assets/icons/header/Brand_icon.png';
import emptyCart from '../assets/icons/header/svg/Vector.svg';
import { GET_CATEGORY_NAME } from '../utils/graphQLqueries';
import { useParams } from "react-router-dom";
import CurrenciesModal from './CurrenciesModal';

const Nav = styled.nav`
  background: #fff;
  padding: 17px 0;
  min-height: 80px;
`;
const NavbarItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LeftPart = styled.div`
  text-decoration: none;
  color: black;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  text-transform: uppercase;
  margin-right: 16px;
  &.active {
    padding-bottom: 30px;
    color: green;
    border-bottom: 2px solid green;
  }
`;

const ItemIconCompany = styled.div`
  background-image: url(${myImage});
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const RightPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 200px;
`;

const ItemIconCurr = styled.div`
  width: 20px;
  height: 20px;
`;
const ItemIconVector = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 22px;
  cursor: pointer;
`;

const ItemIconCart = styled.div`
  background-image: url(${emptyCart});
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }
  componentDidMount = async () => {
    const response = await client.query({
      query:GET_CATEGORY_NAME
    })
    const {categories} = await response.data;
      this.setState({
        categories: categories,
    });
}
  render() {
    if (!this.state) return <p>loading...</p>
    return (
      <Nav>
        <NavbarItem>
          <LeftPart>
              {
                this.state.categories && Array.from(this.state.categories).map(({name}) => {
                  return (
                    <StyledLink 
                    key={name} 
                    to={`/${name}`} 
                    >{name}</StyledLink>
                  )
                })
              }
          </LeftPart>
          <ItemIconCompany />
          <RightPart>
          <CurrenciesModal/>
          <ItemIconCart 
          onMouseEnter={() => this.props.toggleModal('cartModalOpened')}
          >
          </ItemIconCart>
          </RightPart>
        </NavbarItem>
      </Nav>
    );
  }
}

export default withParams(Header);

