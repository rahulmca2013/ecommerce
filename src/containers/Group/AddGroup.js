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


class AddGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gmapsLoaded: false,
            disabled : false,
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
                    Placeholder: "",
                    touched: false
                },
                groupStatus: {
                    type: "select",
                    value: "Active",
                    title: 'Status',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
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
    
    componentWillReceiveProps = function (nextProps) {
        if (nextProps.success === true || nextProps.error === true) {
            this.setState({disabled: false})
        }
    }
    
    inputChangedHandler = (event, controlName) => {
        const targetValue = event.target.value;//(controlName === 'groupStatus') ? event.target.value : event.value;
        //alert(targetValue);
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
                    this.props.addGroup(formData);
                    this.setState({disabled:true});
                    setTimeout(() => {
                        
                        if (this.props.success) {
                            this.messages.show({
                                severity: "success",
                                summary: "Success Message",
                                detail: "Group has been added successfully."
                            });

                            document.getElementById('add-group').reset();
                            const groupForm = {...this.state.GroupForm};
                            for (let key in groupForm) {
                                
                            //alert(key)
                                const activeElement = {...groupForm[key]};
                                if (key === 'groupStatus')
                                    activeElement.value = 'Active';
                                else
                                    activeElement.value = '';
                               groupForm[key] = activeElement;
                            }
                            this.setState({GroupForm: groupForm});
                             this.setState({address: ""});

                        }
                        if (this.props.error) {
                            this.messages.show({
                                severity: "error",
                                summary: "Some thing went wrong..",
                                detail: ""
                            });
                        }
                    }, 1000);
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

                                const formElementsArray = [];
                                for (let key in this.state.GroupForm) {

                                    formElementsArray.push({
                                        id: key,
                                        config: this.state.GroupForm[key]
                                    });
                                }
                                let groupForm = null;
                                // alert(this.state.requestStatus);
                                if (this.props.gmapsLoaded) {
                                    groupForm = formElementsArray.map(formElement => {






                                        if (formElement.config.type === 'select') {
                                            console.log('[formElement]', formElement);
                                            return (
                                                    <div className="p-col-12" key={formElement.id}>
                                                        <label htmlFor={formElement.id}>{formElement.config.title}</label>
                                                    
                                                        <Dropdown  value={formElement.config.value} options={this.state.status} onChange={event => this.inputChangedHandler(event, formElement.id)} autoWidth={false} />
                                                    
                                                    </div>
                                                    );
                                        } else if (formElement.config.type === 'location' && (this.props.gmapsLoaded)) {
                                            return (<div className="p-col-12" key={formElement.id}>
                                                <label htmlFor={formElement.id}>{formElement.config.title}</label>{locationMap}</div>
                                                    );
                                        } else {
                                            return (
                                                    <div className="p-col-12" key={formElement.id}>
                                                    
                                                    
                                                    
                                                    
                                                    
                                                        <label htmlFor={formElement.id}>{formElement.config.title}</label>
                                                    
                                                        <InputText 
                                                            defaultValue={formElement.config.value}
                                                            type={formElement.config.type}
                                                            onBlur={event => this.inputChangedHandler(event, formElement.id)}/>
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
                                                    <h1>Add Group </h1>
                                                    <form className="p-grid" id="add-group" onSubmit={this.handleSubmit}>
                                        
                                        
                                        
                                                        <div className="p-col-12 p-md-12">{errorBox}</div>
                                                        {groupForm}
                                                        <div className="p-col-12 submit_button">
                                                            <Button disabled = {this.state.disabled}label="Submit" />
                                        
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
                                error: state.groupManagementReducer.error,
                                gmapsLoaded: state.groupManagementReducer.locationMap
                            };
                        };

                        const mapDispatchToProps = dispatch => {
                            return {
                                addGroup: (data) => dispatch(actions.addGroup(data))
                            };
                        };
                        export default connect(
                                mapStateToProps,
                                mapDispatchToProps
                                )(AddGroup);
