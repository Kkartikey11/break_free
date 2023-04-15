import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Context from "../../components/sidebar/context/Context";
import { Link, useNavigate } from "react-router-dom";
import { Button, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { deleteEventAction, eventAction } from "../../redux/action/event";
import AddEvent from "./addEvent";
import EditEvent from "./editEvent";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import moment from "moment";
import ViewEvent from "./viewEventDetails";

const Event = () => {
  const context = useContext(Context);
  const { setAddEventOpen, setEventData, setEditEventOpen,
    setViewEventOpen, } =
    context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [eventList, setEventList] = useState("");
  const [eventId, setEventId] = useState("")

  console.log(eventId);

  useEffect(() => {
    dispatch(eventAction());
  }, []);

  useEffect(() => {
    if (state.getEvent.data !== "") {
      if (state.getEvent.data.data.code === 200) {
        setEventList(state.getEvent.data.data.data);
      }
    }
  }, [state]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => <Link 
      to="" 
      style={{fontWeight:'600'}} 
      onClick={() => {
        setEventData(record);
        setViewEventOpen(true);
      }}>{text}</Link>,
    },
    {
      title: "Event Date",
      dataIndex: "event_datetime",
      render: (text) => <div>{moment(text).format("DD MMM YYYY, hh:mm a")}</div>,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" style={{width:'100px', display:'flex', justifyContent:'space-around'}}>
          <a
            onClick={() => {
              setEventData(record);
              setEditEventOpen(true);
            }}
            style={{color:'green'}}
          >
           <EditOutlined style={{color:'green'}} /> Edit
          </a>

          <a
            onClick={() => {
              setEventData(record);
              alert(`Are you sure you want to delete event ${record.name}?`);
              dispatch(deleteEventAction(record));
              dispatch(eventAction());
            }}
            style={{color:'green'}}
          >
           <DeleteOutlined style={{color:'red'}}/>
          </a>
        </Space>
      ),
    },
    
  ];

      const {
        token: { colorBgContainer },
      } = theme.useToken();
  return (
    <>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: "82vh",
          background: colorBgContainer,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
        <div >
            <h1 style={{ fontSize: "30px", margin: "0px" }}>Event List</h1>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            onClick={() => {
              setAddEventOpen(true);
            }}
            style={{backgroundColor: "black", color: "white", fontWeight:'600'}}
          >
            Add Event
          </Button>
        </div>
        </div>
        <Table
          columns={columns}
          dataSource={eventList && eventList}
          pagination={true}
          scroll={{ x: "100%" }}
        />
        <AddEvent />
        <EditEvent />
        <ViewEvent />
      </Content>
    </>
  );
};

export default Event;
