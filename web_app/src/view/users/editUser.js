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
import { EditUserReducer } from "../../redux/reducer/userReducer";
import { editUserAction, userAction } from "../../redux/action/user";

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
      id: userData.id,
      name: values.name ? values.name : userData.name,
      email: values.email ? values.email : userData.email,
      about: values.about ? values.about : userData.about,
      role_id: values.role_id ? values.role_id : userData.role_id
    };
    console.log(formData);
    setApiData(formData);
    dispatch(editUserAction(formData));
    dispatch(userAction());
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
            initialValues={{ remember: false }}
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
                { required: false, message: "Please input your name!" },
              ]}
            >
              <Input defaultValue={userData.name} style={{width:'340px'}} />
            </Form.Item>

            <Form.Item
              style={{ fontWeight: "600" }}
              label="Email"
              name="email"
              rules={[
                { required: false, message: "Please input your email!" },
              ]}
            >
              <Input defaultValue={userData.email} />
            </Form.Item>

            

            <Form.Item
              label="About"
              style={{ fontWeight: "600" }}
              name="about"
              rules={[
                { required: false, message: "Please input about user!" },
              ]}
            >
              <Input defaultValue={userData.about} style={{width:'336px'}} />
            </Form.Item>

            <Form.Item
              name="role_id"
              label="User Role"
              style={{ fontWeight: "600" }}
              rules={[
                { required: false, message: "Please select user role !" },
              ]}
              
            >
              <Select 
              placeholder="Please Select User Role" 
              showSearch
                  defaultValue={userData.role}
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
