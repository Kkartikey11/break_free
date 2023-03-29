import { user } from "../constant"

const initialState = {
    data: "",
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case user.GET_USERS:
            return {
              ...state,
                data: action.payload,
            }
        default:
            return state
    }
}