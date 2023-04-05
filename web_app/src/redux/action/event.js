import { notification } from "antd";
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


export const addEventAction = (formInput) => (dispatch) => {
  const url = 'http://localhost:1000/event';
  const data = formInput;
  const headers = { Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` };
  axios
    .post(url, data, { headers })
    .then((response) => {
      if (response.status === 200) {
        notification.success({
          message: `${response.data.message}`,
        });
      }
      dispatch({
        type: events.ADD_EVENTS,
        payload: response,
      });
    })
    .catch((err) => {
      notification.warning({
        message: `${err.response.data.message}`,
      });
    });
};