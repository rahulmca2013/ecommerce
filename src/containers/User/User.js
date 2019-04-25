import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import * as actions from "../../store/actions/index";
import axios from "axios";
import { updateObject, checkValidity } from "../../shared/utility";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
      ForgotPasswordForm: {
        email: {
          type: "email",
          value: "",
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        }
      },
      message: ""
    };
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.ForgotPasswordForm, {
      [controlName]: updateObject(this.state.ForgotPasswordForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.ForgotPasswordForm[controlName].validation
        ),
        touched: true
      })
    });

    this.setState({ ForgotPasswordForm: updatedControls });
  };

  handleSubmit = event => {
    event.preventDefault();
    let isValid = false;
    const forgotPasswordForm = {
      ...this.state.ForgotPasswordForm
    };
    for (let key in forgotPasswordForm) {
      if (forgotPasswordForm[key].valid)
        isValid = forgotPasswordForm[key].valid;
    }
    if (isValid) {
      this.props.onEmailSubmit(this.state.ForgotPasswordForm.email.value);
    } else {
      this.setState({ hasError: true }, () => {
        this.messages.show({
          severity: "error",
          summary: "Invalid Email",
          detail: "Validation failed"
        });
      });
    }
  };

  render() {
    let errorBox = <Messages ref={el => (this.messages = el)} />;
    return (
      <div className="p-grid p-fluid">
        <div className="p-col-12 p-lg-12 p-md-12">
          <div className="card card-w-title">
            <h1>Forgot Password</h1>
            <form className="p-grid" onSubmit={this.handleSubmit}>
              <div className="p-col-12 p-md-12">{errorBox}</div>
              <div className="p-col-12">
                <label htmlFor="acUsername">Email</label>
                <InputText
                  value={this.state.ForgotPasswordForm.email.value}
                  onChange={event => this.inputChangedHandler(event, "email")}
                  keyfilter="email"
                />
              </div>
              <div className="p-col-12">
                <Button label="Submit" />
                <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => {
  return {
    onEmailSubmit: email => dispatch(actions.forgotPassword(email))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
