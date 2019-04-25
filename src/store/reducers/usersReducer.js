import * as ActionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

const initialState = {
    isAuthenticated: localStorage.getItem('jwtToken') !== null,
    error: null, 
    loading: null,
    usersList: [],
    userDetail:[],
    success : false,
    error :false,
    groupsuccess:false,
    groupsList :[],
};

const requestStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const requestSuccess = (state, action) => {
	
    return updateObject(state, {
        usersList: action.usersList,
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

const userDetailSuccess = (state, action) => {
    
    return updateObject(state, {
        userDetail: action.userDetail,

    });
};

const userLevelSuccess = (state, action) => {
    
    return updateObject(state, {
        success : true,
        error : false,

    });
};
const userGROUPSuccess = (state, action) => {
    
    return updateObject(state, {
        groupsuccess : true,
        error : false,

    });
};

const groupList = (state, action) => {
	
    return updateObject(state, {
        groupsList: action.groupsList,
        error: null,
        loading: false
    });
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.USERS_REQUEST_START:
            return requestStart(state, action);
        case ActionTypes.USERS_REQUEST_SUCCESS:
            return requestSuccess(state, action);
        case ActionTypes.USERS_REQUEST_FAIL:
            return authFail(state, action);
        case ActionTypes.USERS_DETAIL_SUCCESS:
            return userDetailSuccess(state, action);
        case ActionTypes.LEVEL_UPDATE_SUCCESS:
            return userLevelSuccess(state, action);
        case ActionTypes.USER_GROUP_UPDATE_SUCCESS:
            return userGROUPSuccess(state, action); 
            case ActionTypes.GROUPS_REQUEST_SUCCESS:
            return groupList(state, action); 
        
        default:
            return state;
    }
};

export default usersReducer;
