import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import Context from "../../components/sidebar/context/Context";
import { useNavigate } from "react-router-dom";
import { Button, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { batchAction } from "../../redux/action/batch";
import AddBatches from "./addBatches";
import EditBatch from "./editBatch";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Batch = () => {
  const context = useContext(Context);
  const { setAddBatchOpen, setEditBatchOpen,setBatchData  } =
    context;
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        // <Space size="middle">
        //   <a
            // onClick={() => {
            //   setBatchData(record);
            //   setEditBatchOpen(true);
            // }}
        //   >
        //     Edit
        //   </a>
        // </Space>

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
              setBatchData(record);
              setEditBatchOpen(true);
            }}
            style={{ color: "green" }}
          >
            <EditOutlined style={{ color: "green" }} /> Edit
          </a>

          <a
            onClick={() => {
              setBatchData(record);
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
            <h1 style={{ fontSize: "30px", margin: "0px" }}>Batch List</h1>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              onClick={() => {
                setAddBatchOpen(true);
              }}
              style={{backgroundColor: "black", color: "white", fontWeight:'600'}}
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
        <AddBatches />
        <EditBatch />
      </Content>
    </>
  );
};

export default Batch;
