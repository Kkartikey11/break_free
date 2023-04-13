import { auth } from "../constant"

const initialState = {
    data: "",
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case auth.AUTH_LOGIN:
        // console.log(action.payload,action.type);
        return { ...state, data: action.payload };
  
      default:
        return { ...state };
    }
  };