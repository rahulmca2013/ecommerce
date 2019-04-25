import * as ActionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

const initialState = {
    isAuthenticated: localStorage.getItem('jwtToken') !== null,
    error: null,
    loading: null,
    feedbackList: [],
    feedbackData: [],
    success: false,
    error:false,
    locationMap: false
};

const requestStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const setFeedbackState = (state = {}, action) => {
    console.log("actionnns", action);
    return updateObject(state, {...action.response});
};
const requestSuccess = (state, action) => {
    //console.log("innnnnnn",state);
    return updateObject(state, {
        feedbackList: action.feedbackList,

    });
};

const replySuccess = (state, action) => {
    
    return updateObject(state, {
        success: true
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const EmailById = (state, action) => {
    return updateObject(state, {
        feedbackData: action.feedbackData,
        loading: false
    });
};


const responseFail = (state,action) => {
   
    return updateObject(state, {
        error: true,
        success: false
    });
    
};

const feedbackManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FEEDBACK_REQUEST_START:
            return requestStart(state, action);
        case ActionTypes.FEEDBACK_REQUEST_SUCCESS:
            return requestSuccess(state, action);
       case ActionTypes.FEEDBACK_BY_ID:
            return EmailById(state, action);
        case ActionTypes.FEEDBACK_REPLY_SUCCESS:
            return replySuccess(state, action);
        case ActionTypes.FEEDBACK_RESPONSE_FAIL:
            return responseFail(state, action);
       case ActionTypes.FEEDBACK_INITIALIZE_STATE:
       return setFeedbackState(state, action);


        default:
            return state;
}
};

export default feedbackManagementReducer;
