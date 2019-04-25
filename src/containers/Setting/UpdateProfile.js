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


class UpdateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {

            ProfileForm: {

                userName: {
                    type: "text",
                    value: "",
                    validation: {
                        required: true,
                    },
                    title: 'User Name',
                    valid: false,
                    touched: false
                },
                userEmail: {
                    type: "text",
                    value: "",
                    validation: {
                        required: true,
                    },
                    title: 'User Email',
                    valid: false,
                    touched: false
                },

                ContactNumber: {
                    type: "text",
                    value: "",
                    validation: {
                        required: true,
                    },
                    title: 'ContactNumber',
                    valid: false,
                    touched: false
                },
                userId: {
                    type: "hidden",
                    value: localStorage.getItem('userId'),
                    title: '',

                    Placeholder: "",
                    touched: false
                },

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
                let isValid = true;
                const profileForm = {
                    ...this.state.ProfileForm
                };
                let formData = {};
                for (let key in profileForm) {
                    // alert(groupForm[key].value);
                    isValid = checkValidity(
                            profileForm[key].value,
                            profileForm[key].validation
                            ) && isValid;

                }
                //alert('FORM STT:', isValid)
                if (isValid) {
                    //alert("valid");
                    for (let key in profileForm) {
                        formData[key] = profileForm[key].value;
                    }
                    this.props.setGroup(formData);
                    setTimeout(() => {
                        if (this.props.success) {
                            this.messages.show({
                                severity: "success",
                                summary: "Success Message",
                                detail: "Profile has been updated successfully."
                            });
                        }
                    }, 1000);
                } else {
                    this.setState({hasError: true}, () => {
                        this.messages.show({
                            severity: "error",
                            summary: "Please fill all required field.",
                            detail: ""
                        });
                    });
                }
            }
    ;
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
                {
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
                            <h1>Update Profile </h1>
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
        success: state.profileManagementReducer.success,
        profileValue: state.profileManagementReducer.profileList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfile: dispatch(actions.viewProfile()),
        setGroup: (data) => dispatch(actions.updateProfile(data)),
    };
};
export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(UpdateGroup);
