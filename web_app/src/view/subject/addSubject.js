import { Button, Drawer, Form, Input, Select, theme } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import Context from "../../components/sidebar/context/Context";
import { addBatchesAction } from "../../redux/action/batch";
import { addSubjectAction, subjectAction } from "../../redux/action/subject";
import { CloseOutlined } from "@ant-design/icons";

const AddSubject = () => {
  const context = useContext(Context);
  const { addSubjectOpen, setAddSubjectOpen } = context;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});

  //api call
  const onFinish = (values) => {
    const formData = {
      name: values.name,
      description: values.description,
    };
    console.log(formData);
    setApiData(formData);
    dispatch(addSubjectAction(formData));
    dispatch(subjectAction());
    navigate("/subject");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (state.addBatches.data !== "") {
      if (state.addBatches.data.data.code === 200) {
        navigate("/subject");
        window.location.reload();
      }
    }
  }, [state]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClose = () => {
    setAddSubjectOpen(false);
  };

  return (
    <>
      <Drawer
        className="container"
        title={
          <>
            <CloseOutlined onClick={onClose} /> <span>Add New Subject</span>{" "}
          </>
        }
        width={450}
        closable={false}
        onClose={onClose}
        open={addSubjectOpen}
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
              label="Subject Name"
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

            <Form.Item>
              <Button
                htmlType="submit"
                onClick={onClose}
                style={{ marginRight: "20px" }}
              >
                Cancel
              </Button>

              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </div>

     </Drawer>
    </>
  );
};

export default AddSubject;
