import React, {Component} from 'react';
import { connect } from "react-redux";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
        import {Panel} from 'primereact/panel';
import {Dropdown} from 'primereact/dropdown';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import * as actions from "../../store/actions";
import { NavLink } from 'react-router-dom';
import "./user.css";
import {InputSwitch} from 'primereact/inputswitch';
import Aux from "../../Auxilary/Auxilary";

export class Users extends Component {

    constructor() {
        super();

        this.state = {

            inputSwitchValue: false,
            layout: 'list',
            sortOptions: [
                {label: 'Newest First', value: '!year'},
                {label: 'Oldest First', value: 'year'},
                {label: 'Brand', value: 'brand'}
            ],
        };
    }

    componentDidMount() {
        
            this.props.onRequestPageLoad();
    }

    showImage = (rowData, column) => {
        console.log('ROWS', rowData, column)
        return <img src={rowData.userProfileImage} width="100" alt={""}  />;
    }

    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0)
            this.setState({sortOrder: -1, sortField: value.substring(1, value.length), sortKey: value});
        else
            this.setState({sortOrder: 1, sortField: value, sortKey: value});
    }
    handleChange = (value, id, userId) => {

        var status = "";
        for (let key in this.props.dataTableValue) {
            if (this.props.dataTableValue[key].serialNo == id) {

                if (value) {

                    status = 'Active';
                    this.props.dataTableValue[key].userStatus = status;
                } else {

                    status = 'Blocked';
                    this.props.dataTableValue[key].userStatus = status;
                }
            }
        }
        var formData = {};
        formData = {'id': userId, status: status};
        this.props.changeStatus(formData);
    }
    ;
            viewPage = (rowData, column) => {
        console.log('ROWS', rowData.groupId, column)
        return <NavLink to={"user-detail/" + rowData.userId} activeClassName="selected">
            View Detail
        </NavLink>
    }
    updatePage = (rowData, column) =>{
        return <Aux> <NavLink to={"update-level/" + rowData.userId} activeClassName="selected">
            Update Level 
            </NavLink><span className="left-right">/</span><NavLink to={"user-detail/" + rowData.userId} activeClassName="selected">
            View Detail
        </NavLink>
        </Aux>   
    }

    statusToggle = (rowData, column) => {
        return <InputSwitch className= {rowData.serialNo} checked={rowData.userStatus == 'Active' ? true : false} onChange={event => this.handleChange(event.value, rowData.serialNo, rowData.userId)} />;
    }

    render() {
        const scheduleHeader = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };

        return (
                <div className="p-grid">
                    <div className="p-col-12">
                        <div className="card card-w-title">
                            <h1>User Lists</h1>
                            <DataTable value={this.props.dataTableValue} paginatorPosition="both" selectionMode="single" header="" paginator={true} rows={10}
                                       responsive={true} selection={this.state.dataTableSelection} onSelectionChange={event => this.setState({dataTableSelection: event.data})}>
                                <Column className="s_number" field="serialNo" header="S.No" sortable={true}/>                
                                <Column field="userName" filter={true} filterMatchMode="contains" header="Name" sortable={true}/>
                                <Column className="email-id" class="email" field="userEmailId" header="Email Id" sortable={true}/>
                                <Column className="s_number" field="userLevel" filter={true} header="Level" sortable={true}/>
                                <Column className="contact_number" field="userContactNumber" header="Contact number" sortable={true}/>
                                <Column  className="user_city" filter={true} filterMatchMode="contains" field="userCity" header="City" sortable={false}/> 
                                <Column  filter={true} filterMatchMode="contains" className="group-name" field="userGroup" header="Group" sortable={false}/>
                                <Column className="image" body={this.showImage} header="Image" sortable={false}/>
                                <Column  body={this.statusToggle} header="Status" />
                                <Column className="joined_date" field="userJoinedDate" header="Joined Date" sortable={false}/>
                                <Column  body={this.updatePage} header="Action" />
                                
                
                
                            </DataTable>
                        </div>
                    </div>
                
                
                </div>
                            );
                }
            }
            const mapStateToProps = state => {
                return {
                    isAuthenticated: state.loginReducer.isAuthenticated,
                    dataTableValue: state.usersReducer.usersList
                            //store:
                };
            };

            const mapDispatchToProps = dispatch => {
                return {
                    onRequestPageLoad: () => dispatch(actions.users()),
                    changeStatus: (data) => dispatch(actions.changeStatus(data))
                };
            };
            export default connect(mapStateToProps, mapDispatchToProps)(Users);
