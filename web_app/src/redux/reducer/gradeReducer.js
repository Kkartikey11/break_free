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


export const AddGradeReducer = (state = initialState, action) => {
    switch (action.type) {
      case grades.ADD_GRADE:
        // console.log(action.payload,action.type);
        return { ...state, data: action.payload };
  
      default:
        return { ...state };
    }
};
  
export const EditGradeReducer = (state = initialState, action) => {
  switch (action.type) {
    case grades.EDIT_GRADE:
      // console.log(action.payload,action.type);
      return { ...state, data: action.payload };

    default:
      return { ...state };
  }
};

export const DeleteGradeReducer = (state = initialState, action) => {
  switch (action.type) {
    case grades.DELETE_GRADE:
      // console.log(action.payload,action.type);
      return { ...state, data: action.payload };

    default:
      return { ...state };
  }
};