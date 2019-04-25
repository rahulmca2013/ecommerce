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
import "./user.css";



class UpdateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupLists: [

            ],
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
                    type: "hidden",
                    value: "",
                    title: '',
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
                    type: "select",
                    value: "",
                    title: 'Group Name :',
                    valid: false,
                    touched: false
                },
                
               
                
                
                /*profileImage: {
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
                 ContactNumber: {
                 
                 value: "",
                 validation: {
                 required: true,
                 },
                 title: 'ContactNumber',
                 valid: false,
                 touched: false
                 },*/
                userId: {
                    type: "hidden",
                    value: "",
                    title: '',
                    Placeholder: "",
                    touched: false
                },
                /*createdDate: {
                 type: "readonly",
                 value: "",
                 title: 'Joined Date:',
                 valid: false,
                 touched: false
                 }*/

            },

        };




    }

    componentDidMount() {
        this.props.getGroups("Active");
        if (this.props.match.params.id)
            this.props.getProfile(this.props.match.params.id);

        setTimeout(() => {
            console.log(this.props.groupsValue);
            let pageData = {...this.state.ProfileForm};
            let groupData = this.props.groupsValue;
            for (let profileValue in pageData) {
                //console.log("property" ,this.props.profileValue['userName'])
                pageData[profileValue].value = this.props.profileValue[profileValue];
            }
           let groupLists = [];
            this.props.groupsValue.map((value, Index) => {
                groupLists.push({
                    label: value.groupName,
                    value: value.groupName
                });
            });


            this.setState({
                groupLists,
                ProfileForm: pageData, requestStatus: true}, () => {
                console.log('APPP', this.state.ProfileForm);
            });
        }, 1000);
    }

    inputChangedHandler = (event, controlName) => {
        const targetValue = event.target.value;//(controlName === 'groupStatus') ? event.target.value : event.value;
        const updatedControls = updateObject(this.state.ProfileForm, {
            [controlName]: updateObject(this.state.ProfileForm[controlName], {
                value: targetValue,
                valid: checkValidity(
                        targetValue,
                        this.state.ProfileForm[controlName].validation
                        ),
                touched: true
            })
        });
        this.setState({ProfileForm: updatedControls});
    }
    ;
            handleSubmit = event => {

                event.preventDefault();
                var isValid = false;
                const profileForm = {
                    ...this.state.ProfileForm
                };

                let formData = {};
                var levelValue = this.state.ProfileForm.Level.value;
                isValid = String(levelValue).indexOf('.') !== -1;
                console.log(this.state.ProfileForm.Level.value);

                if (Number.isInteger(parseInt(this.state.ProfileForm.Level.value)) && this.state.ProfileForm.Level.value % 1 === 0 && isValid == false) {

                    for (let key in profileForm) {
                        formData[key] = profileForm[key].value;
                    }
                    this.props.setLevel(formData);
                    setTimeout(() => {
                        if (this.props.success) {
                            this.messages.show({
                                severity: "success",
                                summary: "Success Message",
                                detail: "Group has been modified successfully."
                            });
                        }
                    }, 1000);
                } else {
                    this.setState({hasError: true}, () => {
                        this.messages.show({
                            severity: "error",
                            summary: "Please enter only digit in the level text box.",
                            detail: ""
                        });
                    });
                }
            }
    ;
            render() {
        const formElementsArray = [];
        for (let key in this.state.ProfileForm) {
            console.log("Keys", key);
            formElementsArray.push({
                id: key,
                config: this.state.ProfileForm[key]
            });
        }
        let profileForm = null;



        if (this.state.requestStatus) {
            profileForm = formElementsArray.map(formElement => {

                if (formElement.config.type == 'profileImage') {
                    return (
                            <div className="p-col-12" key={formElement.id}>
                                <label className="lb-left" htmlFor={formElement.id}>{formElement.config.title}</label>
                                <div className="lb-right"><img src={formElement.config.value} width="100" alt={""}  /></div>
                            </div>

                            );

                } else if (formElement.config.type === 'select') {
                    console.log('[formElement]', formElement);
                    return (
                            <div className="p-col-12" key={formElement.id}>
                                <label className="lb-left" htmlFor={formElement.id}>{formElement.config.title}</label>
                    <div className="lb-right">            
                    <Dropdown options={this.state.groupLists} value={formElement.config.value} onChange={event => this.inputChangedHandler(event, formElement.id)} autoWidth={false} />
                          </div>  
                            </div>
                            );
                } else if (formElement.config.type == 'hidden')
                {
                    return (
                            <div className="p-col-12" key={formElement.id}>
                                <label className="lb-left" htmlFor={formElement.id}>{formElement.config.title}</label>
                                <div className="lb-right">
                                    <InputText 
                                        value={formElement.config.value}
                                        type={formElement.config.type}
                                        onChange={event => this.inputChangedHandler(event, formElement.id)}/>
                                </div> </div>
                            );
                } else {
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
                            <h1>Modify Group </h1>
                            <form className="p-grid" onSubmit={this.handleSubmit}>
                                <div className="p-col-12 p-md-12">{errorBox}</div>
                                {profileForm}
                                <div className="p-col-12 submit_button">
                                    <Button label="Submit" />
                
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
        success: state.usersReducer.groupsuccess,
        profileValue: state.usersReducer.userDetail,
        groupsValue: state.usersReducer.groupsList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfile: id => dispatch(actions.userDetail(id)),
        getGroups: status => dispatch(actions.groupLists(status)),
        setLevel: (data) => dispatch(actions.updateUserGroup(data)),
    };
};
export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(UpdateGroup);
