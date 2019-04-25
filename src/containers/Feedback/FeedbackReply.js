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
import "./feedback.css";

class FeedbackReply extends Component {
    constructor(props) {
        super(props);
        //console.log('HERE', this.props);
        this.state = {
            requestStatus: false,
            hasError: false,
            errorMessage: "",
            disabled: false,
            FeedbackForm: {

                email: {
                    type: "text",
                    value: "",
                    title: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                message: {
                    type: "textarea",
                    value: "",
                    title: 'Message',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                }

            },
            message: ""
        };
        this.props.setInitials();
    }

    componentDidMount() {


        if (this.props.match.params.id)
            this.props.getContact(this.props.match.params.id);
        setTimeout(() => {
            let pageData = {...this.state.FeedbackForm};
            for (let contactUs in pageData) {
                pageData[contactUs].value = this.props.contactUs[contactUs];
            }
            this.setState({FeedbackForm: pageData, requestStatus: true}, () => {
                console.log('APPP', this.state.CmsForm);
            });
        }, 1000);
    }

    componentWillReceiveProps = function (nextProps) {

        console.log("propertyReceive");
        if (nextProps.success === true || nextProps.error === true) {
            this.setState({disabled: false})
        }
    }

    inputChangedHandler = (event, controlName) => {
        const targetValue = (controlName === 'message') ? event.htmlValue : event.target.value;
        const updatedControls = updateObject(this.state.FeedbackForm, {
            [controlName]: updateObject(this.state.FeedbackForm[controlName], {
                value: targetValue,
                valid: checkValidity(
                        targetValue,
                        this.state.FeedbackForm[controlName].validation
                        ),
                touched: true
            })
        });

        this.setState({FeedbackForm: updatedControls});
    }
    ;
            handleSubmit = event => {


                event.preventDefault();
                let isValid = true;
                const feedbackForm = {
                    ...this.state.FeedbackForm
                };
                let formData = {};
                for (let key in feedbackForm) {
                    isValid = checkValidity(
                            feedbackForm[key].value,
                            feedbackForm[key].validation
                            ) && isValid;
                    //alert(key +"--" + feedbackForm[key].valid + " : valid =" + isValid);
                }
                //alert('FORM STT:', isValid)
                if (isValid) {
                    for (let key in feedbackForm) {
                        formData[key] = feedbackForm[key].value;
                    }
                    this.props.sendReply(formData);
                    this.setState({'disabled': true})
                    /*setTimeout(() => {
                     if(this.props.success){
                     this.messages.show({
                     severity: "success",
                     summary: "Success Message",
                     detail: "Reply sent successfully."
                     });
                     }
                     if(this.props.error){
                     this.messages.show({
                     severity: "error",
                     summary: "",
                     detail: "Something went wrong"
                     });
                     }
                     
                     }, 1000);*/
                } else {
                    this.setState({disabled: true});

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
            showMsg = (type, msg) => {

        if (this.messages) {

            this.messages.show({
                severity: type,
                summary: "",
                detail: msg
            });
        }
    }
    ;
            render() {

        if (this.props.success) {

            this.showMsg("success", "Reply sent successfully.");
            setTimeout(() => {
                this.props.setInitials();
            }, 2000);

        }
        if (this.props.error) {

            this.showMsg("error", "Some thing Went Wrong.");
        }
        const formElementsArray = [];
        for (let key in this.state.FeedbackForm) {
            formElementsArray.push({
                id: key,
                config: this.state.FeedbackForm[key]
            });
        }
        let feedbackForm = null;
        if (this.state.requestStatus) {
            feedbackForm = formElementsArray.map(formElement => {


                if (formElement.config.type === 'textarea') {
                    console.log('[formElement]', formElement);
                    return (
                            <div className="p-col-12" key={formElement.id}>
                                <label htmlFor={formElement.id}>{formElement.config.title}</label>
                                <Editor style={{height: '320px'}} value={formElement.config.value} onTextChange={event => this.inputChangedHandler(event, formElement.id)} />
                            </div>
                                        );
                            } else {
                        return (
                                <div className="p-col-12" key={formElement.id}>
                                    <label htmlFor={formElement.id}>{formElement.config.title}</label>
                                
                                    <InputText 
                                        value={formElement.config.value}
                                        type={formElement.config.type}
                                        onChange={event => this.inputChangedHandler(event, formElement.id)}/>
                                </div>
                                );
                    }
                });

            }

            let errorBox = <Messages ref={el => (this.messages = el)} />;
            return (
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-lg-12 p-md-12">
                            <div className="card card-w-title">
                                <h1>Reply Form</h1>
                                <form className="p-grid" onSubmit={this.handleSubmit}>
                                    <div className="p-col-12 p-md-12">{errorBox}</div>
                                    {feedbackForm}
                                    <div className="p-col-12 submit_button">
                                        <Button disabled ={this.state.disabled} label="Submit" />
                    
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
            success: state.feedbackManagementReducer.success,
            error: state.feedbackManagementReducer.error,
            contactUs: state.feedbackManagementReducer.feedbackData
        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            getContact: id => dispatch(actions.getContactEmailById(id)),
            sendReply: (data) => dispatch(actions.sendReply(data)),
            setInitials: () => {
                return dispatch(actions.feedbackInitializeState());
            },
        };
    };
    export default connect(
            mapStateToProps,
            mapDispatchToProps
            )(FeedbackReply);
