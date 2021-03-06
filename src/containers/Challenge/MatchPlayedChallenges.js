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
import "./challenge.css";

export class MatchPlayedChallenges extends Component {

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
                            <h1>Match Played during the week</h1>
                            <DataTable value={this.props.dataTableValue} paginatorPosition="both" selectionMode="single" header="" paginator={true} rows={10}
                                       responsive={true} selection={this.state.dataTableSelection} onSelectionChange={event => this.setState({dataTableSelection: event.data})}>
                                <Column className="s_number" field="serialNo" header="S.NO" sortable={true}/>                    
                                <Column field="senderName" header="Challenger Name" sortable={true}/>
                                <Column field="receiverName" header="Accepter Name" sortable={true}/>
                                <Column field="senderMatchPlace" header="Place"/>
                                 <Column field="receiverMatchPlace" header="Accepter Place"/>
                                <Column filter={true} filterMatchMode="contains" field="matchGroup" header="Group Name" sortable={true}/>
                                <Column field="createdDate" header="Match Created Date" sortable={true}/>
                                <Column field="matchStatus" header="Match Status"/>
                
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
                    dataTableValue: state.matchPlayedReducer.matchPlayedList
                            //store:
                };
            };

            const mapDispatchToProps = dispatch => {
                return {
                    onRequestPageLoad: () => dispatch(actions.matchPlayed())
                };
            };
            export default connect(mapStateToProps, mapDispatchToProps)(MatchPlayedChallenges);
