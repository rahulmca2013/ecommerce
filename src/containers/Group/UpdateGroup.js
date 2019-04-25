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
import "./group.css";
import {
geocodeByAddress,
        geocodeByPlaceId,
        getLatLng,
} from 'react-places-autocomplete';


class UpdateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gmapsLoaded: false,
            address: '',
            status: [
                {label: 'Active', value: 'Active'},
                {label: 'Inactive', value: 'Inactive'}

            ],
            requestStatus: false,
            hasError: false,
            errorMessage: "",
            GroupForm: {
                groupName: {
                    type: "text",
                    value: "",
                    validation: {
                        required: true,
                    },
                    title: 'Group Name',
                    valid: false,
                    touched: false
                },
                groupLatitude: {
                    type: "text",
                    value: "",
                    title: 'Latitude',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                groupLongitude: {
                    type: "text",
                    value: "",
                    title: 'Longitude',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                groupStatus: {
                    type: "select",
                    value: "",
                    title: 'Status',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                groupId: {
                    type: "hidden",
                    value: "",
                    validation: {
                        required: true,
                    },
                    title: '',
                    valid: false,
                    touched: false,
                    class:'group_id'
                },
                
                location: {
                    type: "location",
                    value: "Active",
                    title: 'Location',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                }

            },
            message: ""
        };
    }

    componentDidMount() {
        if (this.props.match.params.id)
            this.props.getGroup(this.props.match.params.id);
        setTimeout(() => {
            let pageData = {...this.state.GroupForm};
            for (let groupValue in pageData) {
            pageData[groupValue].value = this.props.groupValue[groupValue];
            }
            this.setState({address: this.props.groupValue['location'], requestStatus: true}, () => {
                
            });
            this.setState({GroupForm: pageData, requestStatus: true}, () => {
                console.log('APPP', this.state.GroupForm);
            });
        }, 1000);
    }

    inputChangedHandler = (event, controlName) => {
        const targetValue = event.target.value;//(controlName === 'groupStatus') ? event.target.value : event.value;
        const updatedControls = updateObject(this.state.GroupForm, {
            [controlName]: updateObject(this.state.GroupForm[controlName], {
                value: targetValue,
                valid: checkValidity(
                        targetValue,
                        this.state.GroupForm[controlName].validation
                        ),
                touched: true
            })
        });
        this.setState({GroupForm: updatedControls});
    };
            handleSubmit = event => {

                event.preventDefault();
                let isValid = true;
                const groupForm = {
                    ...this.state.GroupForm
                };
                let formData = {};
                for (let key in groupForm) {
                   // alert(groupForm[key].value);
                    isValid = checkValidity(
                            groupForm[key].value,
                            groupForm[key].validation
                            ) && isValid;
                    //alert(key +"--" + groupForm[key].valid + " : valid =" + isValid);
                }
                //alert('FORM STT:', isValid)
                if (isValid) {
                    //alert("valid");
                    for (let key in groupForm) {
                        formData[key] = groupForm[key].value;
                    }
                    this.props.setGroup(formData);
                    setTimeout(() => {
                        if (this.props.success) {
                            this.messages.show({
                                severity: "success",
                                summary: "Success Message",
                                detail: "Group updated successfully."
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
            };
             handleChange = address => {
                this.setState({address});
                const groupForm = {...this.state.GroupForm};
                for (let key in groupForm) {


                    const groupElement = {...groupForm[key]};
                    if (key === 'groupLongitude' || key === 'groupLatitude') {
                        groupElement.value = '';
                    }
                    groupForm[key] = groupElement;
                }
                this.setState({GroupForm: groupForm});
            };
            handleSelect = address => {
                const groupForm = {...this.state.GroupForm};
                groupForm['location'].value = address;
                this.setState({GroupForm: groupForm}, () => {
                    console.log("formmmm", groupForm)
                });
                this.setState({address: address});


                geocodeByAddress(address)
                        .then(results => getLatLng(results[0]))
                        .then(latLng => {
                            const groupForm = {...this.state.GroupForm};


                            for (let key in groupForm) {


                                const groupElement = {...groupForm[key]};
                                if (key === 'groupLatitude') {

                                    console.log("lat", latLng['lat']);


                                    groupElement.value = latLng['lat'];
                                }
                                if (key === 'groupLongitude') {
                                    groupElement.value = latLng['lng'];
                                }
                                groupForm[key] = groupElement;
                            }
                            this.setState({GroupForm: groupForm}, () => {
                                console.log('FFFFF', groupForm)
                            });

                            console.log('HERE', latLng['short_name'])
                            //this.setState({GroupForm:groupForm});
                        })
                        .catch(error => console.error('Error', error));
            };
            
            render() {
        const formElementsArray = [];
        for (let key in this.state.GroupForm) {
            formElementsArray.push({
                id: key,
                config: this.state.GroupForm[key]
            });
        }
        let groupForm = null;
        let locationMap = null;
        if (this.props.gmapsLoaded) {
            locationMap = <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                        
                        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
    <div>
        <input
            {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
            })}
            />
        <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {const className = suggestion.active ? 'suggestion-item--active': 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active ? {backgroundColor: '#fafafa', cursor : 'pointer' }: { backgroundColor: '#ffffff', cursor: 'pointer' };
            
                                return ( <div { ...getSuggestionItemProps(suggestion, { className, style, })}>
                                            <span>{suggestion.description}</span>
                                        </div> );
            })}
        </div>
    </div>
    )}
</PlacesAutocomplete>
                                        ;

                                }
        
        if (this.state.requestStatus) {
            groupForm = formElementsArray.map(formElement => {
                if (formElement.config.type === 'select') {
                    console.log('[formElement]', formElement);
                    return (
                            <div className="p-col-12" key={formElement.id}>
                                <label htmlFor={formElement.id}>{formElement.config.title}</label>
                                <Dropdown options={this.state.status} value={formElement.config.value} onChange={event => this.inputChangedHandler(event, formElement.id)} autoWidth={false} />
                            
                            </div>
                            );
                }
                else if (formElement.config.type === 'location' && (this.props.gmapsLoaded)) {
                                            return (<div className="p-col-12" key={formElement.id}>
                                                <label htmlFor={formElement.id}>{formElement.config.title}</label>{locationMap}</div>
                                                    );
                                        }
                 else {
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
                            <h1>Update Group </h1>
                            <form className="p-grid" onSubmit={this.handleSubmit}>
                                <div className="p-col-12 p-md-12">{errorBox}</div>
                                {groupForm}
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
        success: state.groupManagementReducer.success,
        groupValue: state.groupManagementReducer.groupData,
        gmapsLoaded: state.groupManagementReducer.locationMap
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGroup: id => dispatch(actions.getGroupById(id)),
        setGroup: (data) => dispatch(actions.updateGroup(data)),
    };
};
export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(UpdateGroup);
