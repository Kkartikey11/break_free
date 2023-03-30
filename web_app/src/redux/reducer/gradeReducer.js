import { grades } from "../constant"

const initialState = {
    data: "",
}

export const gradeReducer = (state = initialState, action) => {
    switch (action.type) {
        case grades.GET_GRADES:
            return {
              ...state,
                data: action.payload,
            }
        default:
            return state
    }
}