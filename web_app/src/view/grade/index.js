import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Button, Table, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { gradeAction } from "../../redux/action/grade";

const Grade = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [gradeList, setGradeList] = useState("");

  useEffect(() => {
    dispatch(gradeAction());
  }, []);
  
  useEffect(() => {
    if (state.getGrade.data !== "") {
      if (state.getGrade.data.data.code === 200) {
        setGradeList(state.getGrade.data.data.data);
      }
    }
  }, [state]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
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
            <h1>Grade List</h1>
        </div>
        <div
          direction="vertical"
          style={{ margin: "20px", display: "flex", justifyContent: "end" }}
        >
          <Button
            type="primary"
            onClick={() => {
              navigate("/grade/add-grade");
            }}
          >
            Add Grade
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={gradeList && gradeList}
          pagination={true}
          scroll={{ x: "100%" }}
        />
      </Content>
    </>
  );
};

export default Grade;
