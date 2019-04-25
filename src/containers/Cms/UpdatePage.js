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
import './page.css';

class UpdatePage extends Component {
    constructor(props) {
      super(props);
          //console.log('HERE', this.props);
        this.state = {
          requestStatus: false,
          disabled:false,
          hasError: false,
          errorMessage: "",
            CmsForm: {
                pageTitle: {
                    type: "text",
                    value: "",
                    validation: {
                      required: true,
                    },
                    title: 'Title',
                    valid: false,
                    touched: false
                },
                pageHeading: {
                    type: "text",
                    value: "",
                    title: 'Heading',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                pageMetaKey: {
                    type: "text",
                    value: "",
                    title: 'Meta key',
                    validation: {
                      required: false
                    },
                    valid: false,
                    touched: false
                },
                pageDescription: {
                    type: "textarea",
                    value: "",
                    title: 'Description',
                    validation: {
                      required: true
                    },
                    valid: false,
                    touched: false
                },
                pageMetaTitle: {
                    type: "text",
                    value: "",
                    title: 'Meta Title',
                    validation: {
                    required: false
                    },
                    valid: false,
                    touched: false
                },
                pageMetaDescription: {
                    type: "text",
                    value: "",
                    title: 'Meta Description',
                    validation: {
                      required: false
                    },
                    valid: false,
                    touched: false
                },
                
                pageSlug: {
                    type: "hidden",
                    value: "",
                      title: '',
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
        if(this.props.match.params.slug)
         this.props.getContent(this.props.match.params.slug);
        setTimeout(()=>{
                let pageData = {...this.state.CmsForm};
                for(let cms in pageData){
                        pageData[cms].value = this.props.cms[cms];
                }
                this.setState({CmsForm:pageData, requestStatus: true}, ()=>{
                        console.log('APPP', this.state.CmsForm);
                });
        }, 1000);
    }
  

    inputChangedHandler = (event, controlName) => {
      const targetValue = (controlName === 'pageDescription')?event.htmlValue:event.target.value;
      const updatedControls = updateObject(this.state.CmsForm, {
        [controlName]: updateObject(this.state.CmsForm[controlName], {
          value: targetValue,
          valid: checkValidity(
            targetValue,
            this.state.CmsForm[controlName].validation
          ),
          touched: true
        })
      });

      this.setState({ CmsForm: updatedControls });
    };
    
    

    handleSubmit = event => {
        
    
      event.preventDefault();
      let isValid = true;
      const cmsForm = {
        ...this.state.CmsForm
      };
      let formData = {};
      for (let key in cmsForm) {          
        isValid = checkValidity(
            cmsForm[key].value,
            cmsForm[key].validation
          ) && isValid;
        //alert(key +"--" + cmsForm[key].valid + " : valid =" + isValid);
      }
      //alert('FORM STT:', isValid)
      if (isValid) {
          
          this.setState({disabled:true});
          for (let key in cmsForm) {    
              formData[key] = cmsForm[key].value;
          }  
        this.props.setContent(formData);
		setTimeout(() => {
			if(this.props.success){
                            
                         this.setState({disabled: false});
			this.messages.show({
				severity: "success",
				summary: "Success Message",
				detail: "Page has been updated successfully."
			  });
			}
		}, 1000);
      } else {
          
       this.setState({disabled: true});
        this.setState({ hasError: true }, () => {
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

  render() {
    const formElementsArray = [];
    for (let key in this.state.CmsForm) {
        formElementsArray.push({
            id: key,
            config: this.state.CmsForm[key]
        });
    }
    let cmsForm = null;
    if(this.state.requestStatus){
        cmsForm = formElementsArray.map(formElement => {
			if(formElement.config.type=== 'textarea'){
                          console.log('[formElement]',formElement);
                          return (
                              <div className="p-col-12" key={formElement.id}>
                                  <label htmlFor={formElement.id}>{formElement.config.title}</label>
                                  <Editor style={{height:'320px'}} value={formElement.config.value} onTextChange={event => this.inputChangedHandler(event, formElement.id)} />
                              </div>
                          );
                      }
					  if(formElement.config.title  === 'slug'){
						  return (
                              <div className="p-col-12 hide" key={formElement.id}>
                                  <label htmlFor={formElement.id}>{formElement.config.title}</label>

                                  <InputText
                                  value={formElement.config.value}
                                  type={formElement.config.type}
                                  onChange={event => this.inputChangedHandler(event, formElement.id)}/>
                              </div>
                          );
					  }
					  else{
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
              <h1>Update Cms Page</h1>
                  <form className="p-grid" onSubmit={this.handleSubmit}>
                    <div className="p-col-12 p-md-12">{errorBox}</div>
                    {cmsForm}
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
    success: state.contentManagementReducer.success,
    cms: state.contentManagementReducer.pageData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getContent: slug => dispatch(actions.getContentBySlug(slug)),
    setContent: (data) => dispatch(actions.setContent(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePage);
