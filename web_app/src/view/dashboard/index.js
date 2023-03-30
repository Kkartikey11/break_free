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
                "transparent linear-gradient(101deg, #f2faffb3 0%, #fdf1fd66 100%) 0% 0% no-repeat padding-box",
            }}
            onClick={() => navigate("/dashboard/events")}
          >
            <h1>Event</h1>
          </Card>

          {/* batch view */}
          <Card
            style={{
              width: "30%",
              cursor: "pointer",
              background:
                "transparent linear-gradient(101deg, #f2faffb3 0%, #fdf1fd66 100%) 0% 0% no-repeat padding-box",
            }}
            onClick={() => navigate("/dashboard/batch")}
          >
            <h1>Batch</h1>
          </Card>

          {/* student view */}
          <Card
            style={{
              width: "30%",
              background:
                "transparent linear-gradient(101deg, #f2faffb3 0%, #fdf1fd66 100%) 0% 0% no-repeat padding-box",
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard/student")}
          >
            <h1>Student</h1>
          </Card>

          <Card
            style={{
              width: "30%",
              cursor: "pointer",
              background:
                "transparent linear-gradient(101deg, #f2faffb3 0%, #fdf1fd66 100%) 0% 0% no-repeat padding-box",
            }}
            onClick={() => navigate("/dashboard/subject")}
          >
            <h1>Subject</h1>
          </Card>

          <Card
            style={{
              width: "30%",
              cursor: "pointer",
              background:
                "transparent linear-gradient(101deg, #f2faffb3 0%, #fdf1fd66 100%) 0% 0% no-repeat padding-box",
            }}
            onClick={() => navigate("/dashboard/grade")}
          >
            <h1>Grade</h1>
          </Card>
          <Card
            style={{
              width: "30%",
              cursor: "pointer",
              background:
                "transparent linear-gradient(101deg, #f2faffb3 0%, #fdf1fd66 100%) 0% 0% no-repeat padding-box",
            }}
            onClick={() => navigate("/dashboard/users")}
          >
            <h1>Users</h1>
          </Card>
        </div>
      </Content>
    </>
  );
};

export default Dashboard;
