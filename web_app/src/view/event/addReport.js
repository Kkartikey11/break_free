import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Context from "../../components/sidebar/context/Context";
import { useNavigate } from "react-router-dom";
import { Button, Select, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { eventAction } from "../../redux/action/event";
import AddEvent from "./addEvent";
import EditEvent from "./editEvent";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { Option } from "antd/es/mentions";

const AddReport = ({ student }) => {
  const context = useContext(Context);
  const { setAddEventOpen, eventData, setEventData, setEditEventOpen } =
    context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [eventList, setEventList] = useState("");
  const [inputList, setInputList] = useState([{ is_present: "", participation: "",video_presence: "", concentration: "",grasping: "", application_of_concepts: "",retention: "", confidence: "" }]);

  console.log("row data---->", eventData);

  console.log("inputList--->", inputList);

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
      const handleInputChange = (e, index) => {
        console.log()
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
      };
     
      // handle click event of the Remove button
      const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
      };
     
      // handle click event of the Add button
      const handleAddClick = () => {
        setInputList([...inputList, { firstName: "", lastName: "" }]);
      };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text,record) => <div style={{width:'100px'}}>{text}</div>
      // render: (text,record) => <div>{record.students.map((item) => <div>{item.name}</div>)}</div>,
    },
    {
      title: "Is Present",
      //   dataIndex: "event_datetime",
      render: (text) => (
        <div style={{width:'100px'}}>
          <Select
            name="is_present"
            onChange={e => handleInputChange(e)}
            style={{
              width: "100px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            
                <Option value="0" >
                Absent
                </Option>
                <Option value="1" >
                Present
                </Option>
              
          </Select>
        </div>
      ),
    },
    {
      title: "Participation",
      //   dataIndex: "event_datetime",
      render: (text) => (
        <div>
          <Select
            onChange={e => handleInputChange(e)}
            name="participation"
            style={{
              width: "100px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            
                <Option value="1" >
                None
                </Option>
                <Option value="2" >
                Poor
                </Option>
                <Option value="3" >
                Good
                </Option>
              
          </Select>
        </div>
      ),
    },
    {
      title: "Video Presence",
      //   dataIndex: "event_datetime",
      render: (text) => (
        <div>
          <Select
            onChange={e => handleInputChange(e)}
            name="video_presence"
            style={{
              width: "100px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            
                <Option value="1" >
                None
                </Option>
                <Option value="2" >
                Poor
                </Option>
                <Option value="3" >
                Good
                </Option>
              
          </Select>
        </div>
      ),
    },
    {
      title: "Concentration",
      //   dataIndex: "event_datetime",
      render: (text) => (
        <div>
          <Select
            onChange={e => handleInputChange(e)}
            name="concentration"
            style={{
              width: "100px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            
                <Option value="1" >
                None
                </Option>
                <Option value="2" >
                Poor
                </Option>
                <Option value="3" >
                Good
                </Option>
              
          </Select>
        </div>
      ),
    },
    {
      title: "Grasping",
      //   dataIndex: "event_datetime",
      render: (text) => (
        <div>
          <Select
            onChange={e => handleInputChange(e)}
            name="grasping"
            style={{
              width: "100px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            
                <Option value="1" >
                None
                </Option>
                <Option value="2" >
                Poor
                </Option>
                <Option value="3" >
                Good
                </Option>
              
          </Select>
        </div>
      ),
    },
    {
      title: "Application Of Concepts",
      //   dataIndex: "event_datetime",
      render: (text) => (
        <div>
          <Select
            onChange={e => handleInputChange(e)}
            name="application_of_concepts"
            style={{
              width: "100px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            
                <Option value="1" >
                None
                </Option>
                <Option value="2" >
                Poor
                </Option>
                <Option value="3" >
                Good
                </Option>
              
          </Select>
        </div>
      ),
    },
    {
      title: "Retention",
      //   dataIndex: "event_datetime",
      render: (text) => (
        <div>
          <Select
            style={{
              width: "100px",
              textAlign: "center",
              fontWeight: "600",
            }}
            onChange={e => handleInputChange(e)}
            name="retention"
          >
            
                <Option value="1" >
                None
                </Option>
                <Option value="2" >
                Poor
                </Option>
                <Option value="3" >
                Good
                </Option>
              
          </Select>
        </div>
      ),
    },
    {
      title: "Confidence",
      //   dataIndex: "event_datetime",
      render: (text) => (
        <div>
          <Select
            // onChange={(e) => setMentors(e)}
            onChange={e => handleInputChange(e)}
            style={{
              width: "100px",
              textAlign: "center",
              fontWeight: "600",
            }}
            name="confidence"
          >
            
                <Option value="1" >
                None
                </Option>
                <Option value="2" >
                Poor
                </Option>
                <Option value="3" >
                Good
                </Option>
              
          </Select>
        </div>
      ),
    },
    
    // {
    //   title: "Description",
    //   dataIndex: "description",
    // },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle" style={{width:'100px', display:'flex', justifyContent:'space-around'}}>
    //       <a
    //         onClick={() => {
    //           setEventData(record);
    //           setEditEventOpen(true);
    //         }}
    //         style={{color:'green'}}
    //       >
    //        <EditOutlined style={{color:'green'}} /> Edit
    //       </a>

    //       <a
    //         onClick={() => {
    //           setEventData(record);
    //           alert(record.id);
    //         }}
    //         style={{color:'green'}}
    //       >
    //        <DeleteOutlined style={{color:'red'}}/>
    //       </a>
    //     </Space>
    //   ),
    // },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClose = () => {
    navigate("/events")
  };




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
          <h1 style={{ fontSize: "25px" }}>Add Report</h1>
        </div>
        <Table
          columns={columns}
          dataSource={eventData.students && eventData.students}
          pagination={false}
          scroll={{ x: "100%" }}
        />
        <div>

        {/* <div >
                <table  >
                    <thead>
                      <tr>
                        <th style={{fontSize:''}}>Student</th>
                        <th >Is Present</th>
                        <th >Participation</th>
                        <th >Video Presence</th>
                        <th >Concentration</th>
                        <th >Grasping</th>
                        <th >Application of Concepts</th>
                        <th >retention</th>
                        <th >confidence</th>
                      </tr>
                    </thead>
                    <tbody>
                    {eventData.students && eventData.students.map((students, index) =>

                    
                     { return   <tr key={index}>
                      
                        <th scope="row" name="name">{students.name}</th>
                        <td>
                          <select id="inputState" className="form-control custom-select" name="is_present" required>
                            <option selected value="">Select</option>
                            <option value="0">Absent</option>
                            <option value="1">Present</option>
                          </select>
                        </td>
                        <td >
                          <select id="inputState" name="participation" required>
                            <option selected value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </td>
                        <td>
                          <select id="inputState" name="video_presence" required>
                            <option selected value="">Select</option>
                            <option value="1">None</option>
                            <option value="2">Poor</option>
                            <option value="3">Good</option>
                          </select>
                        </td>
                        <td>
                          <select id="inputState" name="concentration" required>
                            <option selected value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </td>
                        <td>
                          <select id="inputState" name="grasping" required>
                            <option selected value="">Select</option>
                            <option value="1">None</option>
                            <option value="2">Poor</option>
                            <option value="3">Good</option>
                          </select>
                        </td>
                        <td>
                          <select id="inputState" name="application_of_concepts" required>
                            <option selected value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </td>
                        <td>
                          <select id="inputState" name="retention" required>
                            <option selected value="">Select</option>
                            <option value="1">None</option>
                            <option value="2">Poor</option>
                            <option value="3">Good</option>
                          </select>
                        </td>
                        <td>
                          <select id="inputState" name="confidence" required>
                            <option selected value="">Select</option>
                            <option value="1">None</option>
                            <option value="2">Poor</option>
                            <option value="3">Good</option>
                          </select>
                        </td>
                      </tr>}
                      
                    )}
                    </tbody>
                  </table>
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
                >
                  Add
                </Button>
            </div>
        </div>
      </Content>
    </>
  );
};

export default AddReport;
