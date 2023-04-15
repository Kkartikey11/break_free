import { notification } from "antd";
import { events } from "../constant";
import axios from "axios";
import { BASE_URL } from "../../config";
import Cookies from "universal-cookie";

export const eventAction = (formInput) => (dispatch) => {
  const cookies = new Cookies();
  const url = `${BASE_URL}/event`;
  const headers = {
    Authorization: `Bearer ${cookies.get('auth_token')}`,
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
  const cookies = new Cookies();
  const url =  `${BASE_URL}/event`;
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

export const editEventAction = (formInput) => (dispatch) => {
  const cookies = new Cookies();
  const url = `${BASE_URL}/event/${formInput.id}`;
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
        type: events.EDIT_EVENT,
        payload: response,
      });
    })
    .catch((err) => {
      notification.warning({
        message: `${err.response.data.message}`,
      });
    });
};

export const deleteEventAction = (formInput) => (dispatch) => {
  const cookies = new Cookies();
  const url = `${BASE_URL}/event/${formInput.id}/delete`;
  // const data = formInput;
  const headers = {
    Authorization: `Bearer ${cookies.get('auth_token')}`,
  };
  axios
    .post(url, { headers })
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
        type: events.DELETE_EVENT,
        payload: response,
      });
    })
    .catch((err) => {
      notification.warning({
        message: `${err.response.data.message}`,
      });
    });
};