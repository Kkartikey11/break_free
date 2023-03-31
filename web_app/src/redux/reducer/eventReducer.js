import { events } from "../constant"

const initialState = {
    data: "",
}

export const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case events.GET_EVENTS:
            return {
              ...state,
                data: action.payload,
            }
        default:
            return state
    }
}


export const AddEventReducer = (state = initialState, action) => {
    switch (action.type) {
      case events.ADD_EVENTS:
        // console.log(action.payload,action.type);
        return { ...state, data: action.payload };
  
      default:
        return { ...state };
    }
  };