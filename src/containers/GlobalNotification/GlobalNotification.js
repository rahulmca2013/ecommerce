import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import * as actions from "../../store/actions/index";
import axios from "axios";
import { updateObject, checkValidity } from "../../shared/utility";
import "./notification.css";

class GlobalNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            hasError: false,
            errorMessage: "",
            GlobalNotificationForm: {
                notification_text: {
                    type: "texarea",
                    value: "",
                    validation: {
                        required: true,

                    },
                    valid: false,
                    touched: false
                }
            },
            message: ""
        };
        this.props.setInitials();
    }

    componentWillReceiveProps = function (nextProps) {
        if (nextProps.success === true || nextProps.error === true) {
            this.setState({disabled: false})
        }
    }
    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.GlobalNotificationForm, {
            [controlName]: updateObject(this.state.GlobalNotificationForm[controlName], {
                value: event.target.value,
                valid: checkValidity(
                        event.target.value,
                        this.state.GlobalNotificationForm[controlName].validation
                        ),
                touched: true
            })
        });

        this.setState({GlobalNotificationForm: updatedControls});
    };
            handleSubmit = event => {
                event.preventDefault();
                let isValid = false;
                let formData = {};
                const globalNotificationForm = {
                    ...this.state.GlobalNotificationForm
                };
                for (let key in globalNotificationForm) {
                    //alert(globalNotificationForm[key].value)
                    if (globalNotificationForm[key].valid)
                        isValid = globalNotificationForm[key].valid;
                }
                if (isValid) {
                    for (let key in globalNotificationForm) {
                        formData[key] = globalNotificationForm[key].value;
                    }
                    this.props.notificationSent(formData);
                    this.setState({disabled: true});
                    /*setTimeout(() => {
                     console.log(this.props.success);  
                     if(this.props.success){
                     this.messages.show({
                     severity: "success",
                     summary: "Success Message",
                     detail: "Notification has been sent successfully."
                     });
                     }
                     if(this.props.error){
                     this.messages.show({
                     severity: "error",
                     summary: "Error",
                     detail: "Some thing Went Wrong."
                     });
                     }
                     }, 1000);*/
                } else {
                    this.setState({disabled: true});
                    this.setState({hasError: true}, () => {
                        
                        this.messages.show({
                            severity: "error",
                            summary: "Please enter the value.",
                            detail: "Validation failed"
                        });
                    });
                    setTimeout(() => {
                        this.setState({disabled: false});
                        }, 3000);
                    
                }
            };
            showMsg = (type, msg) => {
        if (this.messages) {

            this.messages.show({
                severity: type,
                summary: "",
                detail: msg
            });
        }
    };
            render() {
        if (this.props.success) {

            this.showMsg("success", "Notification has been sent successfully.");
            setTimeout(() => {
                this.props.setInitials();
            }, 2000);

        }
        if (this.props.error) {

            this.showMsg("error", "Some thing Went Wrong.");
        }
        let errorBox = <Messages ref={el => (this.messages = el)} />;
        return (
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-lg-12 p-md-12">
                        <div className="card card-w-title">
                            <h1>Global Notification</h1>
                            <form className="p-grid" onSubmit={this.handleSubmit}>
                                <div className="p-col-12 p-md-12">{errorBox}</div>
                                <div className="p-col-12">
                                    <label htmlFor="acUsername"></label>
                                    <textarea className="gloabl-textarea" 
                                              value={this.state.GlobalNotificationForm.value}
                                              onChange={event => this.inputChangedHandler(event, "notification_text")}
                
                                              />
                                </div>
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
        success: state.globalNotificationReducer.success,
        error: state.globalNotificationReducer.error,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        notificationSent: (data) => dispatch(actions.sentNotification(data)),
        setInitials: () => {
            return dispatch(actions.notificationinitializeState());
        },
    };
};
export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(GlobalNotification);
