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
import styles from "../batch/batch.moduler.css";

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
  const [student, setStudent] = useState([]);
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
     {eventData && <Drawer
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
              <label>Status : </label>
              </div>
              <div style={{fontWeight:'600'}}>&nbsp; {moment(eventData.event_datetime) <  moment() ? "Expired" : "Active" }</div>
            </div>


            {/* <div style={{display:'flex',flexDirection:'column',gap:'20px', marginBottom:'20px'}}>
              <div>
              <label>Mentors : </label>
              </div> */}
              <div>
              <div
                style={{
                  display: "flex",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                <label>Mentors :</label>
              </div>
              <div style={style.category}>
              <div
                    className={styles.selectGroup}
                    style={{
                      display: "flex",
                      flexDirection: "column",
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
              {eventData.mentors && eventData.mentors.map((item,index) => {
                // console.log("item",item);
                return <div style={{display:'flex',fontWeight:'600'}}>&nbsp; {item.name} </div>
              }
                )}
                </div>
                </div>
            </div>


            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "600",
                  marginBottom: "10px",
                  marginTop: "20px",
                }}
              >
                <label>Students :</label>
                <div>
                  {eventData.has_report === 0 ? 
                  <div>
                    {/* <a href={"/events/add-report"} target="blank"> */}
                    <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "#000" }}
                  onClick={() =>
                  {
                    navigate("/events/add-report")                  }
                  }
                >
                  Add Report
                </Button>
                {/* </a> */}
                </div> : 
                <div>
                    <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "#000" }}
                >
                  View Report
                </Button>
                </div>}
                </div>
              </div>
              <div style={style.category}>
                
              <div
                    className={styles.selectGroup}
                    style={{
                      display: "flex",
                      flexDirection: "column",
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
              {eventData.students && eventData.students.map((item,index) => {
                return <diV style={{display:'flex',justifyContent:'space-between'}}>
                  <div style={{display:'flex',fontWeight:'600'}}>&nbsp; {item.name} </div>
                  </diV>
              }
                )}
                </div>
                </div>
            </div>
            

            
          </div>
        </div>
      </Drawer>}
    </>
  );
};

export default ViewEvent;

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
