import { notification } from "antd";
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


export const addUserAction = (formInput) => (dispatch) => {
  const url = 'http://localhost:1000/users/register';
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
        type: user.ADD_USERS,
        payload: response,
      });
    })
    .catch((err) => {
      notification.warning({
        message: `${err.response.data.message}`,
      });
    });
};