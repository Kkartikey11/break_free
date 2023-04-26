import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Context from "../../components/sidebar/context/Context";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { addReportAction, eventAction } from "../../redux/action/event";
import AddEvent from "./addEvent";
import EditEvent from "./editEvent";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { Option } from "antd/es/mentions";
import styles from "./event.module.css";

const AddReport = ({ student }) => {
  const context = useContext(Context);
  const { setAddEventOpen, eventData, setEventData, setEditEventOpen } =
    context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [eventList, setEventList] = useState("");
  const [formData, setFormData] = useState([]);
  const [isClicked, setIsClicked] = useState(false)

  console.log("isClicked--->", isClicked);

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


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClose = () => {
    navigate("/web/events");
  };

  // ------------------------------------

  const [data, setData] = useState([]);

  console.log("data", data);

  // State variables for the form input fields
  const [student_id, setName] = useState("");
  // const [value, setValue] = useState("");
  const [is_present, setPresent] = useState("");
  const [participation, setParticipation] = useState("");
  const [video_presence, setVideo] = useState("");
  const [concentration, setConcentration] = useState("");
  const [grasping, setGrasping] = useState("");
  const [application_of_concepts, setApplication] = useState("");
  const [retention, setRetention] = useState("");
  const [confidence, setConfidencet] = useState("");
  const [getIndex, setGetIndex] = useState("")

  // Handler for the name input field
  // const handleNameChange = (event) => {
  //   console.log(event);
  //   setName(event);
  // };

  console.log(getIndex);

  console.log("student_id", student_id, is_present);

  // Handler for the Present input field
  const handlePresentChange = (event) => {
    setPresent(event);
  };

  // Handler for the Participation input field
  const handleParticipationChange = (event) => {
    setParticipation(event);
  };

  // Handler for the Video input field
  const handleVideoChange = (event) => {
    setVideo(event);
  };

  // Handler for the Concentration input field
  const handleConcentrationChange = (event) => {
    setConcentration(event);
  };

  // Handler for the setGrasping input field
  const handleGraspingChange = (event) => {
    setGrasping(event);
  };

  // Handler for the Application input field
  const handleApplicationChange = (event) => {
    setApplication(event);
  };

  // Handler for the setRetention input field
  const handleRetentionChange = (event) => {
    setRetention(event);
  };

  // Handler for the Confidencet input field
  const handleConfidencetChange = (event) => {
    
    setConfidencet(event);
  };

  // Handler for the form submission
  const handleSubmit = (event) => {
    // event.preventDefault();

    // Create a new object with the current values of the input fields
    const newData = {
      student_id,
      is_present,
      participation,
      video_presence,
      concentration,
      grasping,
      confidence,
      retention,
      application_of_concepts,
    };

    // Add the new object to the array
    setData((prevData) => [...prevData, newData]);

    // Reset the input fields to their initial values
    setName("");
    // setValue("");
  };


  const onFinish = () => {
    const formData = {
      id: eventData.id,
      performance: data,
    };
    // setApiData(formData);
    dispatch(addReportAction(formData));
     
  };

  return (
    <>
      {eventData && (
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: "82vh",
            background: colorBgContainer,
          }}
          className={styles.event_css}
        >
          <div>
            <h1 style={{ fontSize: "25px" }}>Add Report</h1>
            <h1 style={{color:'red'}}>Impotent Note : Please confirm before press " + " button, you will add one time only</h1>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <table>
                <tr>
                  <th style={{ width: "120px" }}>Name</th>
                  <th style={{ width: "120px" }}>Is Present</th>
                  <th>Participation</th>
                  <th>Video Presence</th>
                  <th>Concentration</th>
                  <th>Grasping</th>
                  <th>Application Of Concepts</th>
                  <th>Retention</th>

                  <th>Confidence</th>
                  <th>Action</th>
                </tr>
                {eventData.students.map((item,index) => (
                  <tr key={index}>
                    <td> <input name="name" type="text" defaultValue={item.name} disabled style={{height:30, borderRadius:'5px', border:'1px solid #E8E8E8', padding:'8px' }} /></td>
                    <>
                      <td>
                        <div style={{ width: "100px" }}>
                          <Select
                            name="is_present"
                            onChange={(e)=>{handlePresentChange(e);
                              setName(item.name)
                            }}
                            style={{
                              width: "100px",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                            disabled={isClicked && getIndex === index ? true : false}
                          >
                            <Option value="Absent">Absent</Option>
                            <Option value="Present">Present</Option>
                          </Select>
                        </div>
                      </td>
                      <td style={{ width: "40px" }}>
                        <div>
                          <Select
                            onChange={handleParticipationChange}
                            name="participation"
                            style={{
                              width: "100px",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                            disabled={isClicked && getIndex === index ? true : false}
                          >
                            <Option value="None">None</Option>
                            <Option value="Poor">Poor</Option>
                            <Option value="Good">Good</Option>
                          </Select>
                        </div>
                      </td>
                      <td style={{ width: "120px" }}>
                        <div>
                          <Select
                            onChange={handleVideoChange}
                            name="video_presence"
                            style={{
                              width: "100px",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                            disabled={isClicked && getIndex === index ? true : false}
                          >
                            <Option value="None">None</Option>
                            <Option value="Poor">Poor</Option>
                            <Option value="Good">Good</Option>
                          </Select>
                        </div>
                      </td>
                      <td style={{ width: "120px" }}>
                        <div>
                          <Select
                            onChange={handleConcentrationChange}
                            name="concentration"
                            style={{
                              width: "100px",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                            disabled={isClicked && getIndex === index ? true : false}
                          >
                            <Option value="None">None</Option>
                            <Option value="Poor">Poor</Option>
                            <Option value="Good">Good</Option>
                          </Select>
                        </div>
                      </td>
                      <td style={{ width: "120px" }}>
                        <div>
                          <Select
                            onChange={handleGraspingChange}
                            name="grasping"
                            style={{
                              width: "100px",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                            disabled={isClicked && getIndex === index ? true : false}
                          >
                            <Option value="None">None</Option>
                            <Option value="Poor">Poor</Option>
                            <Option value="Good">Good</Option>
                          </Select>
                        </div>
                      </td>
                      <td style={{ width: "120px" }}>
                        <div>
                          <Select
                            onChange={handleApplicationChange}
                            name="application_of_concepts"
                            style={{
                              width: "100px",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                            disabled={isClicked && getIndex === index ? true : false}
                          >
                            <Option value="None">None</Option>
                            <Option value="Poor">Poor</Option>
                            <Option value="Good">Good</Option>
                          </Select>
                        </div>
                      </td>
                      <td style={{ width: "120px" }}>
                        <div>
                          <Select
                            onChange={handleRetentionChange}
                            name="retention"
                            style={{
                              width: "100px",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                            disabled={isClicked && getIndex === index ? true : false}
                          >
                            <Option value="None">None</Option>
                            <Option value="Poor">Poor</Option>
                            <Option value="Good">Good</Option>
                          </Select>
                        </div>
                      </td>

                      <td>
                        <div>
                          <Select
                            onChange={(e) => handleConfidencetChange(e)}
                            // onChange={handleConfidencetChange}
                            style={{
                              width: "100px",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                            name="confidence"
                            disabled={isClicked && getIndex === index ? true : false}
                          >
                            <Option value="None">None</Option>
                            <Option value="Poor">Poor</Option>
                            <Option value="Good">Good</Option>
                          </Select>
                        </div>
                      </td>
                      <td>
                    <div>
                      {isClicked && getIndex === index ? <></> :<Button type="primary"  style={{color:'white', backgroundColor: 'black'}}   onClick={()=>{
                        handleSubmit();
                        setIsClicked(true);
                        setGetIndex(index)
                        
                        }}>
                      +
                    </Button>}
                          {/* <button style={{color:'white', backgroundColor: isClicked == true ?  'green' : 'black', cursor:'pointer'}} onChange={()=> setIsClicked(true)}  type="submit" >+</button> */}
                        </div>
                      </td>
                    </>
                  </tr>
                ))}
              </table>
            </form>
            
            {/* <div style={{marginTop:'30px'}}>
                    <Button
                      type="primary"
                      onClick={onFinish}
                      // style={{ height: "40px" }}
                    >
                      Save
                    </Button>
                  </div> */}
                  <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "30px",
              }}
            >
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
                  onClick={onFinish}
                >
                  Add
                </Button>
            </div>
          </div>
        </Content>
      )}
    </>
  );
};

export default AddReport;
