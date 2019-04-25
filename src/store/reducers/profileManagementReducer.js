import * as ActionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

const initialState = {
    isAuthenticated: localStorage.getItem('jwtToken') !== null,
    error: null,
    loading: null,
    profileList: [],
    groupData: [],
    success: false,
    error:false,
    locationMap: false
};

const requestStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const requestSuccess = (state, action) => {
    console.log("innnnnnn",action.profileList);
    return updateObject(state, {
        profileList: action.profileList,

    });
};

const updateSuccess = (state, action) => {
    //console.log("innnnnnn",state);
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

const successGroupById = (state, action) => {
    return updateObject(state, {
        groupData: action.groupData,
        loading: false
    });
};

const addGroupSuccess = (state,action) => {
    return updateObject(state, {
        success: true,
        error: false
    });
    
};
const responseFail = (state,action) => {
   
    return updateObject(state, {
        error: true,
        success: false
    });
    
};
const googleLocationMap = (state,action) => {
   
    return updateObject(state, {
        locationMap: true
    });
    
};
const profileManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.PROFILE_REQUEST_START:
            return requestStart(state, action);
        case ActionTypes.PROFILE_REQUEST_SUCCESS:
            return requestSuccess(state, action);
        case ActionTypes.PROFILE_REQUEST_FAIL:
            return authFail(state, action);
        case ActionTypes.PROFILE_BY_ID:
            return successGroupById(state, action);
        case ActionTypes.PROFILE_UPDATE_SUCCESS:
            return updateSuccess(state, action);
        case ActionTypes.PROFILE_RESPONSE_FAIL:
            return responseFail(state, action);
        default:
            return state;
}
};

export default profileManagementReducer;
