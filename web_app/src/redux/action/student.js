import { student } from "../constant";
import axios from "axios";
import { notification } from "antd";
import { BASE_URL } from "../../config";
import Cookies from "universal-cookie";

export const studentAction = (formInput) => (dispatch) => {
  const cookies = new Cookies();
  const url = `${BASE_URL}/student`;
  const headers = {
    Authorization: `Bearer ${cookies.get('auth_token')}`,
  };
  axios.get(url, { headers})
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      dispatch({
        type: student.GET_STUDENTS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};


export const addStudentAction = (formInput) => (dispatch) => {
  const cookies = new Cookies();
  const url = `${BASE_URL}/student`;
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
        type: student.ADD_STUDENT,
        payload: response,
      });
    })
    .catch((err) => {
      notification.warning({
        message: `${err.response.data.message}`,
      });
    });
};

export const editStudentAction = (formInput) => (dispatch) => {
  const cookies = new Cookies();
  const url = `${BASE_URL}/student/${formInput.id}`;
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
        type: student.EDIT_STUDENT,
        payload: response,
      });
    })
    .catch((err) => {
      notification.warning({
        message: `${err.response.data.message}`,
      });
    });
};


export const deleteStudentAction = (formInput) => (dispatch) => {
  const cookies = new Cookies();
  const url = `${BASE_URL}/student/${formInput.id}/delete`;
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
        type: student.DELETE_STUDENT,
        payload: response,
      });
    })
    .catch((err) => {
      notification.warning({
        message: `${err.response.data.message}`,
      });
    });
};
