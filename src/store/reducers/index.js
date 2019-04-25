import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import forgotPassword from "./forgotPasswordReducer";
import usersReducer from "./usersReducer";
import openChallengeReducer from "./openChallengeReducer";
import matchPlayedReducer from "./matchPlayedReducer";
import contentManagementReducer from "./contentManagementReducer";
import globalNotificationReducer from "./globalNotificationReducer";
import groupManagementReducer from "./groupManagementReducer";
import feedbackManagementReducer from "./feedbackManagementReducer";
import resetPasswordReducer from "./resetPasswordReducer";
import profileManagementReducer from "./profileManagementReducer";
export default combineReducers({
  loginReducer,
  forgotPassword,
  usersReducer,
  openChallengeReducer,
  matchPlayedReducer,
  contentManagementReducer,
  globalNotificationReducer,
  groupManagementReducer,
  feedbackManagementReducer,
  resetPasswordReducer,
  profileManagementReducer
});
