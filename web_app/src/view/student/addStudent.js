import { Button, Drawer, Form, Input, Select, theme } from "antd";
import { Option } from "antd/es/mentions";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import { addStudentAction, studentAction } from "../../redux/action/student";
import { gradeAction } from "../../redux/action/grade";
import PropTypes from 'prop-types';
import Context from "../../components/sidebar/context/Context";
import { CloseOutlined } from "@ant-design/icons";

const AddStudent = ({isEditable}) => {
  const context = useContext(Context);
  const { studentData, setStudentData, addStudentOpen, setAddStudentOpen } =
    context;
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
    setAddStudentOpen(false);
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    navigate("/web/student");
  }

  const onClose = () => {
    setAddStudentOpen(false);
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
      <Drawer
        className="container"
        title={
          <>
            <CloseOutlined onClick={onClose} /> <span>Create New Student</span>{" "}
          </>
        }
        width={450}
        closable={false}
        onClose={onClose}
        open={addStudentOpen}
        style={{ overflowY: "auto" }}
      >
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
              <Input style={{width:'300px'}} />
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
              style={{width:'300px', textAlign: 'center'}}
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
                  Add
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Drawer>
    </>
  );
};

AddStudent.propTypes = {
  isEditable: PropTypes.any
};

export default AddStudent;
