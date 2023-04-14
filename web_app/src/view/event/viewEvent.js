import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Context from "../../components/sidebar/context/Context";
import { useNavigate } from "react-router-dom";
import { Button, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { eventAction } from "../../redux/action/event";
import AddEvent from "./addEvent";
import EditEvent from "./editEvent";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import moment from "moment";

const ViewEvent = () => {
  const context = useContext(Context);
  const { setAddEventOpen,eventData, setEventData, setEditEventOpen } =
    context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [eventList, setEventList] = useState("");

    console.log("row data---->", eventData);

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
    },
    {
      title: "Event Date",
      dataIndex: "event_datetime",
      render: (text) => <div>{moment(text).format("DD MMM YYYY")}</div>,
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
              alert(record.id);
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
        <div>
            <div><h2>Event Name - {eventData.name}</h2></div>
        </div>
        
  
      </Content>
    </>
  );
};

export default ViewEvent;
