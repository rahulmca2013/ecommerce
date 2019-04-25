import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as base from "../../config/const";

export const forgotFail = error => {
  return {
    type: actionTypes.OPEN_CHALLENGES_REQUEST_FAIL,
    error: error
  };
};
export const requestStart = () => {
  return {
    type: actionTypes.OPEN_CHALLENGES_REQUEST_START,
  };
};
export const requestSuccess = (openChallengesList) => {
  return {
    type: actionTypes.OPEN_CHALLENGES_REQUEST_SUCCESS,
    openChallengesList
  };
};


export const requestAcceptedSuccess = (acceptedChallengesList) => {
    
  return {
    type: actionTypes.ACCEPTED_CHALLENGES_REQUEST_SUCCESS,
    acceptedChallengesList
  };
};

export const challenges = () => {
  return (dispatch, getState) => {
	  console.log("open-challnge");
    dispatch(requestStart());
    let url = base.BASE_URL+ "admin/open-challenges";
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


export const acceptedchallenges = () => {
	return (dispatch, getState) => {
	  console.log("open-challnge");
    dispatch(requestStart());
    let url = base.BASE_URL+ "admin/accepted-challenge-lists";
    axios
      .post(url)
      .then(response => {
		  console.log(response.data.result)
		  dispatch(requestAcceptedSuccess(response.data.result));
	  })
      .catch(err => {
        dispatch(forgotFail(err.response.data.error));
      });
  };
};
