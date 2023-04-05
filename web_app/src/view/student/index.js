import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Context from "../../components/sidebar/context/Context";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { studentAction } from "../../redux/action/student";
import AddStudent from "./addStudent";
import { useContext } from "react";
import EditStudent from "./editStudent";

const Student = () => {
  const context = useContext(Context);
  const { studentData, setStudentData, setEditStudentOpen, setAddStudentOpen } =
    context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [studentList, setStudentList] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => {
    setAddStudentOpen(false);
  };

  useEffect(() => {
    dispatch(studentAction());
  }, []);

  useEffect(() => {
    if (state.getStudent.data !== "") {
      if (state.getStudent.data.data.code === 200) {
        setStudentList(state.getStudent.data.data.data);
      }
    }
  }, [state]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Grade",
      dataIndex: "grade",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setStudentData(record);
              setEditStudentOpen(true);
            }}
          >
            Edit
          </a>
        </Space>
      ),
    },
  ];

  console.log(studentData);

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
          <div>
            <h1 style={{ fontSize: "30px", margin: "0px" }}>Student List</h1>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Button
              
              onClick={() => {
                setAddStudentOpen(true);
              }}
              style={{backgroundColor: "black", color: "white", fontWeight:'600'}}
            >
              Add Student
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={studentList && studentList}
          pagination={true}
          scroll={{ x: "100%" }}
        />
        <AddStudent isEditable={isEditable} />
        <EditStudent />
      </Content>
    </>
  );
};

export default Student;
