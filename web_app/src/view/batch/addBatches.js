import { Button, Drawer, Form, Input, Select, theme } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import Context from "../../components/sidebar/context/Context";
import { addBatchesAction, batchAction } from "../../redux/action/batch";
import { subjectAction } from "../../redux/action/subject";
import { studentAction } from "../../redux/action/student";
import { CloseOutlined } from "@ant-design/icons";

const AddBatches = () => {
  const context = useContext(Context);
  const { addBatchOpen, setAddBatchOpen } = context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});
  const [subjectList, setSubjectList] = useState("");
  const [studentList, setStudentList] = useState("");

  //api call
  const onFinish = (values) => {
    const formData = {
      name: values.name,
      description: values.description,
      subject_id: values.subject_id,
      students: values.students,
    };
    setApiData(formData);
    dispatch(addBatchesAction(formData));
    dispatch(batchAction());
    navigate("/batch");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onClose = () => {
    setAddBatchOpen(false);
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
      <Drawer
        className="container"
        title={
          <>
            <CloseOutlined onClick={onClose} /> <span>Add New Batch</span>{" "}
          </>
        }
        width={450}
        closable={false}
        onClose={onClose}
        open={addBatchOpen}
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
              <Input style={{ width: "400px" }} />
            </Form.Item>

            <Form.Item
              style={{ fontWeight: "600" }}
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <Input />
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

export default AddBatches;
