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

export const AddSubjectReducer = (state = initialState, action) => {
    switch (action.type) {
      case subjects.ADD_SUBJECT:
        // console.log(action.payload,action.type);
        return { ...state, data: action.payload };
  
      default:
        return { ...state };
    }
};
  
export const EditSubjectReducer = (state = initialState, action) => {
    switch (action.type) {
      case subjects.ADD_SUBJECT:
        // console.log(action.payload,action.type);
        return { ...state, data: action.payload };
  
      default:
        return { ...state };
    }
  };