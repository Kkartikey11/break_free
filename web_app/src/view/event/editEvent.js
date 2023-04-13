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
import { addEventAction, eventAction } from "../../redux/action/event";
import { CloseOutlined } from "@ant-design/icons";
import { subjectAction } from "../../redux/action/subject";
import { userAction } from "../../redux/action/user";
import { batchAction } from "../../redux/action/batch";

const EditEvent = ({ isEditable }) => {
  const context = useContext(Context);
  const { editEventOpen, setEditEventOpen, eventData, setEventData } = context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});
  const [batchList, setBatchList] = useState("");
  const [monterList, setMentorList] = useState("");

  console.log(eventData);

  const onFinish = (values) => {
    const formData = {
      name: values.name,
      description: values.description,
      batch_id: values.batch_id,
      mentors: values.mentors,
      event_datetime: values.event_datetime,
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
    setEditEventOpen(false);
    setEventData("");
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

  useEffect(() => {
    dispatch(userAction());
    dispatch(batchAction());
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      {eventData && (
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
          open={editEventOpen}
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
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  defaultValue={eventData.name}
                  style={{ width: "400px" }}
                />
              </Form.Item>

              <Form.Item
                label="Event Time"
                style={{ fontWeight: "600" }}
                name="event_datetime"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  defaultValue={eventData.event_datetime}
                  type="date"
                  style={{ width: "400px" }}
                />
              </Form.Item>

              <Form.Item
                style={{ fontWeight: "600" }}
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please description!" }]}
              >
                <Input defaultValue={eventData.description} />
              </Form.Item>

              <Form.Item
                name="batch_id"
                style={{ fontWeight: "600" }}
                label="Batch"
                required
                rules={[{ required: true, message: "Please select grade !" }]}
              >
                <Select
                  placeholder="Please Select Subject"
                  showSearch
                  defaultValue={eventData.batch_id}
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
              </Form.Item>

              <Form.Item
                name="mentors"
                label="Mentors"
                style={{ fontWeight: "600" }}
                required
                rules={[{ required: true, message: "Please select grade !" }]}
              >
                <Select
                  placeholder="Please Select Subject"
                  showSearch
                  defaultValue={eventData.mentors}
                  style={{
                    width: "400px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {monterList &&
                    monterList.map((data, index) => (
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
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{ fontWeight: "600", marginBottom: "10px" }}
                  >
                    {" "}
                    Name :
                  </label>
              <Input  defaultValue={eventData.name} style={{width:'400px'}} />
              </div>
            </Form.Item>

            <Form.Item
              style={{ fontWeight: "600" }}
              name="event_datetime"
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{ fontWeight: "600", marginBottom: "10px" }}
                  >
                    {" "}
                    Event Time :
                  </label>
              <Input defaultValue={eventData.event_datetime}  style={{width:'400px'}} />
              </div>
            </Form.Item>

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
              <Input defaultValue={eventData.description} style={{ width: "400px" }} />
              </div>
            </Form.Item>

            <Form.Item
              name="batch_id"
              style={{ fontWeight: "600" }}
              
            >
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
              defaultValue={eventData.batch_id}
              style={{width:'400px', textAlign: 'center', fontWeight:'600'}}
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

            <Form.Item
              name="mentors"
              style={{ fontWeight: "600" }}
              
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{ fontWeight: "600", marginBottom: "10px" }}
                  >
                    {" "}
                    Mentors :
                  </label>
              <Select 
              placeholder="Please Select monter" 
              showSearch
               defaultValue={eventData.mentors}
              style={{width:'400px', textAlign: 'center', fontWeight:'600'}}
              >
                {monterList &&
                  monterList.map((data, index) => (
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

export default EditEvent;
