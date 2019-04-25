import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
const initialState = {
    error: null, 
    loading: null,
    success: false,
    response:[]
	
};
const setInitialState = (state = {}, action) => {
    console.log("actionnns",action);
  return updateObject(state, {...action.response});
};
const forgotStart = (state = {}, action) => {
  return updateObject(state, { error: null,success: false, loading: true });
};

const forgotReducerSuccess = (state, action) => {
    
  return updateObject(state, {
      response: action.response,
    error: null,
    success:true,
    loading: false
  });
 
  
};

const forgotFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export const forgotReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FORGOT_START:
      return forgotStart(state, action);
    case actionTypes.FORGOT_SUCCESS:
      return forgotReducerSuccess(state, action);
    case actionTypes.FORGOT_FAIL:
      return forgotFail(state, action);
    case actionTypes.INITIALIZE_STATE:
      return setInitialState(state, action);
    default:
      return state;
  }
};
export default forgotReducer;
