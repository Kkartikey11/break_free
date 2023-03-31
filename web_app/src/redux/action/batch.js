import { notification } from "antd";
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


export const addBatchesAction = (formInput) => (dispatch) => {
  const url = 'http://localhost:1000/batch';
  const data = formInput;
  const headers = { Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` };
  axios
    .post(url, data, { headers })
    .then((response) => {
      if (response.status === 200) {
        notification.success({
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
      dispatch({
        type: batches.ADD_BATCHES,
        payload: response,
      });
    })
    .catch((err) => {
      notification.warning({
        message: `${err.response.data.message}`,
      });
    });
};