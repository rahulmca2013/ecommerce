import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as base from "../../config/const";

export const responseFail = error => {
    return {
        type: actionTypes.FEEDBACK_RESPONSE_FAIL,
        error: error
    };
};
export const setInitialState = (response) => {

    return {
        type: actionTypes.FEEDBACK_INITIALIZE_STATE,
        response
    };
};

export const feedbackInitializeState = () => {
   return dispatch => dispatch(setInitialState({success: false, error: false}));
}
export const requestStart = () => {
    return {
        type: actionTypes.FEEDBACK_REQUEST_START,
    };
};
export const responseSuccess = (feedbackList) => {


    return {
        type: actionTypes.FEEDBACK_REQUEST_SUCCESS,
        feedbackList
    };
};

export const replySuccess = () => {
    return {
        type: actionTypes.FEEDBACK_REPLY_SUCCESS,
        
    };
};
export const successContactById = (feedbackData) => {
   
    return {
        type: actionTypes.FEEDBACK_BY_ID,
        feedbackData
    };
};


export const feedbackManagement = () => {
    return (dispatch, getState) => {
        console.log("group-lists");
        dispatch(requestStart());
        let url = base.BASE_URL + "admin/feedback-lists";
        axios
                .post(url)
                .then(response => {
                    console.log(response.data.result)
                    dispatch(responseSuccess(response.data.result));
                })
                .catch(err => {
                    dispatch(responseFail(err.response.data.error));
                });
    };
};
export const getContactEmailById = (id) => {
   
    return (dispatch, getState) => {
        console.log("get-group-by-id");
        dispatch(requestStart());
        let url = base.BASE_URL + "admin/feedback-info/" + id;
        axios
                .get(url)
                .then(response => {
                    //console.log(response.data.result)
                    dispatch(successContactById(response.data.result));
                })
                .catch(err => {
                    dispatch(responseFail(err.response.data.error));
                });
    };
};


export const sendReply = (data, id) => {
    console.log("Reply-Data",data);
    return (dispatch, getState) => {
        dispatch(requestStart());
        let url = base.BASE_URL + "admin/feedback-reply/";
        axios
                .post(url, data)
                .then(response => {
                    //console.log(response.data.result)
                    dispatch(replySuccess());
                })
                .catch(err => {
                    dispatch(responseFail(err.response.data.error));
                });
    };
};


