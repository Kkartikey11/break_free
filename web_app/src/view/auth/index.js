import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Context from "../../components/sidebar/context/Context";
import { useNavigate } from "react-router";
import loginName from "../../asserts/images/LOGIN.png";
import image1 from "../../asserts/images/Ellipse_1.png";
import Polygon_1 from "../../asserts/images/Polygon_1.png";
import Polygon_2 from "../../asserts/images/Polygon_2.png";
import Polygon_3 from "../../asserts/images/Polygon_3.png";
import Subtract from "../../asserts/images/Subtract.png";
import { Button, Form, Input } from "antd";
import { authAction } from "../../redux/action/auth";

const Login = () => {
  const context = useContext(Context);
  const {  } = context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const [apiData, setApiData] = useState({});

  const onFinish = (values) => {
    console.log("Success:", values);
    const formData = {
        email: email,
        password: password,
      };
      setApiData(formData);
      dispatch(authAction(formData));
      navigate("/users");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#000",
        }}
      >
        <div style={{ display: "flex", justifyContent: "start" }}>
          <img style={{ width: "76%" }} src={image1} alt={loginName} />
        </div>
        <div style={{ marginTop: "100px" }}>
          <img src={loginName} alt={loginName} />
          <div style={{ marginTop: "100px" }}>
            <Form
              name="basic"
              labelCol={{
                span: 2,
              }}
              wrapperCol={{
                span: 20,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label="Username" name="email">
                <label
                  for="username"
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Username
                </label>
                <Input onChange={(e)=> setEmail(e.target.value)} />
              </Form.Item>

              <Form.Item label="Password" name="password">
                <label
                  for="username"
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Password
                </label>
                <Input.Password onChange={(e)=> setPassword(e.target.value)} />
              </Form.Item>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Form.Item>
                  <Button
                    style={{ width: "286px", marginTop: "25px" }}
                    type="primary"
                    htmlType="submit"
                    onClick={onFinish}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <img style={{ width: "77%" }} src={Subtract} alt={loginName} />
          </div>
          {/* <div>
          <img src={Polygon_1} alt={loginName} />
          <img src={Polygon_2} alt={loginName} />
          <img src={Polygon_3} alt={loginName} />
        </div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
