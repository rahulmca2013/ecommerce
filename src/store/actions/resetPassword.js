import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as base from "../../config/const";

export const resetPasswordFail = error => {
    return {
        type: actionTypes.RESET_PASSWORD_RESPONSE_FAIL,
        error: error
    };
};
export const resetPasswordStart = () => {
    return {
        type: actionTypes.RESET_PASSWORD_REQUEST_START
    };
};
export const resetPasswordSuccess = (response) => {

    return {
        type: actionTypes.RESET_PASSWORD_SUCCESS,
        response
    };
};




async function sentRequest(data) {
    let url = base.BASE_URL + "admin/reset-password";
    // 'await' the response from fetch - no callback, you can just carry on
    // and use 'response' as normal rather than wrap it in a function!
    const response = await axios({
        method: 'POST',
        url: url,
        data: data
    });
   // response.json() is async too, but you don't need an 'await'
    // keyword in a return from 'async' (it's implied)
    return response;
}



export const updatePassword = (data) => {
    // this one's 'async'
    return async dispatch => {
        dispatch(resetPasswordStart());
        // wrap in try to listen for Promise rejections - equivalent of '.catch()'

        try {

            // wait for the fetch to finish then dispatch the result
            const response = await sentRequest(data);


            dispatch(resetPasswordSuccess(response.data));
        } catch (e) {
            // catch errors from fetch
            dispatch(resetPasswordFail(e.response.data));
        }
    };
};

