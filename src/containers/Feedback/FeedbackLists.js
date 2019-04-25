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
import { NavLink } from 'react-router-dom'
        import "./feedback.css";

export class FeedbackLists extends Component {

    constructor() {
        super();
        this.state = {
            layout: 'list',
            sortOptions: [
                {label: 'Newest First', value: '!year'},
                {label: 'Oldest First', value: 'year'},
                {label: 'Brand', value: 'brand'}
            ],
        };
    }

    componentDidMount() {
        if (this.props.dataTableValue.length == 0)
            this.props.onRequestPageLoad();
    }

    updatepage = (rowData, column) => {
        console.log('ROWS', rowData.contactId, column)
        return <NavLink to={"feedback-reply/" + rowData.contactId} activeClassName="selected">
            Reply
        </NavLink>
    }

    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0)
            this.setState({sortOrder: -1, sortField: value.substring(1, value.length), sortKey: value});
        else
            this.setState({sortOrder: 1, sortField: value, sortKey: value});
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
                            <h1>Feedback Management System</h1>
                            <DataTable value={this.props.dataTableValue} paginatorPosition="both" selectionMode="single" header="" paginator={true} rows={10}
                                       responsive={true} selection={this.state.dataTableSelection} onSelectionChange={event => this.setState({dataTableSelection: event.data})}>
                                <Column className="s_number" field="serialNo" header="S.No" sortable={true}/>                    
                                <Column filter={true} filterMatchMode="contains" className="sender_name" field="senderName" header="Sender Name" sortable={true}/>
                                <Column  filter={true} filterMatchMode="contains" className="email-id" field="senderEmailId" header="Sender Email Id"  sortable={true}/>
                                <Column filter={true} filterMatchMode="contains" field="senderFeedback" header="Sender Feedback" sortable={true}/>
                                <Column filter={true} filterMatchMode="contains" className="createdDate" field="createdDate" header="Created Date" sortable={true}/>                    
                                <Column className="action" field="contactId" body={this.updatepage} header="Action" />
                
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
                    dataTableValue: state.feedbackManagementReducer.feedbackList
                            //store:
                };
            };

            const mapDispatchToProps = dispatch => {
                return {
                    onRequestPageLoad: () => dispatch(actions.feedbackManagement())
                };
            };
            export default connect(mapStateToProps, mapDispatchToProps)(FeedbackLists);
