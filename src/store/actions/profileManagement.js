import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as base from "../../config/const";

export const responseFail = error => {
    return {
        type: actionTypes.PROFILE_RESPONSE_FAIL,
        error: error
    };
};
export const requestStart = () => {
    return {
        type: actionTypes.PROFILE_REQUEST_START,
    };
};
export const requestSuccess = (profileList) => {


    return {
        type: actionTypes.PROFILE_REQUEST_SUCCESS,
        profileList
    };
};

export const updateSuccess = () => {
    return {
        type: actionTypes.PROFILE_UPDATE_SUCCESS,

    };
};



async function fetchProfileInfo() {
    const postData = {
        user_id: localStorage.getItem('userId'),
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


export const viewProfile = email => {
    return async dispatch => {
        dispatch(requestStart());
        try {
            const response = await fetchProfileInfo();
            dispatch(requestSuccess(response.data.result));
        } catch (e) {
            dispatch(responseFail(e.response.data));
        }
    };
};




async function updateProfileInfo(data) {
    const postData = {
        user_id: localStorage.getItem('userId'),
    };
    let url = base.BASE_URL + "admin/update-profile";
    // 'await' the response from fetch - no callback, you can just carry on
    // and use 'response' as normal rather than wrap it in a function!
    const response = await axios({
        method: 'POST',
        url: url,
        data: data
    });
    return response;
}


export const updateProfile = (data) => {
    return async dispatch => {
        dispatch(requestStart());
        try {
            const response = await updateProfileInfo(data);
            dispatch(updateSuccess());
        } catch (e) {
            dispatch(responseFail(e.response.data.error));
        }
    };
};





/*export const updateProfile = (data) => {
    console.log("update-Group", data);
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
};*/


