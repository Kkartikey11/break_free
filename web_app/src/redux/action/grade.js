import { notification } from "antd";
import { grades } from "../constant";
import axios from "axios";
import { BASE_URL } from "../../config";
import Cookies from "universal-cookie";

export const gradeAction = (formInput) => (dispatch) => {
  const cookies = new Cookies();
  const url = `${BASE_URL}/grade`;
  const headers = {
    Authorization: `Bearer ${cookies.get('auth_token')}`,
  };
  axios.get(url, { headers})
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      dispatch({
        type: grades.GET_GRADES,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};



export const addGradeAction = (formInput) => (dispatch) => {
  const cookies = new Cookies();
  const url =  `${BASE_URL}/grade`;
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
        type: grades.ADD_GRADE,
        payload: response,
      });
    })
    .catch((err) => {
      notification.warning({
        message: `${err.response.data.message}`,
      });
    });
};