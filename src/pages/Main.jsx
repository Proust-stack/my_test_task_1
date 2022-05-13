import React, { Component } from 'react';
import { Outlet, Redirect } from "react-router-dom";
export default class Main extends Component {

  componentDidCatch(error) {
    this.setState({
      error
    });
    console.log(error)
  }

  render() {
    if (this.state?.error) return <p>ups, error occured</p>;
    return <Outlet/>
  }
}

