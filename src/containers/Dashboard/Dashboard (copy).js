import React, { Component } from "react";
import { connect } from "react-redux";
//import { CarService } from "../../service/CarService";
import { Redirect } from "react-router-dom";
import { Panel } from "primereact/panel";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Schedule } from "primereact/schedule";

export class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      
      
    };
  }
componentDidMount() {
    //this.carservice.getCarsSmall().then(data => this.setState({ cars: data }));
  }

  render() {
    

    

    
    let authRedirect = null;
    if (!this.props.isAuthenticated) {
      authRedirect = <Redirect to="login" />;
    }
    return (
            
            <div className="p-grid p-fluid dashboard">
                <div className="p-col-12 p-lg-6">
                    <div className="card summary">
                        <span className="title">Total Users</span>
                        <span className="detail"> &nbsp;</span>
                        <span className="count visitors">12</span>
                    </div>
                </div>
                <div className="p-col-12 p-lg-6">
                    <div className="card summary">
                        <span className="title">Total matches</span>
                        <span className="detail">&nbsp;</span>
                        <span className="count purchases">534</span>
                    </div>
                </div>
                

                <div className="p-col-12 p-md-6 p-xl-3">
                    <div className="highlight-box">
                        <div className="initials" style={{backgroundColor:'#007be5',color:'#00448f'}}><span>OC</span></div>
                        <div className="highlight-details ">
                           
                            <span></span>
                            <span className="count">523</span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-xl-4">
                    <div className="highlight-box">
                        <div className="initials" style={{backgroundColor:'#ef6262',color:'#a83d3b'}}><span>MP</span></div>
                        <div className="highlight-details ">
                            
                            <span></span>
                            <span className="count">81</span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-xl-4">
                    <div className="highlight-box">
                        <div className="initials" style={{backgroundColor:'#20d077',color:'#038d4a'}}><span>AC</span></div>
                        <div className="highlight-details ">
                            <i className="pi pi-filter"/>
                            <span></span>
                            <span className="count">21</span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-xl-4">
                    
                </div>
               
      
        
        {authRedirect}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.loginReducer.isAuthenticated
    //store:
  };
};
export default connect(mapStateToProps)(Dashboard);
