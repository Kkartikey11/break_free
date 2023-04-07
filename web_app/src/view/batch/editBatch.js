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
import { subjectAction } from "../../redux/action/subject";

const EditBatch = ({ isEditable }) => {
  const context = useContext(Context);
  const { editBatchOpen, setEditBatchOpen, batchData, setBatchData } = context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});
  const [gradeList, setGradeList] = useState("");
  const [subjectList, setSubjectList] = useState("");
  const [studentList, setStudentList] = useState("");

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
    setEditBatchOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    navigate("/student");
  };

  const onClose = () => {
    setEditBatchOpen(false);
    setBatchData("");
  };

  useEffect(() => {
    if (state.getSubject.data !== "") {
      if (state.getSubject.data.data.code === 200) {
        setSubjectList(state.getSubject.data.data.data);
      }
    }
    if (state.getStudent.data !== "") {
      if (state.getStudent.data.data.code === 200) {
        setStudentList(state.getStudent.data.data.data);
      }
    }
    if (state.addBatches.data !== "") {
      if (state.addBatches.data.data.code === 200) {
        navigate("/batch");
        window.location.reload();
      }
    }
  }, [state]);

  useEffect(() => {
    dispatch(subjectAction());
    dispatch(studentAction());
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      {batchData && (
        <Drawer
          className="container"
          title={
            <>
              <CloseOutlined onClick={onClose} /> <span>edit Batch</span>{" "}
            </>
          }
          width={450}
          closable={false}
          onClose={onClose}
          open={editBatchOpen}
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
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  defaultValue={batchData.name}
                  style={{ width: "400px" }}
                />
              </Form.Item>

              <Form.Item
                style={{ fontWeight: "600" }}
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input your description!" },
                ]}
              >
                <Input defaultValue={batchData.description} />
              </Form.Item>

              <Form.Item
                name="subject_id"
                style={{ fontWeight: "600" }}
                label="Subject"
                required
                rules={[{ required: true, message: "Please select grade !" }]}
              >
                <Select
                  placeholder="Please Select Subject"
                  showSearch
                  defaultValue={batchData.subject_id}
                  style={{
                    width: "400px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {subjectList &&
                    subjectList.map((data, index) => (
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
                name="students"
                style={{ fontWeight: "600" }}
                label="Student"
                required
                rules={[{ required: true, message: "Please select grade !" }]}
              >
                <Select
                  placeholder="Please Select Subject"
                  showSearch
                  defaultValue={batchData.students}
                  style={{
                    width: "400px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {studentList &&
                    studentList.map((data, index) => (
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

export default EditBatch;
