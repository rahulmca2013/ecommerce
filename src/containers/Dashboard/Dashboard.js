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

import * as actions from "../../store/actions";

export class Dashboard extends Component {
    constructor() {
        super();
        this.state = {

            totalUsers: 0,
            totalMatches: 0,
            totalOpenChallenge: 0,
            totalAcceptedChallenge: 0,
            totalMatchPlayed: 0,

        };
    }
    componentDidMount() {

        this.props.onRequestPageLoad();
        console.log("innnnnnnnn1", this.props.dashboardValue);


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
                            <span className="count visitors">{this.props.dashboardValue.userCount}</span>
                        </div>
                    </div>
                    <div className="p-col-12 p-lg-6">
                        <div className="card summary">
                            <span className="title">Total matches</span>
                            <span className="detail">&nbsp;</span>
                            <span className="count purchases">{this.props.dashboardValue.matchCount}</span>
                        </div>
                    </div>
                
                
                    <div className="p-col-12 p-md-6 p-xl-3">
                        <div className="highlight-box">
                            <div className="initials" style={{backgroundColor: '#007be5', color: '#00448f'}}><span>OC</span></div>
                            <div className="highlight-details ">
                
                                <span></span>
                                <span className="count">{this.props.dashboardValue.openChallengeCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-6 p-xl-4">
                        <div className="highlight-box">
                            <div className="initials" style={{backgroundColor: '#ef6262', color: '#a83d3b'}}><span>MP</span></div>
                            <div className="highlight-details ">
                
                                <span></span>
                                <span className="count">{this.props.dashboardValue.matchPlayedCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-6 p-xl-4">
                        <div className="highlight-box">
                            <div className="initials" style={{backgroundColor: '#20d077', color: '#038d4a'}}><span>AC</span></div>
                            <div className="highlight-details ">
                                <i className="pi pi-filter"/>
                                <span></span>
                                <span className="count">{this.props.dashboardValue.userCount}</span>
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
                            isAuthenticated: state.loginReducer.isAuthenticated,
                            dashboardValue: state.loginReducer.dynamicData
                                    //store:
                        };
                    };
                    const mapDispatchToProps = dispatch => {

                        return {
                            onRequestPageLoad: () => dispatch(actions.dashboardData())
                        };
                    };
                    export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
