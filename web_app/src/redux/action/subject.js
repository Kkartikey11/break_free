import { subjects } from "../constant";
import axios from "axios";

export const subjectAction = (formInput) => (dispatch) => {
  const url = "http://localhost:1000/subject";
  const headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`,
  };
  axios.get(url, { headers})
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      dispatch({
        type: subjects.GET_SUBJECTS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
