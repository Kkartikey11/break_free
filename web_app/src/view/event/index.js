import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Context from "../../components/sidebar/context/Context";
import { useNavigate } from "react-router-dom";
import { Button, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { eventAction } from "../../redux/action/event";
import AddEvent from "./addEvent";

const Event = () => {
  const context = useContext(Context);
  const { setAddEventOpen } =
    context;
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
      </Content>
    </>
  );
};

export default Event;
