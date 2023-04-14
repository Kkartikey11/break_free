import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  theme,
  Space,
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
import moment from "moment";

const ViewEvent = () => {
  const context = useContext(Context);
  const { viewEventOpen, setViewEventOpen, eventData, setEventData } = context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});
  const [batchList, setBatchList] = useState("");
  const [monterList, setMentorList] = useState("");
  const [date, setDate] = useState("");
  const [mantors, setMentors] = useState("");
  const [batch, setBatch] = useState("");

  console.log("row data---->", eventData);


  const onClose = () => {
    setViewEventOpen(false);
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

  return (
    <>
      <Drawer
        className="container"
        title={
          <>
            <CloseOutlined onClick={onClose} /> <span>View Event Details - {eventData.name}</span>{" "}
          </>
        }
        width={500}
        closable={false}
        onClose={onClose}
        open={viewEventOpen}
      >
        <div>
          <div>
            <div style={{display:'flex', marginBottom:'20px'}}>
              <div>
              <label>Date/Time : </label>
              </div>
              <div style={{fontWeight:'600'}}>&nbsp; {moment(eventData.event_datetime).format("DD MMM YYYY, hh:mm a")}</div>
            </div>

            <div style={{display:'flex', marginBottom:'20px'}}>
              <div>
              <label>Batch Name : </label>
              </div>
              <div style={{fontWeight:'600'}}>&nbsp; {eventData.batch}</div>
            </div>

            <div style={{display:'flex', marginBottom:'20px'}}>
              <div>
              <label>Batch Name : </label>
              </div>
              <div style={{fontWeight:'600'}}>&nbsp; {eventData.batch}</div>
            </div>

            
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ViewEvent;
