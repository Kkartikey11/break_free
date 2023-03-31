import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Button, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { studentAction } from "../../redux/action/student";

const Student = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [studentList, setStudentList] = useState("");

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
        <div style={{ display: "flex", justifyContent:'space-between', marginBottom:'20px' }}>
          <div>
          <h1 style={{fontSize:'30px', margin:'0px'}}>Student List</h1>
          </div>
          <div style={{marginTop:'10px'}}>

          <Button
            type="primary"
            onClick={() => {
              navigate("/students/add-student");
            }}
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
      </Content>
    </>
  );
};

export default Student;
