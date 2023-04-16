import { Button, Checkbox, DatePicker, Drawer, Form, Input, Select, Space, theme } from "antd";
import { Option } from "antd/es/mentions";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import { addStudentAction, studentAction } from "../../redux/action/student";
import { gradeAction } from "../../redux/action/grade";
import PropTypes from "prop-types";
import Context from "../../components/sidebar/context/Context";
import { addEventAction, editEventAction, eventAction } from "../../redux/action/event";
import { CloseOutlined } from "@ant-design/icons";
import { subjectAction } from "../../redux/action/subject";
import { userAction } from "../../redux/action/user";
import { batchAction } from "../../redux/action/batch";
import styles from "../batch/batch.moduler.css";
import dayjs from 'dayjs';

const EditEvent = ({ isEditable }) => {
  const context = useContext(Context);
  const { editEventOpen, setEditEventOpen, eventData, setEventData } = context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});
  const [batchList, setBatchList] = useState("");
  const [monterList, setMentorList] = useState("");
  const [mantors, setMentors] = useState([]);
  const [date, setDate] = useState("");

  console.log(eventData);

  const onFinish = (values) => {
    const formData = {
      id: eventData.id,
      name: values.name ? values.name : eventData.name,
      description: values.description ? values.description : eventData.description,
      batch_id: values.batch_id ? values.batch_id : eventData.batch_id,
      mentors: mantors ? mantors : eventData.mentors,
      event_datetime: values.event_datetime ? values.event_datetime : eventData.event_datetime,
    };
    setApiData(formData);
    dispatch(editEventAction(formData));
    dispatch(eventAction());
    navigate("/web/events");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onClose = () => {
    setEditEventOpen(false);
    setEventData("");
  };

  useEffect(() => {
    if (state.getBatches.data !== "") {
      if (state.getBatches.data.data.code === 200) {
        setBatchList(state.getBatches.data.data.data);
      }
    }
    if (state.getUser.data !== "") {
      if (state.getUser.data.data.code === 200) {
        setMentorList(state.getUser.data.data.data);
      }
    }
    if (state.addGrade.data !== "") {
      if (state.addGrade.data.data.code === 200) {
        navigate("/events");
        window.location.reload();
      }
    }
  }, [state]);

  useEffect(() => {
    dispatch(userAction());
    dispatch(batchAction());
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onChange = (date) => {
    console.log(date);
    setDate(date);
  };

  const onSelectMentorChange = (checkedValues) => {
    setMentors(checkedValues);
  };

  const dateFormat = 'YYYY-MM-DD, hh:mm';

  console.log(eventData.event_datetime);
  let defaultDate =  new Date(eventData.event_datetime).toLocaleDateString();
  

  return (
    <>
      {eventData && (
        <Drawer
          className="container"
          title={
            <>
              <CloseOutlined onClick={onClose} /> <span>edit Event</span>{" "}
            </>
          }
          width={450}
          closable={false}
          onClose={onClose}
          open={editEventOpen}
          style={{ overflowY: "auto" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
           
            <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ marginTop: "30px" }}
          >
            <Form.Item
              style={{ fontWeight: "600" }}
              name="name"
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{ fontWeight: "600", marginBottom: "10px" }}
                  >
                    {" "}
                    Name :
                  </label>
              <Input  defaultValue={eventData.name} style={{width:'400px'}} />
              </div>
            </Form.Item>

            <Form.Item
              style={{ fontWeight: "600" }}
              name="event_datetime"
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{ fontWeight: "600", marginBottom: "10px" }}
                  >
                    {" "}
                    Event Time :
                  </label>
              {/* <Input defaultValue={eventData.event_datetime}  style={{width:'400px'}} /> */}

              <Space direction="vertical">
                  <DatePicker
                    showTime
                    defaultValue={dayjs(eventData.event_datetime, dateFormat)}
                    format="YYYY-MM-DD HH:mm"
                    onChange={onChange}
                  />
                </Space>
              </div>
            </Form.Item>

            <Form.Item
              style={{ fontWeight: "600" }}
              name="description"
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{ fontWeight: "600", marginBottom: "10px" }}
                  >
                    {" "}
                    Description :
                  </label>
              <Input defaultValue={eventData.description} style={{ width: "400px" }} />
              </div>
            </Form.Item>

            <Form.Item
              name="batch_id"
              style={{ fontWeight: "600" }}
              
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    for="subject_id"
                    style={{ fontWeight: "600", marginBottom: "10px" }}
                  >
                    {" "}
                    Batch :
                  </label>
              <Select 
              placeholder="Please Select Batch" 
              showSearch
              defaultValue={eventData.batch_id}
              style={{width:'400px', textAlign: 'center', fontWeight:'600'}}
              >
                {batchList &&
                  batchList.map((data, index) => (
                    <Option
                      value={data.id}
                      key={index}
                      disabled={data.disabled}
                    >
                      {data && data.name}
                    </Option>
                  ))}
              </Select>
              </div>
            </Form.Item>

            {/* <Form.Item
              name="mentors"
              style={{ fontWeight: "600" }}
              
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{ fontWeight: "600", marginBottom: "10px" }}
                  >
                    {" "}
                    Mentors :
                  </label>
              <Select 
              placeholder="Please Select monter" 
              showSearch
               defaultValue={eventData.mentors}
              style={{width:'400px', textAlign: 'center', fontWeight:'600'}}
              >
                {monterList &&
                  monterList.map((data, index) => (
                    <Option
                      value={data.id}
                      key={index}
                      disabled={data.disabled}
                    >
                      {data && data.name}
                    </Option>
                  ))}
              </Select>
              </div>
            </Form.Item> */}

<div style={{ marginLeft: "10px" }}>
              <div
                style={{
                  display: "flex",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                <label>Select Mentors :</label>
              </div>
              <div style={style.category}>
                <Checkbox.Group onChange={onSelectMentorChange}>
                  <div
                    className={styles.selectGroup}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      gap: "15px",
                      height: "100px",
                      overflowX: "hidden",
                      overflowY: "scroll",
                      marginBottom: "20px",
                      marginTop: "20px",
                    }}
                  >
                    {monterList &&
                      monterList.map((item, index) => (
                        <Checkbox
                          value={item.id}
                          style={{ width: "160px", marginLeft: "8px" }}
                        >
                          {item.name}
                        </Checkbox>
                      ))}
                  </div>
                </Checkbox.Group>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "30px",
              }}
            >
              <Form.Item>
                <Button
                  htmlType="submit"
                  onClick={onClose}
                  style={{ marginRight: "20px" }}
                >
                  Cancel
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "#000" }}
                >
                  Update
                </Button>
              </Form.Item>
            </div>
          </Form>
          </div>
        </Drawer>
      )}
    </>
  );
};

export default EditEvent;

const style = {
  date: {
    display: "flex",
    gap: "40px",
  },
  dateInput: {
    height: "40px",
  },
  category: {
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
  },
};
