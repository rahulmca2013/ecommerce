import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as base from "../../config/const";

export const forgotFail = error => {
    return {
        type: actionTypes.USERS_REQUEST_FAIL,
        error: error
    };
};
export const requestStart = () => {
    return {
        type: actionTypes.USERS_REQUEST_START
    };
};
export const requestSuccess = (usersList) => {
    return {
        type: actionTypes.USERS_REQUEST_SUCCESS,
        usersList
    };
};


export const fetchGroupSuccess = (groupsList) => {
    return {
        type: actionTypes.GROUPS_REQUEST_SUCCESS,
        groupsList
    };
};


export const userDetailSuccess = (userDetail) => {
    return {
        type: actionTypes.USERS_DETAIL_SUCCESS,
        userDetail
    };
    
};



export const dashboardRequestSuccess = (dashboardData) => {
    return {
        type: actionTypes.DASHBOARD_SUCCESS,
        dashboardData
    };
};
export const updateLevelSuccess = () => {
    return {
        type: actionTypes.LEVEL_UPDATE_SUCCESS,

    };
};

export const updateGroupSuccess = () => {
    return {
        type: actionTypes.USER_GROUP_UPDATE_SUCCESS,

    };
};

export const users = () => {
    return (dispatch, getState) => {
        console.log("innnn");
        dispatch(requestStart());
        let url = base.BASE_URL + "admin/user-lists";
        axios
                .get(url)
                .then(response => {
                    console.log(response.data.result)
                    dispatch(requestSuccess(response.data.result));
                })
                .catch(err => {
                    dispatch(forgotFail(err.response.data.error));
                });
    };
};


async function sentRequest() {

    let url = "https://jsonplaceholder.typicode.com/todos/1";
    // 'await' the response from fetch - no callback, you can just carry on
    // and use 'response' as normal rather than wrap it in a function!
    const response = await axios({
        method: 'get',
        url: url,

    });
   // response.json() is async too, but you don't need an 'await'
    // keyword in a return from 'async' (it's implied)
    return response;
}


export const dashboardData = () => {

    // this one's 'async'
    return async dispatch => {
        dispatch(requestStart());
        // wrap in try to listen for Promise rejections - equivalent of '.catch()'

        try {

            // wait for the fetch to finish then dispatch the result
            const response = await sentRequest();
            dispatch(dashboardRequestSuccess(response.data.result));
        } catch (e) {
            // catch errors from fetch
            dispatch(forgotFail(e.response.data.error));
        }
    };
};


async function fetchProfileInfo(id) {
    console.log("iddd",id);
    const postData = {
        user_id: id,
    };
    let url = base.BASE_URL + "admin/view-profile";
    // 'await' the response from fetch - no callback, you can just carry on
    // and use 'response' as normal rather than wrap it in a function!
    const response = await axios({
        method: 'POST',
        url: url,
        data: postData
    });
    return response;
}



export const userDetail = (id) => {
    return async dispatch => {
        dispatch(requestStart());
        try {
            const response = await fetchProfileInfo(id);
            dispatch(userDetailSuccess(response.data.result));
        } catch (e) {
            dispatch(forgotFail(e.response.data));
        }
    };
};



async function fetchGroups(status) {
    console.log("iddd",status);
    const postData = {
        user_id: status,
    };
    let url = base.BASE_URL + "admin/group-lists";
    // 'await' the response from fetch - no callback, you can just carry on
    // and use 'response' as normal rather than wrap it in a function!
    const response = await axios({
        method: 'POST',
        url: url,
        data: postData
    });
    return response;
}

export const groupLists = (status) => {
    return async dispatch => {
        dispatch(requestStart());
        try {
            const response = await fetchGroups(status);
            dispatch(fetchGroupSuccess(response.data.result));
        } catch (e) {
            dispatch(forgotFail(e.response.data));
        }
    };
};

async function statusChange(data) {
    const postData = {
        userId: data.id,
        status : data.status
    };
    let url = base.BASE_URL + "admin/change-status";
    // 'await' the response from fetch - no callback, you can just carry on
    // and use 'response' as normal rather than wrap it in a function!
    const response = await axios({
        method: 'POST',
        url: url,
        data: postData
    });
    return response;
}


export const changeStatus = (data) => {
    return async dispatch => {
        dispatch(requestStart());
        try {
            const response = await statusChange(data);
           // dispatch(userDetailSuccess(response.data.result));
        } catch (e) {
            //dispatch(forgotFail(e.response.data));
        }
    };
};

async function updateLevelData(data) {
    let url = base.BASE_URL + "admin/update-level";
    // 'await' the response from fetch - no callback, you can just carry on
    // and use 'response' as normal rather than wrap it in a function!
    const response = await axios({
        method: 'POST',
        url: url,
        data: data
    });
    return response;
}

export const updateLevel = (data) => {
    return async dispatch => {
        dispatch(requestStart());
        try {
            const response = await updateLevelData(data);
            dispatch(updateLevelSuccess());
        } catch (e) {
            dispatch(forgotFail(e.response.data.error));
        }
    };
};


async function updateGroupData(data) {
    let url = base.BASE_URL + "admin/update-user-group";
    // 'await' the response from fetch - no callback, you can just carry on
    // and use 'response' as normal rather than wrap it in a function!
    const response = await axios({
        method: 'POST',
        url: url,
        data: data
    });
    return response;
}


export const updateUserGroup = (data) => {
    return async dispatch => {
        dispatch(requestStart());
        try {
            const response = await updateGroupData(data);
            dispatch(updateGroupSuccess());
        } catch (e) {
            dispatch(forgotFail(e.response.data.error));
        }
    };
};

 /*async function updateLevelData(data) {
    console.log("File Data",data);
    let formdata = new FormData();


formdata.append("images", data)
console.log("formdata",formdata);
    let url = base.BASE_URL + "api/Upload";
    // 'await' the response from fetch - no callback, you can just carry on
    // and use 'response' as normal rather than wrap it in a function!
    const response = await axios({
        
        method: 'POST',
        url: url,
        data:formdata,
        
    });
    return response;
}*/
 
