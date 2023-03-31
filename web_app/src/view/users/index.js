import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/action/user";

import { useNavigate } from "react-router-dom";
import { Button, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";

const Users = () => {
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
        <div style={{ display: "flex", fontSize: "18px" }}>
          <h1>Users List</h1>
        </div>
        <div direction="vertical" style={{ margin: "20px" , display:'flex', justifyContent:'end'}}>
          <Button
            type="primary"
            onClick={() => {
              navigate("/users/add");
            }}
          >
            Add User
          </Button>
        </div>
        <Table
          columns={column}
          dataSource={userList && userList}
          pagination={true}
          scroll={{ x: "100%" }}
        />
        
      </Content>
    </>
  );
};

export default Users;
