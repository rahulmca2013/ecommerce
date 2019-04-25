import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
const initialState = {
    error: null, 
    loading: null,
    success: false,
    response:[]
	
};

const resetPasswordStart = (state = {}, action) => {
  return updateObject(state, { error: null,success: false, loading: true });
};

const resetPasswordSuccess = (state, action) => {
    
  return updateObject(state, {
     response: action.response,
    error: null,
    success:true,
    loading: false
  });
 
  
};

const resetPasswordFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_PASSWORD_REQUEST_START:
      return resetPasswordStart(state, action);
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return resetPasswordSuccess(state, action);
    case actionTypes.RESET_PASSWORD_RESPONSE_FAIL:
      return resetPasswordFail(state, action);
    default:
      return state;
  }
};
export default resetPasswordReducer;
