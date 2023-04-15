import { Button, Checkbox, Drawer, Form, Input, Select, theme } from "antd";
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
import styles from "./batch.moduler.css";
import { EditBatchesReducer } from "../../redux/reducer/batchReducer";
import { batchAction, editBatchesAction } from "../../redux/action/batch";

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
  const [selectStudentList, setSelectStudentList] = useState("");
  const [allSelectValue, setAllSelectValue] = useState(false);

  const onFinish = (values) => {
    const formData = {
      id: batchData.id,
      name: values.name ? values.name : batchData.name,
      students: values.students && values.students.length > 0 ? values.students : batchData.students,
      subject_id: values.subject_id ? values.subject_id : batchData.subject_id,
    };
    console.log(formData);
    setApiData(formData);
    dispatch(editBatchesAction(formData));
    dispatch(batchAction());
    setEditBatchOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    navigate("/web/batch");
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
        navigate("/web/batch");
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

  const onSelectCategoryChange = (checkedValues) => {
    setSelectStudentList(checkedValues);
  };

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
          width={500}
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
            {/* <Form
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
                  defaultValue={batchData.name}
                  style={{ width: "400px" }}
                />
              </Form.Item>

              <Form.Item
                style={{ fontWeight: "600" }}
                label="Description"
                name="description"
                rules={[
                  { message: "Please input your description!" },
                ]}
              >
                <Input defaultValue={batchData.description} />
              </Form.Item>

              <Form.Item
                name="subject_id"
                style={{ fontWeight: "600" }}
                label="Subject"
                required
                rules={[{ message: "Please select grade !" }]}
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
                rules={[{ message: "Please select grade !" }]}
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
            </Form> */}

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
                rules={[{ message: "Please input your name!" }]}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    for="subject_id"
                    style={{ fontWeight: "600", marginBottom: "10px" }}
                  >
                    {" "}
                    Name :
                  </label>
                  <Input defaultValue={batchData.name} style={{ width: "437px" }} />
                </div>
              </Form.Item>

              <Form.Item
                style={{ fontWeight: "600" }}
                name="description"
                rules={[
                  { message: "Please input your description!" },
                ]}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    for="subject_id"
                    style={{ fontWeight: "600", marginBottom: "10px" }}
                  >
                    {" "}
                    Description :
                  </label>
                  <Input defaultValue={batchData.description} style={{ width: "437px" }} />
                </div>
              </Form.Item>

              <Form.Item
                name="subject_id"
                style={{ fontWeight: "600" }}
                // label="Subject"
                required
                rules={[{ message: "Please select grade !" }]}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    for="subject_id"
                    style={{ fontWeight: "600", marginBottom: "10px" }}
                  >
                    {" "}
                    Subject :
                  </label>
                  <Select
                    placeholder="Please Select Subject"
                    defaultValue={batchData.subject}
                    showSearch
                    style={{
                      width: "437px",
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
                </div>
              </Form.Item>

              <div style={{ marginLeft: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  <label>Select Student :</label>
                </div>
                <div style={style.category}>
                  <Checkbox.Group onChange={onSelectCategoryChange}>
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
                      {studentList &&
                        studentList.map((item, index) => (
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

export default EditBatch;

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
