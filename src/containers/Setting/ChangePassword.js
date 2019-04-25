import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import * as actions from "../../store/actions/index";
import axios from "axios";
import {Editor} from 'primereact/editor';
import { updateObject, checkValidity } from "../../shared/utility";
import {Dropdown} from 'primereact/dropdown';
import PlacesAutocomplete from 'react-places-autocomplete';
import "./setting.css";
import {
geocodeByAddress,
        geocodeByPlaceId,
        getLatLng,
} from 'react-places-autocomplete';


class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestStatus: false,
            hasError: false,
            errorMessage: "",
            disabled : false,
            PasswordForm: {
                oldPassword: {
                    type: "password",
                    value: "",
                    validation: {
                        required: true,
                    },
                    title: 'Old Password',
                    valid: false,
                    touched: false
                },
                newPassword: {
                    type: "password",
                    value: "",
                    title: 'New Password',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                confirmPassword: {
                    type: "password",
                    value: "",
                    title: 'Confirm Password',
                    validation: {
                        required: true
                    },
                    valid: false,
                    Placeholder: "",
                    touched: false
                },
                id: {
                    type: "hidden",
                    value: localStorage.getItem('userId'),
                    title: '',

                    Placeholder: "",
                    touched: false
                },
            },
            message: ""
        };

    }

    inputChangedHandler = (event, controlName) => {
        const targetValue = event.target.value;//(controlName === 'groupStatus') ? event.target.value : event.value;

        const updatedControls = updateObject(this.state.PasswordForm, {
            [controlName]: updateObject(this.state.PasswordForm[controlName], {
                value: targetValue,
                valid: checkValidity(
                        targetValue,
                        this.state.PasswordForm[controlName].validation
                        ),
                touched: true
            })
        });
        this.setState({PasswordForm: updatedControls});
    };
            handleSubmit = event => {

                event.preventDefault();
                let isValid = true;
                const passwordForm = {
                    ...this.state.PasswordForm
                };
                let formData = {};
                for (let key in passwordForm) {

                    isValid = checkValidity(
                            passwordForm[key].value,
                            passwordForm[key].validation
                            ) && isValid;
                    //alert(key +"--" +  passwordForm[key].value + " : valid =" + isValid);
                }
                //alert('FORM STT:', isValid)
                if (isValid) {
                    if (passwordForm['newPassword'].value != passwordForm['confirmPassword'].value) {
                        setTimeout(() => {
                            this.messages.show({
                                severity: "error",
                                summary: "Confirm password and New password should be same. ",
                                detail: ""
                            });

                        }, 1000)
                    } 
                    else if (passwordForm['newPassword'].value == passwordForm['oldPassword'].value) {
                        setTimeout(() => {
                            this.messages.show({
                                severity: "error",
                                summary: "You have entered same Old password and New password in the field. ",
                                detail: ""
                            });

                        }, 1000)
                    }
            
                    else {
                        for (let key in passwordForm) {
                            formData[key] = passwordForm[key].value;
                        }
                        this.props.passwordReset(formData);
                        setTimeout(() => {

                            if (this.props.success) {
                                this.messages.show({
                                    severity: "success",
                                    summary: "Success Message",
                                    detail: "Password has been changed successfully."
                                });

                                document.getElementById('password-reset').reset();

                                const passwordForm = {...this.state.PasswordForm};
                                for (let key in passwordForm) {
                                    console.log(passwordForm[key]);
                                    const activeElement = {...passwordForm[key]};
                                    if (key === 'oldPassword' || key === 'newPassword' || key === 'confirmPassword') {
                                        activeElement.value = '';
                                        passwordForm[key] = activeElement;
                                    }
                                }
                                this.setState({PasswordForm: passwordForm});


                            }
                            if (this.props.error) {
                                this.messages.show({
                                    severity: "error",
                                    summary: "Some thing went wrong..",
                                    detail: ""
                                });
                            }
                        }, 1000);
                    }
                } else {
                    this.setState({disabled:true});
                    
                    this.setState({hasError: true}, () => {
                        this.messages.show({
                            severity: "error",
                            summary: "Please fill all required field.",
                            detail: ""
                        });
                    });
                    
                    setTimeout(() => {
                        this.setState({disabled: false});
                        }, 3000);
                    
                }
            }
    ;
            render() {



        const formElementsArray = [];
        for (let key in this.state.PasswordForm) {

            formElementsArray.push({
                id: key,
                config: this.state.PasswordForm[key]
            });
        }
        let passwordForm = null;

        passwordForm = formElementsArray.map(formElement => {
            return (
                    <div className="p-col-12" key={formElement.id}>
                    
                        <label htmlFor={formElement.id}>{formElement.config.title}</label>
                    
                        <InputText 
                            defaultValue={formElement.config.value}
                            type={formElement.config.type}
                            onBlur={event => this.inputChangedHandler(event, formElement.id)}/>
                    </div>
                    );


        });



        let errorBox = <Messages ref={el => (this.messages = el)} />;
        return (
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-lg-12 p-md-12">
                        <div className="card card-w-title">
                            <h1>Change Password </h1>
                            <form className="p-grid" id="password-reset" onSubmit={this.handleSubmit}>
                                <div className="p-col-12 p-md-12">{errorBox}</div>
                                {passwordForm}
                                <div className="p-col-12 submit_button">
                                    <Button disabled={this.state.disabled} label="Submit" />
                
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
        success: state.resetPasswordReducer.success,
        error: state.resetPasswordReducer.error,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        passwordReset: (data) => dispatch(actions.updatePassword(data))
    };
};
export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(ChangePassword);
