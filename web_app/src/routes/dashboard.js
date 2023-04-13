import { Route, Routes } from "react-router-dom";
import Dashboard from "../view/dashboard";
import Student from "../view/student";
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    LoginOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Button, Layout, Menu, theme } from 'antd';
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
import AddGrade from "../view/grade/addGrade";
import AddUser from "../view/users/addUser";
import AddEvent from "../view/event/addEvent";
import AddSubject from "../view/subject/addSubject";
import Login from "../view/auth";
import Cookies from "universal-cookie";
  const { Header, Content, Footer, Sider } = Layout;


const DashboardRoutes = () => {

  const onLogoutHandle = () => {
const cookie = new Cookies();
    cookie.remove('auth_token');


  }

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
        <header
          style={{
            padding: 0,
            height: 60,
            background: colorBgContainer,
          }}
          
        >
          <div>
            <div style={{display:'flex', justifyContent:'end'}}>
            <Button onClick={onLogoutHandle} style={{backgroundColor:'#000', color:'white', fontWeight:'600', marginTop:'10px'}} shape="round" icon={<LoginOutlined />} >
            LogOut
          </Button>
            </div>
          </div>
          </header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/student" element={<Student />} />
            <Route path="/batch" element={<Batch />} />
            <Route path="/grade" element={<Grade />} />
            <Route path="/subject" element={<Subjects />} />
            <Route path="/users" element={<Users />} />
            <Route path="/events" element={<Event />} />
            <Route path="/students/add-student" element={<AddStudent />} />
            <Route path="/batch/add-batch" element={<AddBatches />} />
            <Route path="/grade/add-grade" element={<AddGrade />} />
            <Route path="/users/add-user" element={<AddUser />} />
            <Route path="/events/add-event" element={<AddEvent />} />
            <Route path="/subject/add-subject" element={<AddSubject />} />
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
