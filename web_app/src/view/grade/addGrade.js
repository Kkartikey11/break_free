import { Button, Form, Input, Select, theme } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import { addStudentAction } from "../../redux/action/student";
import { addGradeAction } from "../../redux/action/grade";

const AddGrade = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});
  const [gradeList, setGradeList] = useState("");

  const onFinish = (values) => {
    const formData = {
      name: values.name,
      description: values.description
    };
    console.log(formData);
    setApiData(formData);
    dispatch(addGradeAction(formData));
    navigate("/grade");
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    navigate("/grade");
  }

  useEffect(() => {
    if (state.getGrade.data !== "") {
      if (state.getGrade.data.data.code === 200) {
        setGradeList(state.getGrade.data.data.data);
      }
    }
    if (state.addGrade.data !== "") {
        if (state.addGrade.data.data.code === 200) {
          navigate("/grade");
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
        <h1>Add Grade</h1>
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
              style={{ fontWeight: "600" }}
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please description!" },
              ]}
            >
              <Input />
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

export default AddGrade;
