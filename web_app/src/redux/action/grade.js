import { grades } from "../constant";
import axios from "axios";

export const gradeAction = (formInput) => (dispatch) => {
  const url = "http://localhost:1000/grade";
  const headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`,
  };
  axios.get(url, { headers})
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      dispatch({
        type: grades.GET_GRADES,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
