import { Button, Form, Input, Select, theme } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import { addStudentAction } from "../../redux/action/student";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});
  const [gradeList, setGradeList] = useState("");

  const onFinish = (values) => {
    const formData = {
      name: values.name,
      email: values.email,
      grade_id: values.grade_id,
    };
    console.log(formData);
    setApiData(formData);
    dispatch(addStudentAction(formData));
    navigate("/student");
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    navigate("/student");
  }

  useEffect(() => {
    if (state.getGrade.data !== "") {
      if (state.getGrade.data.data.code === 200) {
        setGradeList(state.getGrade.data.data.data);
      }
    }
    if (state.addStudent.data !== "") {
        if (state.addStudent.data.data.code === 200) {
          navigate("/student");
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
        <h1>Add Student</h1>
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
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="grade_id"
              label="Grade"
              required
              rules={[
                { required: true, message: "Please select grade !" },
              ]}
              
            >
              <Select 
              placeholder="Please Select Grade" 
              showSearch
              style={{width:'400px', textAlign: 'center'}}
              >
                {gradeList &&
                  gradeList.map((data, index) => (
                    <Option
                      value={data.grade_id}
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

export default AddUser;
