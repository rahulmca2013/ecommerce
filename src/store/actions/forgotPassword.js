import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as base from "../../config/const";

export const forgotFail = error => {
    return {
        type: actionTypes.FORGOT_FAIL,
        error: error
    };
};
export const forgotStart = () => {
    return {
        type: actionTypes.FORGOT_START
    };
};
export const forgotSuccess = (response) => {

    return {
        type: actionTypes.FORGOT_SUCCESS,
        response
    };
};

export const setInitialState = (response) => {

    return {
        type: actionTypes.INITIALIZE_STATE,
        response
    };
};
/*export const forgotPassword = email => {
 return async(dispatch, getState) => {
 dispatch(forgotStart());
 const forgotData = {
 email_id: email,
 type: 'admin',
 };
 
 let url = base.BASE_URL + "admin-forgot-password";
 await axios
 .post(url, forgotData)
 .then(response => {
 dispatch(forgotSuccess(response.data));
 })
 .catch(err => {
 dispatch(forgotFail(err.response.data));
 });
 };
 };*/

export const initializeState = () => {
   return dispatch => dispatch(setInitialState({success: false, error: false}));
}

export const sentRequest = (email) => {
    const data = new FormData();
    const forgotData = {
        email_id: email,
        type: 'admin',
    };
    let url = base.BASE_URL + "admin-forgot-password";
    // 'await' the response from fetch - no callback, you can just carry on
    // and use 'response' as normal rather than wrap it in a function!
    return axios({
        method: 'POST',
        url: url,
        data: forgotData
    });
}



export const forgotPassword = email => {

    // this one's 'async'
    return async dispatch => {
        dispatch(forgotStart());
        // wrap in try to listen for Promise rejections - equivalent of '.catch()'

        try {

            // wait for the fetch to finish then dispatch the result
            const response = await sentRequest(email);


            dispatch(forgotSuccess(response.data));



        } catch (e) {
            // catch errors from fetch
            dispatch(forgotFail(e.response.data));
        }
    };
};

