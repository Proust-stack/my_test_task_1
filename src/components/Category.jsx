import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #EEF5FF;
  min-height: 94vh;
  height: 100%;
`
const PostsWrapper = styled.div`
  display: grid;
  flex-wrap: wrap;
  gap: 30px 50px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 50px;
  width: 1110px;
`
const PostItem = styled.div`
  width: 350px;
  height: 270px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: .3s all ease;
  :hover {
    transform: scale(1.1);
  }
`
const PostImage = styled.a`
  width: 350px;
  height: 220px;
  background: url('${props => props.img}') center / cover no-repeat;
  border-radius: 20px 20px 0 0;
`
const PostFooter = styled.div`
  background: #FEFEFE;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 20px 20px;
  `
const PostTitle = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #3260A1;
`

const posts = [{id: 2, title: 'dfdsssf'}, {id: 3, title: 'dfd333f'}, {id: 4, title: 'dfd6656f'}, ]

export default class Category extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
  }
  render() {
    return (
      <Wrapper>
          <PostsWrapper>
            {
              posts.map((post) => {
                  return (
                      <PostItem key={post.title}>
                        <PostImage img={post.imgUrl}/>
                        <PostFooter>
                          <PostTitle>{post.title}</PostTitle>
                        </PostFooter>
                    </PostItem> 
                  )
              })
            }
          </PostsWrapper>
      </Wrapper>
    )
  }
}
