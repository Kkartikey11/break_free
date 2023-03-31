import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Button, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { batchAction } from "../../redux/action/batch";

const Batch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [batchList, setBatchList] = useState("");

  useEffect(() => {
    dispatch(batchAction());
  }, []);

  useEffect(() => {
    if (state.getBatches.data !== "") {
      if (state.getBatches.data.data.code === 200) {
        setBatchList(state.getBatches.data.data.data);
      }
    }
  }, [state]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "30px", margin: "0px" }}>Batch List</h1>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              onClick={() => {
                navigate("/batch/add-batch");
              }}
            >
              Add Batch
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={batchList && batchList}
          pagination={true}
          scroll={{ x: "100%" }}
        />
      </Content>
    </>
  );
};

export default Batch;
