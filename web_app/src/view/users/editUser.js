import { Button, Drawer, Form, Input, Select, theme } from "antd";
import { Option } from "antd/es/mentions";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import { addStudentAction, studentAction } from "../../redux/action/student";
import { gradeAction } from "../../redux/action/grade";
import PropTypes from "prop-types";
import Context from "../../components/sidebar/context/Context";
import { CloseOutlined } from "@ant-design/icons";

const EditUser = ({ isEditable }) => {
  const context = useContext(Context);
  const { editUserOpen, setEditUserOpen, userData, setUserData } = context;
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
    dispatch(studentAction());
    setEditUserOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    navigate("/student");
  };

  const onClose = () => {
    setEditUserOpen(false);
    setUserData("");
  };

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

  useEffect(() => {
    dispatch(gradeAction());
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      {userData && (
        <Drawer
          className="container"
          title={
            <>
              <CloseOutlined onClick={onClose} /> <span> Edit User</span>{" "}
            </>
          }
          width={450}
          closable={false}
          onClose={onClose}
          open={editUserOpen}
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
              label="Name"
              style={{ fontWeight: "600" }}
              name="name"
              rules={[
                { required: true, message: "Please input your name!" },
              ]}
            >
              <Input defaultValue={userData.name} style={{width:'340px'}} />
            </Form.Item>

            <Form.Item
              style={{ fontWeight: "600" }}
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input defaultValue={userData.email} />
            </Form.Item>

            <Form.Item
              label="Password"
              style={{ fontWeight: "600" }}
              name="password"
              rules={[
                { required: true, message: "Please input your name!" },
              ]}
            >
              <Input defaultValue={userData.password} style={{width:'317px'}} />
            </Form.Item>

            <Form.Item
              label="About"
              style={{ fontWeight: "600" }}
              name="about"
              rules={[
                { required: true, message: "Please input about user!" },
              ]}
            >
              <Input defaultValue={userData.about} style={{width:'336px'}} />
            </Form.Item>

            <Form.Item
              name="role_id"
              label="User Type"
              style={{ fontWeight: "600" }}
              required
              rules={[
                { required: true, message: "Please select grade !" },
              ]}
              
            >
              <Select 
              placeholder="Please Select User Type" 
              showSearch
              defaultValue={userData.role_id}
              style={{width:'310px',fontWeight: "600", textAlign: 'center'}}
              >
                    <Option
                      value="2"
                    >
                      Admin
                    </Option>
                    <Option
                      value="3"
                    >
                      Mentor
                    </Option>
              </Select>
            </Form.Item>

            <div style={{display:'flex', justifyContent:'end', marginTop:'30px'}}>
              <Form.Item>
                <Button
                  htmlType="submit"
                  onClick={onClose}
                  style={{ marginRight: "20px" }}
                >
                  Cancel
                </Button>

                <Button type="primary" htmlType="submit" style={{backgroundColor:'#000'}}>
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

export default EditUser;
