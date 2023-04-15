import { Button, Drawer, Form, Input, Select, theme } from "antd";
import { Option } from "antd/es/mentions";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import { addStudentAction, editStudentAction, studentAction } from "../../redux/action/student";
import { gradeAction } from "../../redux/action/grade";
import PropTypes from "prop-types";
import Context from "../../components/sidebar/context/Context";
import { CloseOutlined } from "@ant-design/icons";

const EditStudent = ({ isEditable }) => {
  const context = useContext(Context);
  const { studentData, setStudentData, editStudentOpen, setEditStudentOpen } =
    context;
  console.log(studentData);
  console.log(isEditable);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});
  const [gradeList, setGradeList] = useState("");

  const onFinish = (values) => {
    const formData = {
      id: studentData.id,
      name: values.name ? values.name : studentData.name,
      email: values.email ? values.email : studentData.email,
      grade_id: values.grade_id ? values.grade_id : studentData.grade_id,
    };
    console.log(formData);
    setApiData(formData);
    dispatch(editStudentAction(formData));
    dispatch(studentAction());
    setEditStudentOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    navigate("/web/student");
  };

  const onClose = () => {
    setEditStudentOpen(false);
    setStudentData("");
  };

  useEffect(() => {
    if (state.getGrade.data !== "") {
      if (state.getGrade.data.data.code === 200) {
        setGradeList(state.getGrade.data.data.data);
      }
    }
    if (state.addStudent.data !== "") {
      if (state.addStudent.data.data.code === 200) {
        navigate("/web/student");
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
      {studentData && (
        <Drawer
          className="container"
          title={
            <>
              <CloseOutlined onClick={onClose} /> <span>edit Student</span>{" "}
            </>
          }
          width={450}
          closable={false}
          onClose={onClose}
          open={editStudentOpen}
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
                rules={[{ message: "Please input your name!" }]}
              >
                <Input
                  defaultValue={studentData.name}
                  style={{ width: "300px" }}
                />
              </Form.Item>

              <Form.Item
                style={{ fontWeight: "600" }}
                label="Email"
                name="email"
                rules={[
                  { message: "Please input your email!" },
                ]}
              >
                <Input defaultValue={studentData.email} />
              </Form.Item>

              <Form.Item
                name="grade_id"
                label="Grade"
                required
                rules={[{ message: "Please select grade !" }]}
              >
                <Select
                  placeholder="Please Select Grade"
                  showSearch
                  style={{ width: "300px", textAlign: "center" }}
                  defaultValue={studentData.grade}
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

export default EditStudent;
