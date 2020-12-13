import * as pdpReducer from "./pdp.reducer";
import { combineReducers } from "redux";

export default combineReducers({
    ...pdpReducer
})