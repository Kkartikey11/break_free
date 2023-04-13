import { notification } from "antd";
import { user } from "../constant";
import axios from "axios";
import { BASE_URL } from "../../config";
import Cookies from "universal-cookie";

export const userAction = (formInput) => (dispatch) => {
  const cookies = new Cookies();
  const url =  `${BASE_URL}/users`;
  const headers = {
    Authorization: `Bearer ${cookies.get('auth_token')}`,
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
  const cookies = new Cookies();
  const url = `${BASE_URL}/users/register`;
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