import { Button, Drawer, Form, Input, Select, theme } from "antd";
import { Option } from "antd/es/mentions";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import { editSubjectAction, subjectAction } from "../../redux/action/subject";
import { gradeAction } from "../../redux/action/grade";
import PropTypes from "prop-types";
import Context from "../../components/sidebar/context/Context";
import { CloseOutlined } from "@ant-design/icons";

const EditSubject = ({ isEditable }) => {
  const context = useContext(Context);
  const { editSubjectOpen, setEditSubjectOpen, subjectData, setSubjectData } =
    context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});
  const [gradeList, setGradeList] = useState("");

  console.log(subjectData);

  const onFinish = (values) => {
    const formData = {
      id: subjectData.id,
      name: values.name
        ? values.name
        : subjectData.name
        ? subjectData.name
        : "",
      description: values.description
        ? values.description
        : subjectData.description
        ? subjectData.description
        : "",
    };
    console.log(formData);
    setApiData(formData);
    dispatch(editSubjectAction(formData));
    dispatch(editSubjectAction());
    setEditSubjectOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    navigate("/web/student");
  };

  const onClose = () => {
    setEditSubjectOpen(false);
    setSubjectData("");
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
      {subjectData && (
        <Drawer
          className="container"
          title={
            <>
              <CloseOutlined onClick={onClose} /> <span> Edit Subject</span>{" "}
            </>
          }
          width={450}
          closable={false}
          onClose={onClose}
          open={editSubjectOpen}
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
              {/* <Form.Item
                label="Subject Name"
                style={{ fontWeight: "600" }}
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  defaultValue={subjectData.name}
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
                <Input defaultValue={subjectData.description} />
              </Form.Item> */}

              <Form.Item style={{ fontWeight: "600" }} name="name" required>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "600", marginBottom: "10px" }}>
                    {" "}
                    Name :
                  </label>
                  <Input style={{ width: "400px" }} defaultValue={subjectData.name} required />
                </div>
              </Form.Item>

              <Form.Item style={{ fontWeight: "600" }} name="description">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "600", marginBottom: "10px" }}>
                    {" "}
                    Description :
                  </label>
                  <Input defaultValue={subjectData.description} style={{ width: "400px" }} />
                </div>
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

export default EditSubject;
