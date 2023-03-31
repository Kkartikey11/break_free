import { Route, Routes } from "react-router-dom";
import Dashboard from "../view/dashboard";
import Student from "../view/student";
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu, theme } from 'antd';
  import React from 'react';
import SideNavbar from "../components/sidebar";
import Batch from "../view/batch";
import Grade from "../view/grade";
import Subjects from "../view/subject";
import Roles from "../view/users";
import Event from "../view/event";
import Users from "../view/users";
import AddStudent from "../view/student/addStudent";
import AddBatches from "../view/batch/addBatches";
  const { Header, Content, Footer, Sider } = Layout;


const DashboardRoutes = () => {

    const {
        token: { colorBgContainer },
      } = theme.useToken();

  return (
    <Layout >
      <SideNavbar />
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/student" element={<Student />} />
            <Route path="/batch" element={<Batch />} />
            <Route path="/grade" element={<Grade />} />
            <Route path="/subject" element={<Subjects />} />
            <Route path="/users" element={<Users />} />
            <Route path="/events" element={<Event />} />
            <Route path="/students/add-student" element={<AddStudent />} />
            <Route path="/batch/add-batch" element={<AddBatches />} />
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          BFF ©2023 Created by Rishabh
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardRoutes;
