import { student } from "../constant";
import axios from "axios";
import { notification } from "antd";

export const studentAction = (formInput) => (dispatch) => {
  const url = "http://localhost:1000/student";
  const headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`,
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
  const url = 'http://localhost:1000/student';
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
