import { Button, Drawer, Form, Input, Select, theme } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Context from "../../components/sidebar/context/Context";
import { Content } from "antd/es/layout/layout";
import { addStudentAction } from "../../redux/action/student";
import { addGradeAction } from "../../redux/action/grade";
import { CloseOutlined } from "@ant-design/icons";

const AddGrade = () => {
  const context = useContext(Context);
  const { addGradeOpen, setAddGradeOpen } = context;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});
  const [gradeList, setGradeList] = useState("");

  const onFinish = (values) => {
    const formData = {
      name: values.name,
      description: values.description,
    };
    console.log(formData);
    setApiData(formData);
    dispatch(addGradeAction(formData));
    navigate("/grade");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onClose = () => {
    setAddGradeOpen(false);
  };

  useEffect(() => {
    if (state.getGrade.data !== "") {
      if (state.getGrade.data.data.code === 200) {
        setGradeList(state.getGrade.data.data.data);
      }
    }
    if (state.addGrade.data !== "") {
      if (state.addGrade.data.data.code === 200) {
        navigate("/grade");
        window.location.reload();
      }
    }
  }, [state]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Drawer
        className="container"
        title={
          <>
            <CloseOutlined onClick={onClose} /> <span>Add New Grade</span>{" "}
          </>
        }
        width={450}
        closable={false}
        onClose={onClose}
        open={addGradeOpen}
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
              label="Name"
              style={{ fontWeight: "600" }}
              name="name"
            >
              <Input style={{ width: "400px" }} />
            </Form.Item> */}

            <Form.Item
              style={{ fontWeight: "600" }}
              name="name"
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{ fontWeight: "600", marginBottom: "10px" }}
                  >
                    {" "}
                    Name :
                  </label>
              <Input style={{width:'400px'}} />
              </div>
            </Form.Item>

            {/* <Form.Item
              style={{ fontWeight: "600" }}
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please description!" }]}
            >
              <Input style={{width:'400px'}} />
            </Form.Item> */}
            <Form.Item
              style={{ fontWeight: "600" }}
              name="description"
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{ fontWeight: "600", marginBottom: "10px" }}
                  >
                    {" "}
                    Description :
                  </label>
              <Input style={{width:'400px'}} />
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

export default AddGrade;
