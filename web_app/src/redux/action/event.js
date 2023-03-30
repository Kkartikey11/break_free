import { events } from "../constant";
import axios from "axios";

export const eventAction = (formInput) => (dispatch) => {
  const url = "http://localhost:1000/event";
  const headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`,
  };
  axios.get(url, { headers})
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      dispatch({
        type: events.GET_EVENTS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
