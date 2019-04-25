import * as ActionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

const initialState = {
    isAuthenticated: localStorage.getItem('jwtToken') !== null,
    error: null, 
    loading: null,
    acceptedChallengesList: []
};

const requestStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const requestAcceptedSuccess = (state, action) => {
    return updateObject(state, {
        acceptedChallengesList: action.acceptedChallengesList,
        error: null,
        loading: false
    });
};




const acceptedChallengeReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case ActionTypes.ACCEPTED_CHALLENGES_REQUEST_SUCCESS:
            return requestAcceptedSuccess(state, action);
       
        default:
            return state;
    }
};

export default acceptedChallengeReducer;
