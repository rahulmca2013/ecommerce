import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as base from "../../config/const";

export const forgotFail = error => {
  return {
    type: actionTypes.MATCH_PLAYED_REQUEST_FAIL,
    error: error
  };
};
export const requestStart = () => {
  return {
    type: actionTypes.MATCH_PLAYED_REQUEST_START,
  };
};
export const requestSuccess = (matchPlayedList) => {
  return {
    type: actionTypes.MATCH_PLAYED_REQUEST_SUCCESS,
    matchPlayedList
  };
};
export const matchPlayed = () => {
  return (dispatch, getState) => {
	  console.log("open-challnge");
    dispatch(requestStart());
    let url = base.BASE_URL+ "admin/played-challenge-lists";
    axios
      .post(url)
      .then(response => {
		  console.log(response.data.result)
		  dispatch(requestSuccess(response.data.result));
	  })
      .catch(err => {
        dispatch(forgotFail(err.response.data.error));
      });
  };
};
