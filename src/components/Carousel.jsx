import React, { Component } from 'react';
import styled from 'styled-components';
import leftArrowIcon from '../assets/icons/carousel/chevron-left.png';
import rightArrowIcon from '../assets/icons/carousel/chevron-right.png';

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;
const Content = styled.div`
  display: flex;
  transition: all 250ms linear;
  -ms-overflow-style: none; /* hide scrollbar in IE and Edge */
  scrollbar-width: none; /* hide scrollbar in Firefox */
`;
const LeftArrow = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  left: 24px;
  background: url('${(props) => props.img}') center / cover no-repeat;
`;
const RightArrow = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  right: 24px;
  background: url('${(props) => props.img}') center / cover no-repeat;
`;

const SCarouselSlide = styled.div`
  flex: 0 0 auto;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: all 0.5s ease;
  width: 100%;
`;

const SCarouselSlides = styled.div`
  display: flex;
  ${(props) =>
    props.currentSlide &&
    `
          transform: translateX(-${props.currentSlide * 100}%);
        `};
  transition: all 0.5s ease;
`;


export default class Carousel extends Component {
  state = {
    currentSlide: 0
  };

  activeSlide = this.props.children.map((slide, index) => (
    <SCarouselSlide active={this.state.currentSlide === index} key={index}>
      {slide}
    </SCarouselSlide>
  ));

  next = () => {
      this.setState({ currentSlide:  (this.state.currentSlide + 1) % this.activeSlide.length });
  };

  prev = () => {
      this.setState({ currentSlide: (this.state.currentSlide - 1 + this.activeSlide.length) % this.activeSlide.length });
  };
  render() {
    console.log(this.props.children);
    
    return (
      <>
          <LeftArrow
            img={leftArrowIcon}
            onClick={() => this.next()}
          ></LeftArrow>
          <RightArrow
            img={rightArrowIcon}
            onClick={() => this.prev()}
          ></RightArrow>
        <Content>
          <SCarouselSlides currentSlide={this.state.currentSlide}>
            {this.activeSlide}
          </SCarouselSlides>
        </Content>
      </>
    );
  }
}
