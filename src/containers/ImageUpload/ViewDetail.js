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
import {InputSwitch} from 'primereact/inputswitch';
import "./user.css";



class ViewDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
           inputSwitchValue: false,
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
                Level: {
                    type: "readonly",
                    value: "",
                    title: 'Level :',
                    valid: false,
                    touched: false
                },
                City: {
                    type: "readonly",
                    value: "",
                    title: 'City :',
                    valid: false,
                    touched: false
                },
                groupName: {
                    type: "readonly",
                    value: "",
                    title: 'Group Name :',
                    valid: false,
                    touched: false
                },
                profileImage: {
                    type: "profileImage",
                    value: "",
                    title: 'Profile Image:',
                    
                    valid: false,
                    touched: false
                },
                
                userStatus: {
                    type: "status",
                    value: "",
                    title: 'Status:',
                    
                    valid: false,
                    touched: false
                },
                createdDate:{
                    type: "readonly",
                    value: "",
                    title: 'Joined Date:',
                    valid: false,
                    touched: false
                }
                
            },
            
        };
    }

    componentDidMount() {
       
        if (this.props.match.params.id)
            this.props.getProfile(this.props.match.params.id);

        setTimeout(() => {
            let pageData = {...this.state.ProfileForm};
           // console.log(pageData);
            for (let profileValue in pageData) {

               if(profileValue=='userStatus'){
                   if(this.props.profileValue[profileValue]=='Active'){
                       this.setState({inputSwitchValue: true}); 
                   }
               }
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

                if(formElement.config.type=='profileImage'){
                return (
                         <div className="p-col-12" key={formElement.id}>
                            <label className="lb-left" htmlFor={formElement.id}>{formElement.config.title}</label>
                        <div className="lb-right"><img src={formElement.config.value} width="100" alt={""}  /></div>
                        </div>
                        
                );
                        
            }
            
           
                        
            else{
                return (
                <div className="p-col-12" key={formElement.id}>
                            <label className="lb-left"  htmlFor={formElement.id}>{formElement.config.title}</label>
                        <div className="lb-right">{formElement.config.value}</div>
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
                            <h1>View Profile </h1>
                            <form className="p-grid" onSubmit={this.handleSubmit}>
                                <div className="p-col-12 p-md-12">{errorBox}</div>
                                {profileForm}
                            </form>
                        </div>
                    </div>
                </div>
                );
    }
}


const mapStateToProps = state => {
    return {
        profileValue: state.usersReducer.userDetail,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfile: id => dispatch(actions.userDetail(id)),

    };
};
export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(ViewDetail);
