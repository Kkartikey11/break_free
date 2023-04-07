import { Button, Drawer, Form, Input, Select, theme } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Context from "../../components/sidebar/context/Context";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import { addUserAction, userAction } from "../../redux/action/user";
import { CloseOutlined } from "@ant-design/icons";

const AddUser = () => {
  const context = useContext(Context);
  const { addUserOpen, setAddUserOpen, setUserData } = context;
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
      about: values.about,
      role_id: parseFloat(values.role_id),
      password: values.password,
    };
    setApiData(formData);
    dispatch(addUserAction(formData));
    navigate("/users");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    navigate("/users");
  };

  useEffect(() => {
    if (state.getGrade.data !== "") {
      if (state.getGrade.data.data.code === 200) {
        setGradeList(state.getGrade.data.data.data);
      }
    }
    if (state.addUser.data !== "") {
      if (state.addUser.data.data.code === 200) {
        navigate("/users");
        window.location.reload();
      }
    }
  }, [state]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClose = () => {
    setAddUserOpen(false);
  };

  return (
    <>
      <Drawer
        className="container"
        title={
          <>
            <CloseOutlined onClick={onClose} /> <span>Add New User</span>{" "}
          </>
        }
        width={450}
        closable={false}
        onClose={onClose}
        open={addUserOpen}
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
              <Input style={{ width: "340px" }} />
            </Form.Item>

            <Form.Item
              style={{ fontWeight: "600" }}
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              style={{ fontWeight: "600" }}
              name="password"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input style={{ width: "317px" }} />
            </Form.Item>

            <Form.Item
              label="About"
              style={{ fontWeight: "600" }}
              name="about"
              rules={[{ required: true, message: "Please input about user!" }]}
            >
              <Input style={{ width: "336px" }} />
            </Form.Item>

            <Form.Item
              name="role_id"
              label="User Type"
              style={{ fontWeight: "600" }}
              required
              rules={[{ required: true, message: "Please select grade !" }]}
            >
              <Select
                placeholder="Please Select User Type"
                showSearch
                style={{
                  width: "310px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                <Option value="2">Admin</Option>
                <Option value="3">Mentor</Option>
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

export default AddUser;
