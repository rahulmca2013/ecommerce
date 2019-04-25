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
import "./group.css";
class ViewReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elite_group: [],
            divisions: [],
            groupName:"",
        }
    }

    componentDidMount() {
        if (this.props.match.params.id)
            this.props.getReport(this.props.match.params.id);
        console.log("Division", this.props.divisionReportValue);
        setTimeout(() => {
            console.log("divisionReportValue", this.props.divisionReportValue.elite16);
            this.setState({elite_group: this.props.divisionReportValue.elite16, divisions: this.props.divisionReportValue.result});
            this.setState({groupName:this.props.divisionReportValue.group_name});  
        }, 1000);
    }
 
    render() {
        var reportGroupName = this.state.groupName;
        if (this.state.elite_group.length > 0) {
            var myArray = {1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "F", 7: "G",
                8: "H", 9: "I", 10: "J", 11: "K", 12: "L", 13: "M",
                14: "N", 15: "O", 16: "P", 17: "Q", 18: "R", 19: "S", 20: "T", 21: "U", 22: "V", 23: "W", 24: "X", 25: "Y", 26: "Z"};
            if (this.state.elite_group.length > 0){
                console.log("state",this.state.elite_group);
                if(this.state.elite_group !="No Record Found"){
                    var eliteGroup = <ul> <h4>Elite Group</h4> 
                                 { this.state.elite_group.map((elite, eliteIndex) =>
                                   <li key={elite.eliteIndex}>{eliteIndex + 1} : {elite.userName}</li> 
                                )} 
                            </ul>;
                        }
                        else{
                          var eliteGroup =  this.state.elite_group; 
                        }

            }
            

            var divisions = this.state.divisions.map((division, index) => {
                var indexing = myArray[(index + 1)] != undefined && myArray[(index + 1)] != "" ? myArray[(index + 1)] : "Z";
                if (typeof division === 'object') {
                    return <ul key={index}> <h4>{'DIVISION ' + indexing}</h4>
                    {
                     division.map((newDivision, divisionIndex) => <li>{divisionIndex + 1} : {newDivision.userName}</li>)
                    }
                </ul>;
                } else {
                    return null;
                }
            }
            );
        }
        
        

        return (
                <div className='report_box'>
                  
                   <h3>{reportGroupName}</h3>
                   
                        {eliteGroup}
                
                         {divisions}
                    
                   
                </div>
                )

    }

}


const mapStateToProps = state => {
    return {
        divisionReportValue: state.groupManagementReducer.reportData,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getReport: id => dispatch(actions.viewDivisionReport(id)),
    };
};
export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(ViewReport);
