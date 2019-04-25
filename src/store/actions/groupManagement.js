import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as base from "../../config/const";

export const responseFail = error => {
    return {
        type: actionTypes.GROUP_RESPONSE_FAIL,
        error: error
    };
};
export const requestStart = () => {
    return {
        type: actionTypes.GROUP_REQUEST_START,
    };
};
export const requestSuccess = (groupsList) => {


    return {
        type: actionTypes.GROUP_REQUEST_SUCCESS,
        groupsList
    };
};

export const updateSuccess = () => {
    return {
        type: actionTypes.GROUP_UPDATE_SUCCESS,
        
    };
};
export const successGroupById = (groupData) => {
   
    return {
        type: actionTypes.GROUP_BY_ID,
        groupData
    };
};

export const successDivisionReport = (reportData) => {
   
    return {
        type: actionTypes.DIVISION_BY_GROUP,
        reportData
    };
};

export const addSuccess = (groupData) =>{
  
    return {
       type: actionTypes.GROUP_ADD_SUCCESS  
    };
};

export const groupManagement = () => {
    return (dispatch, getState) => {
        console.log("group-lists");
        dispatch(requestStart());
        let url = base.BASE_URL + "admin/group-lists";
        axios
                .post(url)
                .then(response => {
                    console.log(response.data.result)
                    dispatch(requestSuccess(response.data.result));
                })
                .catch(err => {
                    dispatch(responseFail(err.response.data.error));
                });
    };
};
export const getGroupById = (id) => {
    return (dispatch, getState) => {
        console.log("get-group-by-id");
        dispatch(requestStart());
        let url = base.BASE_URL + "admin/group-by-id/" + id;
        axios
                .get(url)
                .then(response => {
                    //console.log(response.data.result)
                    dispatch(successGroupById(response.data.result));
                })
                .catch(err => {
                    dispatch(responseFail(err.response.data.error));
                });
    };
};


export const updateGroup = (data, id) => {
    console.log("update-Group",data);
    return (dispatch, getState) => {
        console.log("open-challnge");
        dispatch(requestStart());
        let url = base.BASE_URL + "admin/update-group/";
        axios
                .post(url, data)
                .then(response => {
                    //console.log(response.data.result)
                    dispatch(updateSuccess());
                })
                .catch(err => {
                    dispatch(responseFail(err.response.data.error));
                });
    };
};


export const addGroup = (data, id) => {
    console.log("add-Group",data);
    return (dispatch, getState) => {
        console.log("add-group");
        dispatch(requestStart());
        let url = base.BASE_URL + "admin/group-create/";
        axios
                .post(url, data)
                .then(response => {
                    if(response.data.code==200){
                    //console.log(response.data.result)
                    dispatch(addSuccess());
                }
                else{
                   dispatch(responseFail()); 
                }
                })
                .catch(err => {
                   dispatch(responseFail(err.response.data.error));
                });
    };
};

export const viewDivisionReport = (id) => {
    return (dispatch, getState) => {
        console.log("get-group-by-id");
        dispatch(requestStart());
        //let url = base.BASE_URL + "admin/group-by-id/" + id;
        let url = base.BASE_URL + "admin/division-report/"+ id;
        axios
                .get(url)
                .then(response => {
                    //console.log(response.data.result)
                    dispatch(successDivisionReport(response.data));
                })
                .catch(err => {
                    dispatch(responseFail(err.response.data.error));
                });
    };
};