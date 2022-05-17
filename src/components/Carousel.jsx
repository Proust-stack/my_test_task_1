import React, { Component } from 'react';
import styled from 'styled-components';

import leftArrowIcon from '../assets/icons/carousel/chevron-left.png';
import rightArrowIcon from '../assets/icons/carousel/chevron-right.png';

const ContentWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
`;
const Content = styled.div`
  display: flex;
  transition: all 250ms linear;
  -ms-overflow-style: none; /* hide scrollbar in IE and Edge */
  scrollbar-width: none;
  transform: ${props => `translateX(-${props.currentIndex * 100}%)`};
`;


const RightArrow = styled.div`
  position: absolute;
  bottom: 10px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  right: 10px;
  background: url('${(props) => props.img}') center / cover no-repeat;
  background-color: rgba(0, 0, 0, 0.73);
`;
const LeftArrow = styled(RightArrow)`
  transform: rotateY('180%');
  right: 32px;
  margin-right: 8px;
`;


export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
  }
  componentDidMount () {
      this.setState({
        length: this.props.children.length
    });
  }

  componentDidCatch(error) {
    console.log(error.message);
  }
  
  next = (e) => {
    e.stopPropagation();
    if (this.state.currentIndex < (this.state.length - 1)) {
        this.setState({currentIndex: this.state.currentIndex + 1})
    }
}

  prev = (e) => {
    e.stopPropagation();
    if (this.state.currentIndex > 0) {
      this.setState({currentIndex: this.state.currentIndex - 1})
    }
}
  render() {
    return (
      <ContentWrapper>
        <Content currentIndex={this.state.currentIndex}>
          {this.props.children}
        </Content>
        {this.props.children.length > 1 ? 
        (<>
        <LeftArrow img={leftArrowIcon} onClick={this.prev}></LeftArrow>
        <RightArrow
          img={rightArrowIcon}
          onClick={this.next}
        ></RightArrow>
        </>) : null
        }
      </ContentWrapper>
    );
  }
}
