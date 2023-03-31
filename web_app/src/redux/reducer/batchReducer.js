import { batches } from "../constant"

const initialState = {
    data: "",
}

export const batchReducer = (state = initialState, action) => {
    switch (action.type) {
        case batches.GET_BATCHES:
            return {
              ...state,
                data: action.payload,
            }
        default:
            return state
    }
}