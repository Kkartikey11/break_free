import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Button, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { eventAction } from "../../redux/action/event";

const Event = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [eventList, setEventList] = useState("");

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
    },
    {
      title: "Description",
      dataIndex: "description",
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
        <div style={{display:'flex', fontSize:'18px'}}>
            <h1>Event List</h1>
        </div>
        <div
          direction="vertical"
          style={{ margin: "20px", display: "flex", justifyContent: "end" }}
        >
          <Button
            type="primary"
            onClick={() => {
              navigate("/events/add-event");
            }}
          >
            Add Event
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={eventList && eventList}
          pagination={true}
          scroll={{ x: "100%" }}
        />
      </Content>
    </>
  );
};

export default Event;
