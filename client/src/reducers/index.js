import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import projectReducer from "./projectsReducer";
import centReducer from "./centReducer";
import messagesReducers from "./messagesReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  project: projectReducer,
  Cent: centReducer,
  messages: messagesReducers
});
