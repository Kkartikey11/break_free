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


export const AddBatchesReducer = (state = initialState, action) => {
    switch (action.type) {
      case batches.ADD_BATCHES:
        // console.log(action.payload,action.type);
        return { ...state, data: action.payload };
  
      default:
        return { ...state };
    }
};
  
export const EditBatchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case batches.EDIT_BATCHES:
      // console.log(action.payload,action.type);
      return { ...state, data: action.payload };

    default:
      return { ...state };
  }
};

export const DeleteBatchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case batches.DELETE_BATCHES:
      // console.log(action.payload,action.type);
      return { ...state, data: action.payload };

    default:
      return { ...state };
  }
};