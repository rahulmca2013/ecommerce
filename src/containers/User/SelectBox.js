import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
//import classes from './Auth.css';
import * as actions from "../../store/actions/index";
import Spinner from "../../components/Spinner/Spinner";
import { updateObject, checkValidity } from "../../shared/utility";


class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { value: 'select'};
  }
  onChange(e) {
    this.setState({
      value: e.target.value
    })
  }
  render() {
    return (
      <div className="form-group">
        <label htmlFor="select1" >Select1</label>
        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
          <option value="select">Select an Option</option>
          <option value="First">First</option>
          <option value="Second">Second</option>
          <option value="Third">Third</option>
        </select>
      </div>
    )
  }
}

// a select with dynamically created options
const options = ["Select an Option", "First Option", "Second Option", "Third Option"]





