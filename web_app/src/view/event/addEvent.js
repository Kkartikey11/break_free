import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  theme,
  Space,
  Checkbox,
} from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Context from "../../components/sidebar/context/Context";
import { Content } from "antd/es/layout/layout";
import { addStudentAction } from "../../redux/action/student";
import { addGradeAction } from "../../redux/action/grade";
import { addEventAction, eventAction } from "../../redux/action/event";
import { CloseOutlined } from "@ant-design/icons";
import styles from "../batch/batch.moduler.css";

const AddEvent = () => {
  const context = useContext(Context);
  const { addEventOpen, setAddEventOpen } = context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});
  const [batchList, setBatchList] = useState("");
  const [monterList, setMentorList] = useState("");
  const [date, setDate] = useState("");
  const [mantors, setMentors] = useState([]);
  const [batch, setBatch] = useState("");

  const onFinish = (values) => {
    const formData = {
      name: values.name,
      description: values.description,
      batch_id: batch ? batch : "",
      mentors: mantors ? mantors : [],
      event_datetime: date,
    };
    setApiData(formData);
    dispatch(addEventAction(formData));
    dispatch(eventAction());
    navigate("/events");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onClose = () => {
    setAddEventOpen(false);
  };

  useEffect(() => {
    if (state.getBatches.data !== "") {
      if (state.getBatches.data.data.code === 200) {
        setBatchList(state.getBatches.data.data.data);
      }
    }
    if (state.getUser.data !== "") {
      if (state.getUser.data.data.code === 200) {
        setMentorList(state.getUser.data.data.data);
      }
    }
    if (state.addGrade.data !== "") {
      if (state.addGrade.data.data.code === 200) {
        navigate("/events");
        window.location.reload();
      }
    }
  }, [state]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onChange = (date) => {
    console.log(date);
    setDate(date);
  };

  const onSelectMentorChange = (checkedValues) => {
    setMentors(checkedValues);
  };

  return (
    <>
      <Drawer
        className="container"
        title={
          <>
            <CloseOutlined onClick={onClose} /> <span>Add New Event</span>{" "}
          </>
        }
        width={500}
        closable={false}
        onClose={onClose}
        open={addEventOpen}
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
            <Form.Item style={{ fontWeight: "600" }} name="name">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "600", marginBottom: "10px" }}>
                  {" "}
                  Name :
                </label>
                <Input style={{ width: "400px" }} />
              </div>
            </Form.Item>

            <Form.Item style={{ fontWeight: "600" }} name="event_datetime">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "600", marginBottom: "10px" }}>
                  {" "}
                  Event Time :
                </label>
                {/* <Input  style={{width:'400px'}} /> */}
                <Space direction="vertical">
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    onChange={onChange}
                  />
                </Space>
              </div>
            </Form.Item>

            <Form.Item style={{ fontWeight: "600" }} name="description">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "600", marginBottom: "10px" }}>
                  {" "}
                  Description :
                </label>
                <Input style={{ width: "400px" }} />
              </div>
            </Form.Item>

            <Form.Item name="batch_id" style={{ fontWeight: "600" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  for="subject_id"
                  style={{ fontWeight: "600", marginBottom: "10px" }}
                >
                  {" "}
                  Batch :
                </label>
                <Select
                  placeholder="Please Select Batch"
                  showSearch
                  onChange={(e) => setBatch(e)}
                  style={{
                    width: "400px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {batchList &&
                    batchList.map((data, index) => (
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
                <label>Select Mentors :</label>
              </div>
              <div style={style.category}>
                <Checkbox.Group onChange={onSelectMentorChange}>
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
                    {monterList &&
                      monterList.map((item, index) => (
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

export default AddEvent;

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
