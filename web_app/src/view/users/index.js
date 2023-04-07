import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/action/user";
import Context from "../../components/sidebar/context/Context";
import { useNavigate } from "react-router-dom";
import { Button, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import AddUser from "./addUser";
import EditUser from "./editUser";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Users = () => {
  const context = useContext(Context);
  const { addUserOpen, setAddUserOpen, setEditUserOpen, setUserData } = context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  // console.log(state.getUser.data.data.data);
  const [userList, setUserList] = useState("");

  useEffect(() => {
    dispatch(userAction());
  }, []);

  useEffect(() => {
    if (state.getUser.data !== "") {
      if (state.getUser.data.data.code === 200) {
        setUserList(state.getUser.data.data.data);
      }
    }
  }, [state]);

  const column = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
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
              setUserData(record);
              setEditUserOpen(true);
            }}
            style={{ color: "green" }}
          >
            <EditOutlined style={{ color: "green" }} /> Edit
          </a>

          <a
            onClick={() => {
              setUserData(record);
              alert(record.id);
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
          <div>
            <h1 style={{ fontSize: "30px", margin: "0px" }}>Users List</h1>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              onClick={() => {
                setAddUserOpen(true);
              }}
              style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "600",
              }}
            >
              Add User
            </Button>
          </div>
        </div>
        <Table
          columns={column}
          dataSource={userList && userList}
          pagination={true}
          scroll={{ x: "100%" }}
        />
        <AddUser />
        <EditUser />
      </Content>
    </>
  );
};

export default Users;
