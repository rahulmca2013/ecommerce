import * as ActionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

const initialState = {
    isAuthenticated: localStorage.getItem('jwtToken') !== null,
    error: null, 
    loading: null,
    openChallengesList: [],
    acceptedChallengesList: []
	
};

const requestStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const requestSuccess = (state, action) => {
    return updateObject(state, {
        openChallengesList: action.openChallengesList,
        error: null,
        loading: false
    });
};
const requestAcceptedSuccess = (state, action) => {
    return updateObject(state, {
        acceptedChallengesList: action.acceptedChallengesList,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};




const openChallengeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.OPEN_CHALLENGES_REQUEST_START:
            return requestStart(state, action);
        case ActionTypes.OPEN_CHALLENGES_REQUEST_SUCCESS:
            return requestSuccess(state, action);
	case ActionTypes.ACCEPTED_CHALLENGES_REQUEST_SUCCESS:
            return requestAcceptedSuccess(state, action);
        case ActionTypes.OPEN_CHALLENGES_REQUEST_FAIL:
            return authFail(state, action);
        default:
            return state;
    }
};

export default openChallengeReducer;
