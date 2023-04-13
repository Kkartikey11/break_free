import { notification } from "antd";
import { batches } from "../constant";
import axios from "axios";
import { BASE_URL, auth_token } from "../../config";
import Cookies from "universal-cookie";

export const batchAction = (formInput) => (dispatch) => {
  const cookies = new Cookies();
  const url = `${BASE_URL}/batch`;
  const headers = {
    Authorization: `Bearer ${cookies.get('auth_token')}`,
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
  const cookies = new Cookies();
  const url = `${BASE_URL}/batch`;
  const data = formInput;
  const headers = {
    Authorization: `Bearer ${cookies.get('auth_token')}`,
  };
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