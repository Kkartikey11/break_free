import { user } from "../constant";
import axios from "axios";

export const userAction = (formInput) => (dispatch) => {
  const url = "http://localhost:1000/users";
  const headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`,
  };
  axios.get(url, { headers})
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      dispatch({
        type: user.GET_USERS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
