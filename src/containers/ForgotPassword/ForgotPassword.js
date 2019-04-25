import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import * as actions from "../../store/actions/index";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            redirectState: false,
            errorMessage: "",
            disabled:false,
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
        this.props.setInitials();
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

        this.setState({ForgotPasswordForm: updatedControls});
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
                    this.setState({disabled:true});
                    this.setState({hasError: true}, () => {
                        this.messages.show({
                            severity: "error",
                            summary: "Invalid Email",
                            detail: "Validation failed"
                        });
                    });
                    setTimeout(() => {
                        this.setState({disabled: false});
                        }, 3000);
                }
            }
    ;
    
    showMsg = (type, msg) => {
        if(this.messages){
            this.messages.show({
              severity: type,
              summary: "",
              detail: msg
          });
      }
    };
    
            render() {
            
                console.log('In render', this.props)
                if (this.props.success) {
                    console.log("loginnnnn");
                    this.showMsg("success", "New Password Sent Your Email Id.");
            
            setTimeout(() => {
               this.setState({redirectState: true});
            }, 2000);
        }
        if (this.props.error) {
//            this.messages.show({
//                severity: "error",
//                summary: "Error",
//                detail: "Some thing Went Wrong."
//            });
            this.showMsg("error", "Some thing Went Wrong.");
        }
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
                                    <Button disabled = {this.state.disabled}label="Submit" />
                                    <Link to="/admin/login">Login</Link>
                                    {this.state.redirectState ? <Redirect to="/admin/login" /> : null}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                );
    }
}


const mapStateToProps = state => {
    return {
        success: state.forgotPassword.success,
        error: state.forgotPassword.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onEmailSubmit: email => dispatch(actions.forgotPassword(email)),
        setInitials: () => {
            return dispatch(actions.initializeState());},
    };
};
export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(ForgotPassword);



/*import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import * as actions from "../../store/actions/index";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            redirectState: false,
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

        this.setState({ForgotPasswordForm: updatedControls});
    }
    ;
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
                  
            setTimeout(() => {
                console.log(this.props.success);   
                        if (this.props.success===false) {
                           //alert("submit")
                            
                            this.messages.show({

                                severity: "success",
                                summary: "",
                                detail: "New Password Sent Your Email Id."
                            });
                            setTimeout(() => {
                                this.setState({redirectState: true});
                                //this.props.history.push("/login");
                            }, 3000);
                        }
                        if (this.props.error) {
                            this.messages.show({
                                severity: "error",
                                summary: "Error",
                                detail: "Some thing Went Wrong."
                            });
                        }
                    }, 1000);
                } else {
                    this.setState({hasError: true}, () => {
                        this.messages.show({
                            severity: "error",
                            summary: "Invalid Email",
                            detail: "Validation failed"
                        });
                    });
                }
            }
    ;
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
                                    <Link to="/admin/login">Login</Link>
                                    {this.state.redirectState?<Redirect to="/admin/login" />:null}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                );
    }
}


const mapStateToProps = state => {
    return {
        success: state.forgotPassword.success,
        error: state.forgotPassword.error,

    };
}





const mapDispatchToProps = dispatch => {
    return {
        onEmailSubmit: email => dispatch(actions.forgotPassword(email))
    };
};
export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(ForgotPassword);
*/