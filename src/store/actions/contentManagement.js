import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as base from "../../config/const";

export const forgotFail = error => {
    return {
        type: actionTypes.OPEN_CONTENT_REQUEST_FAIL,
        error: error
    };
};
export const requestStart = () => {
    return {
        type: actionTypes.OPEN_CONTENT_REQUEST_START,
    };
};
export const requestSuccess = (pagesList) => {
    return {
        type: actionTypes.OPEN_CONTENT_REQUEST_SUCCESS,
        pagesList
    };
};
export const contentSuccess = (pageData) => {
    return {
        type: actionTypes.GET_CONTENT_BY_SLUG,
        pageData
    };
};

export const updateContentSuccess = (pagesList) => {
    return {
        type: actionTypes.UPDATE_CONTENT_SUCCESS
        
    };
};

export const contentManagement = () => {
    return (dispatch, getState) => {
        console.log("open-challnge");
        dispatch(requestStart());
        let url = base.BASE_URL + "admin/content-management";
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
export const getContentBySlug = (slug) => {
    return (dispatch, getState) => {
        console.log("open-challnge");
        dispatch(requestStart());
        let url = base.BASE_URL + "page/" + slug;
        axios
                .get(url)
                .then(response => {
                    //console.log(response.data.result)
                    dispatch(contentSuccess(response.data.result));
                })
                .catch(err => {
                    dispatch(forgotFail(err.response.data.error));
                });
    };
};


export const setContent = (data, slug) => {
    console.log(data);
    return (dispatch, getState) => {
        console.log("open-challnge");
        dispatch(requestStart());
        let url = base.BASE_URL + "update-content/";
        axios
                .post(url, data)
                .then(response => {
                    //console.log(response.data.result)
                    dispatch(updateContentSuccess(response.data.result));
                })
                .catch(err => {
                    dispatch(forgotFail(err.response.data.error));
                });
    };
};