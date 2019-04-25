import * as ActionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

const initialState = {
    isAuthenticated: localStorage.getItem('jwtToken') !== null,
    error: null, 
    loading: null,
    pagesList: [],
	pageData:{},
	success: false
};

const requestStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const requestSuccess = (state, action) => {
    return updateObject(state, {
        pagesList: action.pagesList,
        success: true	
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const getContentBySlug = (state, action) => {
    return updateObject(state, {
        pageData: action.pageData,
        loading: false
    });
};
const updateContentSuccess = (state, action) => {
    return updateObject(state, {
       
        success: true
    });
};







const contentManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.OPEN_CONTENT_REQUEST_START:
            return requestStart(state, action);
        case ActionTypes.OPEN_CONTENT_REQUEST_SUCCESS:
            return requestSuccess(state, action);
        case ActionTypes.OPEN_CONTENT_REQUEST_FAIL:
            return authFail(state, action);
		case ActionTypes.GET_CONTENT_BY_SLUG: 
            return getContentBySlug(state, action);
		case ActionTypes.UPDATE_CONTENT_REQUEST:
            return authFail(state, action);
            case ActionTypes.UPDATE_CONTENT_SUCCESS: 
            return updateContentSuccess(state, action);
		
        default:
            return state;
    }
};

export default contentManagementReducer;
