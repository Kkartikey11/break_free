/* eslint-disable react/jsx-no-undef */
import React, { useContext, useState } from "react";
import { Layout } from "antd";
import { NavLink } from "react-router-dom";
import {
  DashboardOutlined,
  ProfileOutlined,
  UnorderedListOutlined,
  DeploymentUnitOutlined,
  FileTextOutlined,
  MoneyCollectOutlined,
  BookOutlined,
  SettingOutlined,
  ApartmentOutlined,
  ClusterOutlined,
  AppstoreOutlined,
  UpOutlined,
  DownOutlined,
  RadarChartOutlined,
  AreaChartOutlined,
  AuditOutlined,
  InboxOutlined,
  HddOutlined,
  ScheduleOutlined,
  ReconciliationOutlined,
  HeatMapOutlined,
  BankOutlined,
  UsergroupAddOutlined,
  ContactsOutlined,
  DiffOutlined,


  
} from "@ant-design/icons";
import styles from "./siderNavbar.module.css";

const { Sider } = Layout;

const SideNavbar = () => {
  const [isOverViewOpen, setIsOverViewOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);




  return (
    <div className={styles.sider_container}>
      <Sider
       style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        // alignItems:'center'
        textAlign: 'center',
      }}
      >
        <div>
            <h1 style={{color:'#fff', fontSize:'20px'}}>

            BFF
            </h1>
        </div>
        <ul style={{marginTop:'50px'}}>
          <NavLink to="/dashboard" style={{display:'flex', alignItems:'center', gap:'10px', color:'white'}}>
          <BankOutlined className={styles.link_icon} /> Dashboard
          </NavLink>

          <NavLink to="/dashboard/student" style={{display:'flex', alignItems:'center', gap:'10px', color:'white'}}>
            <UsergroupAddOutlined className={styles.link_icon} />Student
          </NavLink>

          <NavLink to="/dashboard/batch" style={{display:'flex', alignItems:'center', gap:'10px', color:'white'}}>
            <ContactsOutlined className={styles.link_icon} /> Batch
          </NavLink>

          <NavLink to="/dashboard/events" style={{display:'flex', alignItems:'center', gap:'10px', color:'white'}}>
            <ProfileOutlined className={styles.link_icon} />Events
          </NavLink>

          <NavLink to="/dashboard/subject" style={{display:'flex', alignItems:'center', gap:'10px', color:'white'}}>
          <DiffOutlined className={styles.link_icon} /> Subjects
          </NavLink>

          <NavLink to="/dashboard/grade" style={{display:'flex', alignItems:'center', gap:'10px', color:'white'}}>
            <DashboardOutlined className={styles.link_icon} /> Grades
          </NavLink>

          <NavLink to="/dashboard/roles" style={{display:'flex', alignItems:'center', gap:'10px', color:'white'}}>
          <HeatMapOutlined className={styles.link_icon} /> Roles
          </NavLink>
         
        

          {/* <div
            className={`${isSettingsOpen ? styles.active_link : styles.link}`}
          >
            <NavLink
              onClick={() => {
                setIsSettingsOpen(!isSettingsOpen);
                setIsOverViewOpen(false);
                setIsReportOpen(false);
              }}
            >
              <SettingOutlined className={styles.link_icon} />
              <li>Settings</li>
              <span style={{ paddingLeft: 15 , fontSize: 13 }}>
                {isSettingsOpen ? <UpOutlined /> : <DownOutlined />}
              </span>
            </NavLink>
            <ul
              className={`${styles.sider_list_dropdown} ${
                isSettingsOpen ? styles.active : ""
              }`}
            >
              <NavLink to="/web/product-category">
                <ApartmentOutlined
                  className={styles.link_icon}
                  style={{ position: "relative", marginLeft: -8 }}
                />
                <li className={styles.sub_icon} style={{ lineHeight: "15px" }}>
                  Product Category
                </li>
              </NavLink>
              <NavLink to="/web/customer-category">
                <ClusterOutlined
                  className={styles.link_icon}
                  style={{ position: "relative", marginLeft: -8 }}
                />
                <li className={styles.sub_icon} style={{ lineHeight: "15px" }}>
                  Customer Category
                </li>
              </NavLink>
              <NavLink to="/web/lead-category">
                <ClusterOutlined
                  className={styles.link_icon}
                  style={{ position: "relative", marginLeft: -8 }}
                />
                <li className={styles.sub_icon} style={{ lineHeight: "15px" }}>
                  Lead Category
                </li>
              </NavLink>
              <NavLink to="/web/product-unit">
                <InboxOutlined
                  className={styles.link_icon}
                  style={{ position: "relative", marginLeft: -8 }}
                />
                <li className={styles.sub_icon} style={{ lineHeight: "15px" }}>
                  Product Unit
                </li>
              </NavLink>
              <NavLink to="/web/preferences">
                <ClusterOutlined
                  className={styles.link_icon}
                  style={{ position: "relative", marginLeft: -8 }}
                />
                <li className={styles.sub_icon} style={{ lineHeight: "15px" }}>
                  Preferences
                </li>
              </NavLink>
            </ul>
          </div> */}
        </ul>
      </Sider>
    </div>
  );
};

export default SideNavbar;