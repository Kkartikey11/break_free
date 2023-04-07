import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/action/user";

import { Card, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [dashboardInfo, setDashboardInfo] = useState("");

  useEffect(() => {
    dispatch(userAction());
  }, []);

  useEffect(() => {
    if (state.getUser.data !== "") {
      if (state.getUser.data.data.error === false) {
        setDashboardInfo(state.getUser.data.data.data);
      }
    }
  }, [state]);

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
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
            // marginTop: "8em",
          }}
        >
          {/* event view */}
          <Card
            style={{
              width: "30%",
              cursor: "pointer",
              background:
                "linear-gradient(101deg, rgb(192 224 245 / 70%) 0%, rgb(255 155 255 / 40%) 100%) 0% 0% no-repeat padding-box padding-box #fffdfd",
            }}
            onClick={() => navigate("/events")}
          >
            <h1>Event</h1>
          </Card>

          {/* batch view */}
          <Card
            style={{
              width: "30%",
              cursor: "pointer",
              background:
                "linear-gradient(101deg, rgb(192 224 245 / 70%) 0%, rgb(255 155 255 / 40%) 100%) 0% 0% no-repeat padding-box padding-box #fffdfd",
            }}
            onClick={() => navigate("/batch")}
          >
            <h1>Batch</h1>
          </Card>

          {/* student view */}
          <Card
            style={{
              width: "30%",
              background:
                "linear-gradient(101deg, rgb(192 224 245 / 70%) 0%, rgb(255 155 255 / 40%) 100%) 0% 0% no-repeat padding-box padding-box #fffdfd",
              cursor: "pointer",
            }}
            onClick={() => navigate("/student")}
          >
            <h1>Student</h1>
          </Card>

          <Card
            style={{
              width: "30%",
              cursor: "pointer",
              background:
                "linear-gradient(101deg, rgb(192 224 245 / 70%) 0%, rgb(255 155 255 / 40%) 100%) 0% 0% no-repeat padding-box padding-box #fffdfd",
            }}
            onClick={() => navigate("/subject")}
          >
            <h1>Subject</h1>
          </Card>

          <Card
            style={{
              width: "30%",
              cursor: "pointer",
              background:
                "linear-gradient(101deg, rgb(192 224 245 / 70%) 0%, rgb(255 155 255 / 40%) 100%) 0% 0% no-repeat padding-box padding-box #fffdfd",
            }}
            onClick={() => navigate("/grade")}
          >
            <h1>Grade</h1>
          </Card>
          <Card
            style={{
              width: "30%",
              cursor: "pointer",
              background:
                "linear-gradient(101deg, rgb(192 224 245 / 70%) 0%, rgb(255 155 255 / 40%) 100%) 0% 0% no-repeat padding-box padding-box #fffdfd",
            }}
            onClick={() => navigate("/users")}
          >
            <h1>Users</h1>
          </Card>
        </div>
      </Content>
    </>
  );
};

export default Dashboard;
