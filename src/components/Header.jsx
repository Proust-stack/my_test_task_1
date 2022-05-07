import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import myImage from '../assets/icons/header/Brand_icon.png';
import cartIcon from '../assets/icons/header/svg/header_cart.svg';
import { useParams, useNavigate } from "react-router-dom";
import CustomSelect from './CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesNames } from '../store/categorySlice';

const Nav = styled.nav`
  background: #fff;
  padding: 17px 20px;
  min-height: 80px;
`;
const NavbarItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LeftPart = styled.div`
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  margin-right: 16px;
  padding: 10px;
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
`;

const RightPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ItemIconCart = styled.div`
  background-image: url(${cartIcon});
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: relative;
`;
const Badge = styled.div`
  position: absolute;
  border-radius: 100%;
  width: 15px;
  height: 15px;
  top: -5px;
  left: 10px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  font-size: 10px;
`;

function withParams(Component) {
  return props => <Component 
  {...props} 
  params={useParams()} 
  dispatch={useDispatch()}
  categories={useSelector(state => state.category.categoriesNames)}
  items={useSelector(state => state.cart.items)}
  navigate={useNavigate()}
  />;
}
class Header extends Component {

  componentDidMount = () => {
    this.props.dispatch(fetchCategoriesNames())
}

componentDidUpdate(prevProps) {
  if (this.props.categories !== prevProps.categories) {
    this.props.navigate('/categories/all')
  }
}

componentDidCatch(error) {
  console.log(error.message);
}
  render() {
    return (
      <Nav>
        <NavbarItem>
          <LeftPart>
            {Array.from(this.props.categories).map(({ name }) => {
              return (
                <StyledLink key={name} to={`categories/${name}`}>
                  {name}
                </StyledLink>
              );
            })}
          </LeftPart>
          <ItemIconCompany />
          <RightPart>
            <CustomSelect />
            <ItemIconCart onMouseEnter={() => this.props.toggleModal()}>
              <Badge>{this.props.items.length}</Badge>
            </ItemIconCart>
          </RightPart>
        </NavbarItem>
      </Nav>
    );
  }
}

export default withParams(Header);

