import { subjects } from "../constant"

const initialState = {
    data: "",
}

export const subjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case subjects.GET_SUBJECTS:
            return {
              ...state,
                data: action.payload,
            }
        default:
            return state
    }
}