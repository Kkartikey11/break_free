import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/action/user";
import Cookies from "universal-cookie";
import { Card, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import image4 from "../../asserts/images/award-solid.svg"
import starBff from "../../asserts/images/Star.jpeg";


const Dashboard = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const roleType = cookies.get('role_type')
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
        {/* <div>
          <div>
            <h1>Start Of The Month</h1>
          </div>
          <div>
            
          </div>
        </div> */}

        <div style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  border: "1px solid silver",
                  borderRadius: "5px",
                  marginBottom:'30px',
                  marginLeft: '30px',
                  marginRight: '30px',
                  padding:'20px',
                  background:
                "linear-gradient(101deg, rgb(192 224 245 / 70%) 0%, rgb(255 155 255 / 40%) 100%) 0% 0% no-repeat padding-box padding-box #fffdfd",
                  // alignItems: "center",
                }}>
          <div class="col-md-6 pl-md-5">
            <div class="row">
              <div class="col-6"></div>
              <div class="col-6"></div>
              <div
                class="col-12 mt-4"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <img src={starBff} style={{borderRadius:'50%'}} />
                  <img src={image4} style={{width:'15%'}} />
                  </div>
                  <div style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight:'4pc'
                }}>
                <h6
                  style={{
                    color: "black",
                    fontSize: "28px",
                    fontFamily: "trend-sans-w00-four,sans-serif",
                    textDecoration: "underline",
                    marginTop: "20px",
                  }}
                >
                  Vidya R
                </h6>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 pr-md-5 mb-4 mb-md-0" style={{width:'700px'}}>
            <h6
              class="section-title text-center"
              style={{ color: "black", fontSize: "55px", margin: "0px"}}
            >
              Congratulations!
            </h6>
            <h6
              class="section-subtitle mb-5 text-center"
              style={{
                color: "black",
                fontSize: "28px",
                fontFamily: "trend-sans-w00-four,sans-serif",
                textDecoration: "underline",
                margin:'30px 0px 30px 0',
              }}
            >
              Super BFF of the Month
            </h6>

            <p style={{ color: "#000", fontSize: "20px" }}>
              The way Vidya engages the students adapting to their needs while
              explaining any concept is wonderful and inspiring. She is highly
              dedicated towards the cause, very orderly, organized and punctual
              with her sessions. Kudos to her commitment!
            </p>
          </div>
        </div>

       {roleType == 1 ?
       ( <div
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
            onClick={() => navigate("/web/events")}
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
            onClick={() => navigate("/web/batch")}
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
            onClick={() => navigate("/web/student")}
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
            onClick={() => navigate("/web/subject")}
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
            onClick={() => navigate("/web/grade")}
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
            onClick={() => navigate("/web/users")}
          >
            <h1>Users</h1>
          </Card>
        </div>)
        :
        roleType == 2 ?
       ( <div
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
            onClick={() => navigate("/web/events")}
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
            onClick={() => navigate("/web/batch")}
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
            onClick={() => navigate("/web/student")}
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
            onClick={() => navigate("/web/subject")}
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
            onClick={() => navigate("/web/grade")}
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
            onClick={() => navigate("/web/users")}
          >
            <h1>Users</h1>
          </Card>
        </div>)
        :
        (<div
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
            onClick={() => navigate("/web/events")}
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
            onClick={() => navigate("/web/batch")}
          >
            <h1>Batch</h1>
          </Card>

          {/* student view */}


        </div>)
        }
      </Content>
    </>
  );
};

export default Dashboard;
