import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

const RootReducer = combineReducers({
    getUser: userReducer,
})

export default RootReducer;