import { notification } from "antd";
import { subjects } from "../constant";
import axios from "axios";

export const subjectAction = (formInput) => (dispatch) => {
  const url = "http://localhost:1000/subject";
  const headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`,
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
  const url = 'http://localhost:1000/subject';
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