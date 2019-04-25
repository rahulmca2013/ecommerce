import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as base from "../../config/const";

export const requestFail = error => {
	
  return {
    type: actionTypes.NOTIFICATION_REQUEST_FAIL,
    
  };
};
export const setInitialState = (response) => {

    return {
        type: actionTypes.NOTIFICATION_INITIALIZE_STATE,
        response
    };
};

export const notificationinitializeState = () => {
   return dispatch => dispatch(setInitialState({success: false, error: false}));
}
export const requestStart = () => {
  return {
    type: actionTypes.NOTIFICATION_REQUEST_START,
  };
};
export const requestSuccess = (pagesList) => {
	
	return {
    type: actionTypes.NOTIFICATION_REQUEST_SUCCESS,
    pagesList
  };
};

export const gridSuccess = (gridData) => {
    console.log("notificationValue",gridData);
	
	return {
    type: actionTypes.NOTIFICATION_GRID_SUCCESS,
        gridData
  };
};





/*export const sentNotification = (data,slug) => {
    
  return (dispatch, getState) => {
	dispatch(requestStart());
    let url = base.BASE_URL+ "admin/global-notification/" ;
    axios
      .post(url, data)
      .then(response => {
		  //console.log(response.data.result)
		  dispatch(requestSuccess(response.data));
	  })
      .catch(err => {
		  
        dispatch(requestFail());
      });
  };
};*/



async function sentRequest(data) {
    
    let url = base.BASE_URL+ "admin/global-notification/" ;
    // 'await' the response from fetch - no callback, you can just carry on
    // and use 'response' as normal rather than wrap it in a function!
    return axios({
        method: 'POST',
        url: url,
        data: data
    });


    
}


export const sentNotification = (data,slug) => {

    // this one's 'async'
    return async dispatch => {
        dispatch(requestStart());
        // wrap in try to listen for Promise rejections - equivalent of '.catch()'
       
        try {

            // wait for the fetch to finish then dispatch the result
            const response = await sentRequest(data);
            
            
           dispatch(requestSuccess(response.data));
       
        } catch (e) {
            // catch errors from fetch
           dispatch(requestFail(e.response.data));
        }
    };
};


export const notificationLists = (data,slug) => {
    
  return (dispatch, getState) => {
	dispatch(requestStart());
    let url = base.BASE_URL+ "admin/notification-lists" ;
    axios
      .post(url, data)
      .then(response => {
		  //console.log(response.data.result)
		  dispatch(gridSuccess(response.data.result));
	  })
      .catch(err => {
		  
        dispatch(requestFail());
      });
  };
};