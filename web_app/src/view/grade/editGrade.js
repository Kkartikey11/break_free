import { Button, Drawer, Form, Input, Select, theme } from "antd";
import { Option } from "antd/es/mentions";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import { addStudentAction, studentAction } from "../../redux/action/student";
import { editGradeAction, gradeAction } from "../../redux/action/grade";
import PropTypes from "prop-types";
import Context from "../../components/sidebar/context/Context";
import { CloseOutlined } from "@ant-design/icons";

const EditGrade = ({ isEditable }) => {
  const context = useContext(Context);
  const { editGradeOpen, setEditGradeOpen, gradeData, setGradeData } = context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});
  const [gradeList, setGradeList] = useState("");

  const onFinish = (values) => {
    const formData = {
      id: gradeData.id,
      name: values.name ? values.name : gradeData.name,
      description: values.description ? values.description : gradeData.description,
    };
    console.log(formData);
    setApiData(formData);
    dispatch(editGradeAction(formData) );
    dispatch(gradeAction());
    setEditGradeOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    navigate("/web/grade");
  };

  const onClose = () => {
    setEditGradeOpen(false);
    setGradeData("");
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
      {gradeData && (
        <Drawer
          className="container"
          title={
            <>
              <CloseOutlined onClick={onClose} /> <span> Edit Grade</span>{" "}
            </>
          }
          width={450}
          closable={false}
          onClose={onClose}
          open={editGradeOpen}
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
                  defaultValue={gradeData.name}
                  style={{ width: "400px" }}
                />
              </Form.Item>

              <Form.Item
                style={{ fontWeight: "600" }}
                label="Description"
                name="description"
                rules={[{ message: "Please description!" }]}
              >
                <Input defaultValue={gradeData.description} />
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

export default EditGrade;
