import React from 'react';
import { NavLink} from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import myImage from '../assets/icons/header/Brand_icon.png';
import cartIcon from '../assets/icons/header/svg/header_cart.svg';

import CustomSelect from './CustomSelect';
import { fetchCategoriesNames } from '../store/categorySlice';
import { fetchCurrencies } from '../store/currencySlice';
import withHooks from '../hoc/withHooks';

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
  padding-bottom: 30px;
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
  line-height: 10px;
  text-align: center;
  top: -5px;
  left: 10px;
  background-color: black;
  color: white;
  padding: 2px;
  font-size: 10px;
`;

const mapStateToProps = (state) => ({
  categories: state.category.categoriesNames,
  currencies: state.currencies,
  items: state.cart.items
});
class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchCurrencies());
    this.props.dispatch(fetchCategoriesNames());
  }

  getTotalQuantity = (items) => {
    const totalQuantity = items.reduce((prev, next) => prev + next.quantity, 0);
    return totalQuantity;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname === '/' ) {
      this.props.navigate('categories/all')
    }
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }
  render() {
    const { items } = this.props;
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
            <CustomSelect currencies={this.props.currencies} />
            <ItemIconCart onMouseEnter={() => this.props.toggleModal()}>
              {this.props.items.length ? (
                <Badge>{this.getTotalQuantity(items)}</Badge>
              ) : null}
            </ItemIconCart>
          </RightPart>
        </NavbarItem>
      </Nav>
    );
  }
}


export default withHooks(connect(mapStateToProps)(Header));

