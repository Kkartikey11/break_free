import { notification } from "antd";
import { auth } from "../constant";
import Cookies from "universal-cookie";
import axios from "axios";
import { BASE_URL } from "../../config.js";

export const authAction = (formInput) => (dispatch) => {
  const cookies = new Cookies();
  const url = `${BASE_URL}/users/login`;
  const data = formInput;

  axios
    .post(url, data)
    .then((response) => {
      if (response.status === 200) {
        cookies.set("auth_token", response.data.auth_token, { path: "/" });
        notification.success({
          // message: `${response.data.message}`,
          message: "Login Successful",
        });
      }
      dispatch({
        type: auth.AUTH_LOGIN,
        payload: response,
      });
    })
    .catch((err) => {
      notification.warning({
        message: `${err.response.data.message}`,
      });
    });
};
