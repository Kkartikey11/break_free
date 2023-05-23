import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Context from "../../components/sidebar/context/Context";
import { useNavigate } from "react-router-dom";
import { Button, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { deleteSubjectAction, subjectAction } from "../../redux/action/subject";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";
import AddBFFStar from "./addBFF";

const BFFStarList = () => {
  const context = useContext(Context);
  const { setAddBatchOpen, setSubjectData, setEditSubjectOpen, setAddBffStarOpen } = context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
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
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          style={{
            width: "100px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <a
            onClick={() => {
              setSubjectData(record);
              setEditSubjectOpen(true);
            }}
            style={{ color: "green" }}
          >
            <EditOutlined style={{ color: "green" }} /> Edit
          </a>

          <a
            onClick={() => {
              setSubjectData(record);
              // alert(record.id);
              dispatch(deleteSubjectAction(record));
              dispatch(subjectAction());
              
            }}
            style={{ color: "green" }}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </a>
        </Space>
      ),
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
        <div >
            <h1 style={{ fontSize: "30px", margin: "0px" }}>BFF Star's List</h1>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            onClick={() => {
                setAddBffStarOpen(true);
            }}
            style={{backgroundColor: "black", color: "white", fontWeight:'600'}}
          >
            Add BFF Star
          </Button>
        </div>
        </div>
        <Table
          columns={columns}
          dataSource={subjectList && subjectList}
          pagination={true}
          scroll={{ x: "100%" }}
        />
      </Content>
      <AddBFFStar />
    </>
  );
};

export default BFFStarList;
