import { Button, Form, Input, Select, theme } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import { addStudentAction } from "../../redux/action/student";
import { addGradeAction } from "../../redux/action/grade";
import { addEventAction } from "../../redux/action/event";

const AddEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});
  const [batchList, setBatchList] = useState("");
  const [monterList, setMentorList] = useState("");

  const onFinish = (values) => {
    const formData = {
      name: values.name,
      description: values.description,
      batch_id: values.batch_id,
      mentors: values.mentors,
      event_datetime: values.event_datetime,
    };
    console.log(formData);
    setApiData(formData);
    dispatch(addEventAction(formData));
    navigate("/events");
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    navigate("/events");
  }

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

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: "82vh",
          background: colorBgContainer,
        }}
      >
        <h1>Add Event</h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems:'center' }}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ marginTop: "30px" }}
          >
            <Form.Item
              label="Name"
              style={{ fontWeight: "600" }}
              name="name"
              rules={[
                { required: true, message: "Please input your name!" },
              ]}
            >
              <Input style={{width:'400px'}} />
            </Form.Item>

            <Form.Item
              label="Event Time"
              style={{ fontWeight: "600" }}
              name="event_datetime"
              rules={[
                { required: true, message: "Please input your name!" },
              ]}
            >
              <Input type="date" style={{width:'400px'}} />
            </Form.Item>

            <Form.Item
              style={{ fontWeight: "600" }}
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please description!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="batch_id"
              label="Batch"
              required
              rules={[
                { required: true, message: "Please select grade !" },
              ]}
              
            >
              <Select 
              placeholder="Please Select Subject" 
              showSearch
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
            </Form.Item>

            <Form.Item
              name="mentors"
              label="Mentors"
              required
              rules={[
                { required: true, message: "Please select grade !" },
              ]}
              
            >
              <Select 
              placeholder="Please Select Subject" 
              showSearch
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
            </Form.Item>

            <Form.Item >
              <Button htmlType="submit" onClick={onCancel} style={{marginRight:'20px'}}>
                Cancel
              </Button>

              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </>
  );
};

export default AddEvent;
