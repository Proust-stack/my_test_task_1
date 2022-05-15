import React, { Component } from 'react';
import { Outlet} from "react-router-dom";


export default class ProductPage extends Component {
  componentDidCatch(error, info) {
    this.setState({
      error
    });
    console.log(error, info)
  }
  render() {
    if (this.state?.error) return <p>ups, error occured</p>;
    return <Outlet/>
  }
}

