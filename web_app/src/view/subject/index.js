import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Button, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { subjectAction } from "../../redux/action/subject";

const Subjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [subjectList, setSubjectList] = useState("");

  useEffect(() => {
    dispatch(subjectAction());
  }, []);

  useEffect(() => {
    if (state.getSubject.data !== "") {
      if (state.getSubject.data.data.code === 200) {
        setSubjectList(state.getSubject.data.data.data);
      }
    }
  }, [state]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
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
        <div style={{display:'flex', fontSize:'18px'}}>
            <h1>Subject List</h1>
        </div>
         <div
          direction="vertical"
          style={{ margin: "20px", display: "flex", justifyContent: "end" }}
        >
          <Button
            type="primary"
            onClick={() => {
              navigate("/batch/add-batch");
            }}
          >
            Add Subject
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={subjectList && subjectList}
          pagination={true}
          scroll={{ x: "100%" }}
        />
      </Content>
    </>
  );
};

export default Subjects;
