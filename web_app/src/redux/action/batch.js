import { batches } from "../constant";
import axios from "axios";

export const batchAction = (formInput) => (dispatch) => {
  const url = "http://localhost:1000/batch";
  const headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`,
  };
  axios.get(url, { headers})
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      dispatch({
        type: batches.GET_BATCHES,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
