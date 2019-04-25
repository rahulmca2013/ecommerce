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
import { NavLink } from 'react-router-dom';
import "./setting.css";


class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {

            ProfileForm: {
                userName: {
                    
                    value: "",
                    title: 'User Name : ',
                    valid: false,
                    touched: false
                },
                userEmail: {
                    type: "readonly",
                    value: "",
                    title: 'User Email : ',
                    valid: false,
                    touched: false
                },
                ContactNumber: {
                    type: "readonly",
                    value: "",
                    title: 'Contact Number :',
                    valid: false,
                    touched: false
                },
                createdDate:{
                    type: "readonly",
                    value: "",
                    title: 'Created Date:',
                    valid: false,
                    touched: false
                }
                
            },
            
        };
    }

    componentDidMount() {
       

        setTimeout(() => {
            let pageData = {...this.state.ProfileForm};
            console.log(pageData);
            for (let profileValue in pageData) {

                //console.log("property" ,this.props.profileValue['userName'])
                pageData[profileValue].value = this.props.profileValue[profileValue];
            }

            this.setState({ProfileForm: pageData, requestStatus: true}, () => {
                console.log('APPP', this.state.ProfileForm);
            });
        }, 1000);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.ProfileForm) {
            formElementsArray.push({
                id: key,
                config: this.state.ProfileForm[key]
            });
        }
        let profileForm = null;

        if (this.state.requestStatus) {
            profileForm = formElementsArray.map(formElement => {


                return (
                        <div className="p-col-12" key={formElement.id}>
                            <label className="lb-left" htmlFor={formElement.id}>{formElement.config.title}</label>
                        <div className="lb-right">{formElement.config.value}</div>
                        </div>
                        );

            });

        }

        let errorBox = <Messages ref={el => (this.messages = el)} />;
        return (
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-lg-12 p-md-12">
                        <div className="card card-w-title">
                            <h1>View Profile </h1>
                            <form className="p-grid" onSubmit={this.handleSubmit}>
                                <div className="p-col-12 p-md-12">{errorBox}</div>
                                {profileForm}
                                <div className="p-col-12">
                                    <NavLink to={"update-profile/" + localStorage.getItem('userId')} activeClassName="selected">
                                        Update Profile
                                    </NavLink>
                
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
        profileValue: state.profileManagementReducer.profileList,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfile: dispatch(actions.viewProfile()),

    };
};
export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(ViewProfile);
