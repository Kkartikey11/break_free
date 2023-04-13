import { notification } from "antd";
import { subjects } from "../constant";
import axios from "axios";
import { BASE_URL } from "../../config";
import Cookies from "universal-cookie";

export const subjectAction = (formInput) => (dispatch) => {
  const cookies = new Cookies();
  const url = `${BASE_URL}/subject`;
  const headers = {
    Authorization: `Bearer ${cookies.get('auth_token')}`,
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


export const addSubjectAction = (formInput) => (dispatch) => {
  const cookies = new Cookies();
  const url = `${BASE_URL}/subject`;
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
        type: subjects.ADD_SUBJECT,
        payload: response,
      });
    })
    .catch((err) => {
      notification.warning({
        message: `${err.response.data.message}`,
      });
    });
};