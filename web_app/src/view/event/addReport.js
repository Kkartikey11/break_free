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
  // const [student_id, setStudentId] = useState()

  // const [is_present, setPresent] = useState("");
  // const [participation, setParticipation] = useState("");
  // const [video_presence, setVideo] = useState("");
  // const [concentration, setConcentration] = useState("");
  // const [grasping, setGrasping] = useState("");
  // const [application_of_concepts, setApplication] = useState("");
  // const [retention, setRetention] = useState("");
  // const [confidence, setConfidencet] = useState("");
  // const newFormData = [
  //   {
  //     is_present,
  //     participation,
  //     video_presence,
  //     concentration,
  //     grasping,
  //     application_of_concepts,
  //     retention,
  //     confidence,
  //   },
  // ];

  // const [rowData, setRowData] = useState(newFormData);

  // const [inputList, setInputList] = useState([
  //   {
  //     is_present: is_present,
  //     participation: participation,
  //     video_presence: video_presence,
  //     concentration: concentration,
  //     grasping: grasping,
  //     application_of_concepts: application_of_concepts,
  //     retention: retention,
  //     confidence: confidence,
  //   },
  // ]);

  console.log("row data---->", eventData);

  // console.log("inputList--->", inputList);

  // console.log("newFormData-->", newFormData);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("is_present:", is_present);
  //   console.log("participation:", participation);
  //   console.log("video_presence:", video_presence);
  // };

  // add row functionality
  // const addRow = (e) => {
  //   console.log(e);
  //   const { name, value } = e;
  //   const list = [...inputList];
  //   console.log(list);
  //   list[name] = value;
  //   setInputList(list);

  //   // let rowArray = rowData;
  //   //  rowArray=rowArray&& rowArray.push(newFormData)
  //   // setRowData(...formData,newFormData)
  //   console.log("Row---->", formData);
  // };

  // console.log("Row---->", formData);

  // console.log(
  //   is_present,
  //   participation,
  //   video_presence,
  //   concentration,
  //   grasping,
  //   confidence,
  //   retention,
  //   application_of_concepts
  // );

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

  // handle input change
  // const handleInputChange = (e, index) => {
  //   console.log(e);
  //   const { name, value } = e;
  //   const list = [...inputList];
  //   console.log(list);
  //   list[index][name] = value;
  //   setInputList(list);
  // };

  // handle click event of the Remove button
  // const handleRemoveClick = (index) => {
  //   const list = [...inputList];
  //   list.splice(index, 1);
  //   setInputList(list);
  // };

  // handle click event of the Add button
  // const handleAddClick = () => {
  //   setInputList([...inputList]);
  // };

  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     render: (text, record) => <div style={{ width: "100px" }}>{text}</div>,
  //     // render: (text,record) => <div>{record.students.map((item) => <div>{item.name}</div>)}</div>,
  //   },
  //   {
  //     title: "Is Present",
  //     //   dataIndex: "event_datetime",
  //     render: (text) => (
  //       <div style={{ width: "100px" }}>
  //         <Select
  //           name="is_present"
  //           onChange={(e) => handleInputChange(e)}
  //           style={{
  //             width: "100px",
  //             textAlign: "center",
  //             fontWeight: "600",
  //           }}
  //         >
  //           <Option value="0">Absent</Option>
  //           <Option value="1">Present</Option>
  //         </Select>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Participation",
  //     //   dataIndex: "event_datetime",
  //     render: (text) => (
  //       <div>
  //         <Select
  //           onChange={(e) => handleInputChange(e)}
  //           name="participation"
  //           style={{
  //             width: "100px",
  //             textAlign: "center",
  //             fontWeight: "600",
  //           }}
  //         >
  //           <Option value="1">None</Option>
  //           <Option value="2">Poor</Option>
  //           <Option value="3">Good</Option>
  //         </Select>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Video Presence",
  //     //   dataIndex: "event_datetime",
  //     render: (text) => (
  //       <div>
  //         <Select
  //           onChange={(e) => handleInputChange(e)}
  //           name="video_presence"
  //           style={{
  //             width: "100px",
  //             textAlign: "center",
  //             fontWeight: "600",
  //           }}
  //         >
  //           <Option value="1">None</Option>
  //           <Option value="2">Poor</Option>
  //           <Option value="3">Good</Option>
  //         </Select>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Concentration",
  //     //   dataIndex: "event_datetime",
  //     render: (text) => (
  //       <div>
  //         <Select
  //           onChange={(e) => handleInputChange(e)}
  //           name="concentration"
  //           style={{
  //             width: "100px",
  //             textAlign: "center",
  //             fontWeight: "600",
  //           }}
  //         >
  //           <Option value="1">None</Option>
  //           <Option value="2">Poor</Option>
  //           <Option value="3">Good</Option>
  //         </Select>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Grasping",
  //     //   dataIndex: "event_datetime",
  //     render: (text) => (
  //       <div>
  //         <Select
  //           onChange={(e) => handleInputChange(e)}
  //           name="grasping"
  //           style={{
  //             width: "100px",
  //             textAlign: "center",
  //             fontWeight: "600",
  //           }}
  //         >
  //           <Option value="1">None</Option>
  //           <Option value="2">Poor</Option>
  //           <Option value="3">Good</Option>
  //         </Select>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Application Of Concepts",
  //     //   dataIndex: "event_datetime",
  //     render: (text) => (
  //       <div>
  //         <Select
  //           onChange={(e) => handleInputChange(e)}
  //           name="application_of_concepts"
  //           style={{
  //             width: "100px",
  //             textAlign: "center",
  //             fontWeight: "600",
  //           }}
  //         >
  //           <Option value="1">None</Option>
  //           <Option value="2">Poor</Option>
  //           <Option value="3">Good</Option>
  //         </Select>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Retention",
  //     //   dataIndex: "event_datetime",
  //     render: (text) => (
  //       <div>
  //         <Select
  //           style={{
  //             width: "100px",
  //             textAlign: "center",
  //             fontWeight: "600",
  //           }}
  //           onChange={(e) => handleInputChange(e)}
  //           name="retention"
  //         >
  //           <Option value="1">None</Option>
  //           <Option value="2">Poor</Option>
  //           <Option value="3">Good</Option>
  //         </Select>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Confidence",
  //     //   dataIndex: "event_datetime",
  //     render: (text) => (
  //       <div>
  //         <Select
  //           // onChange={(e) => setMentors(e)}
  //           onChange={(e) => handleInputChange(e)}
  //           style={{
  //             width: "100px",
  //             textAlign: "center",
  //             fontWeight: "600",
  //           }}
  //           name="confidence"
  //         >
  //           <Option value="1">None</Option>
  //           <Option value="2">Poor</Option>
  //           <Option value="3">Good</Option>
  //         </Select>
  //       </div>
  //     ),
  //   },

  //   // {
  //   //   title: "Description",
  //   //   dataIndex: "description",
  //   // },
  //   // {
  //   //   title: "Action",
  //   //   key: "action",
  //   //   render: (_, record) => (
  //   //     <Space size="middle" style={{width:'100px', display:'flex', justifyContent:'space-around'}}>
  //   //       <a
  //   //         onClick={() => {
  //   //           setEventData(record);
  //   //           setEditEventOpen(true);
  //   //         }}
  //   //         style={{color:'green'}}
  //   //       >
  //   //        <EditOutlined style={{color:'green'}} /> Edit
  //   //       </a>

  //   //       <a
  //   //         onClick={() => {
  //   //           setEventData(record);
  //   //           alert(record.id);
  //   //         }}
  //   //         style={{color:'green'}}
  //   //       >
  //   //        <DeleteOutlined style={{color:'red'}}/>
  //   //       </a>
  //   //     </Space>
  //   //   ),
  //   // },
  // ];

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

  // Handler for the name input field
  // const handleNameChange = (event) => {
  //   console.log(event);
  //   setName(event);
  // };

  console.log("student_id", student_id);

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
    event.preventDefault();

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

    

    // const formData = {
    //   id: eventData.id,
    //   performance: ''
    // };
    // // setApiData(formData);
    // dispatch(addReportAction(formData));

    

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
          </div>
          {/* <Table
          columns={columns}
          dataSource={eventData.students && eventData.students}
          pagination={false}
          scroll={{ x: "100%" }}
        /> */}
          {/* <div>
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
                </tr>
                {eventData.students.map((item) => (
                  <tr>
                    <td>{item.name}</td>
                        <>
                          <td>
                            <div style={{ width: "100px" }}>
                              <Select
                                name="is_present"
                                onChange={(e) => {
                                  setPresent(e);
                                }}
                                style={{
                                  width: "100px",
                                  textAlign: "center",
                                  fontWeight: "600",
                                }}
                              >
                                <Option value="0">Absent</Option>
                                <Option value="1">Present</Option>
                              </Select>
                            </div>
                          </td>
                          <td style={{ width: "40px" }}>
                            <div>
                              <Select
                                onChange={(e) => {
                                  setParticipation(e);
                                }}
                                name="participation"
                                style={{
                                  width: "100px",
                                  textAlign: "center",
                                  fontWeight: "600",
                                }}
                              >
                                <Option value="1">None</Option>
                                <Option value="2">Poor</Option>
                                <Option value="3">Good</Option>
                              </Select>
                            </div>
                          </td>
                          <td style={{ width: "120px" }}>
                            <div>
                              <Select
                                onChange={(e) => {
                                  setVideo(e);
                                }}
                                name="video_presence"
                                style={{
                                  width: "100px",
                                  textAlign: "center",
                                  fontWeight: "600",
                                }}
                              >
                                <Option value="1">None</Option>
                                <Option value="2">Poor</Option>
                                <Option value="3">Good</Option>
                              </Select>
                            </div>
                          </td>
                          <td style={{ width: "120px" }}>
                            <div>
                              <Select
                                onChange={(e) => {
                                  setConcentration(e);
                                }}
                                name="concentration"
                                style={{
                                  width: "100px",
                                  textAlign: "center",
                                  fontWeight: "600",
                                }}
                              >
                                <Option value="1">None</Option>
                                <Option value="2">Poor</Option>
                                <Option value="3">Good</Option>
                              </Select>
                            </div>
                          </td>
                          <td style={{ width: "120px" }}>
                            <div>
                              <Select
                                onChange={(e) => {
                                  setGrasping(e);
                                }}
                                name="grasping"
                                style={{
                                  width: "100px",
                                  textAlign: "center",
                                  fontWeight: "600",
                                }}
                              >
                                <Option value="1">None</Option>
                                <Option value="2">Poor</Option>
                                <Option value="3">Good</Option>
                              </Select>
                            </div>
                          </td>
                          <td style={{ width: "120px" }}>
                            <div>
                              <Select
                                onChange={(e) => {
                                  setApplication(e);
                                }}
                                name="application_of_concepts"
                                style={{
                                  width: "100px",
                                  textAlign: "center",
                                  fontWeight: "600",
                                }}
                              >
                                <Option value="1">None</Option>
                                <Option value="2">Poor</Option>
                                <Option value="3">Good</Option>
                              </Select>
                            </div>
                          </td>
                          <td style={{ width: "120px" }}>
                            <div>
                              <Select
                                onChange={(e) => {
                                  setRetention(e);
                                }}
                                name="retention"
                                style={{
                                  width: "100px",
                                  textAlign: "center",
                                  fontWeight: "600",
                                }}
                              >
                                <Option value="1">None</Option>
                                <Option value="2">Poor</Option>
                                <Option value="3">Good</Option>
                              </Select>
                            </div>
                          </td>

                          <td>
                            <div>
                              <Select
                                // onChange={(e) => setMentors(e)}
                                onChange={(e) => {
                                  setConfidencet(e);
                                }}
                                style={{
                                  width: "100px",
                                  textAlign: "center",
                                  fontWeight: "600",
                                }}
                                name="confidence"
                              >
                                <Option value="1">None</Option>
                                <Option value="2">Poor</Option>
                                <Option value="3">Good</Option>
                              </Select>
                            </div>
                          </td>
                          <td>
                            <div>
                              <Button
                                type="primary"
                                onClick={addRow}
                              >
                                +
                              </Button>
                            </div>
                          </td>
                        </>
                  </tr>
                ))}
              </table>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "30px",
                }}
              >
                <Button
                  // htmlType="submit"
                  onClick={onClose}
                  style={{ marginRight: "20px" }}
                  type="submit"
                >
                  Cancel
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "#000" }}
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
        </div> */}

          <div>
            {/* <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" value={name} onChange={handleNameChange} />
              </label>
              <br />
              <label>
                Value:
                <input type="text" value={value} onChange={handleValueChange} />
              </label>
              <br />
              <button type="submit">Add Data</button>
            </form> */}
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
                {eventData.students.map((item) => (
                  <tr>
                    <td> <input name="name" type="text" defaultValue={item.name} disabled style={{height:30, borderRadius:'5px', border:'1px solid #E8E8E8', padding:'8px' }} /></td>
                    <>
                      <td>
                        <div style={{ width: "100px" }}>
                          <Select
                            name="is_present"
                            onChange={()=>{handlePresentChange();
                              setName(item.name)
                            }}
                            style={{
                              width: "100px",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
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
                          >
                            <Option value="None">None</Option>
                            <Option value="Poor">Poor</Option>
                            <Option value="Good">Good</Option>
                          </Select>
                        </div>
                      </td>
                      <td>
                        <div>
                          {/* <Button type="primary" onClick={addRow}>
                          +
                        </Button> */}
                          <button style={{color:'white', backgroundColor:'black'}}  type="submit" >+</button>
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
