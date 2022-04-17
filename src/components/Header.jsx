import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

import myImage from '../assets/icons/header/Brand_icon.png';
import emptyCart from '../assets/icons/header/svg/Vector.svg';

const Nav = styled.nav`
  background: #fff;
  padding: 17px 0;
  height: 6vh;
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

const NavUnlisted = styled.ul`
  text-decoration: none;
  li {
    margin: 0 0.8rem;
    font-size: 1.3rem;
    position: relative;
    list-style: none;
  }

  .current {
    li {
      border-bottom: 2px solid green;
    }
  }
`;
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  margin: 1rem;
  border: none;
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
class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {data: {categories}} = this.props
    return (
      <Nav>
        <NavbarItem>
          <LeftPart>
            <NavUnlisted>
              {
                categories && categories.map(({name}) => {
                  return (
                    <StyledLink key={name} to={`/${name}`}>{name}</StyledLink>
                  )
                })
              }
              
            </NavUnlisted>
          </LeftPart>
          <ItemIconCompany />
          <RightPart>
            <ItemIconCurr>$</ItemIconCurr>
          <ItemIconVector>&#65088;</ItemIconVector>
          <ItemIconCart />
          </RightPart>
        </NavbarItem>
      </Nav>
    );
  }
}


const withHeaderQuery = graphql(gql`
query getCategoriesNames {
  categories {
    name
  }
}
`);
const HeaderWithData = withHeaderQuery(Header);
export default HeaderWithData;
