import { Button, Checkbox, Drawer, Form, Input, Select, theme } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import Context from "../../components/sidebar/context/Context";
import { addBatchesAction, batchAction } from "../../redux/action/batch";
import { subjectAction } from "../../redux/action/subject";
import { studentAction } from "../../redux/action/student";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./batch.moduler.css";

const AddBatches = () => {
  const context = useContext(Context);
  const { addBatchOpen, setAddBatchOpen } = context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});
  const [subjectList, setSubjectList] = useState([]);
  const [studentList, setStudentList] = useState("");
  const [selectStudentList, setSelectStudentList] = useState("");
  const [selectSubject, setSubject] = useState("");
  const [allSelectValue, setAllSelectValue] = useState(false);

  //api call
  const onFinish = (values) => {
    console.log(values);
    const formData = {
      name: values.name,
      description: values.description,
      subject_id: selectSubject ,
      students: selectStudentList,
    };
    console.log(formData);
    setApiData(formData);
    dispatch(addBatchesAction(formData));
    dispatch(batchAction());
    navigate("/web/batch");
  };

  console.log(selectSubject);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onClose = () => {
    setAddBatchOpen(false);
  };

  useEffect(() => {
    if (state.getSubject.data !== "") {
      if (state.getSubject.data.data.code === 200) {
        setSubjectList(state.getSubject.data.data.data);
      }
    }
    if (state.getStudent.data !== "") {
      if (state.getStudent.data.data.code === 200) {
        setStudentList(state.getStudent.data.data.data);
      }
    }
    if (state.addBatches.data !== "") {
      if (state.addBatches.data.data.code === 200) {
        navigate("/batch");
        window.location.reload();
      }
    }
  }, [state]);

  useEffect(() => {
    dispatch(subjectAction());
    dispatch(studentAction());
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onSelectCategoryChange = (checkedValues) => {
    setSelectStudentList(checkedValues);
  };


  return (
    <>
      <Drawer
        className="container"
        title={
          <>
            <CloseOutlined onClick={onClose} /> <span>Add New Batch</span>{" "}
          </>
        }
        width={500}
        closable={false}
        onClose={onClose}
        open={addBatchOpen}
        style={{ overflowY: "auto" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ marginTop: "30px" }}
          >
            <Form.Item
              style={{ fontWeight: "600" }}
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  for="subject_id"
                  style={{ fontWeight: "600", marginBottom: "10px" }}
                >
                  {" "}
                  Name :
                </label>
                <Input style={{ width: "437px" }} />
              </div>
            </Form.Item>

            <Form.Item
              style={{ fontWeight: "600" }}
              name="description"
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  for="subject_id"
                  style={{ fontWeight: "600", marginBottom: "10px" }}
                >
                  {" "}
                  Description :
                </label>
                <Input style={{ width: "437px" }} />
              </div>
            </Form.Item>

            <Form.Item
              name="subject_id"
              style={{ fontWeight: "600" }}
              // label="Subject"
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  for="subject_id"
                  style={{ fontWeight: "600", marginBottom: "10px" }}
                >
                  {" "}
                  Subject :
                </label>
                <Select
                  placeholder="Please Select Subject"
                  style={{
                    width: "365px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                  onChange={(e)=> setSubject(e)}
                >
                  {subjectList &&
                    subjectList.map((data, index) => {
                      console.log(data);
                    return ( <Option
                        key={index}
                        value={data.id}
                      >
                        {data && data.name}
                      </Option>)
})}
                </Select>
              </div>
            </Form.Item>

            <div style={{ marginLeft: "10px" }}>
              <div
                style={{
                  display: "flex",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                <label>Select Student :</label>
              </div>
              <div style={style.category}>
                <Checkbox.Group onChange={onSelectCategoryChange}>
                  <div
                    className={styles.selectGroup}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      gap: "15px",
                      height: "100px",
                      overflowX: "hidden",
                      overflowY: "scroll",
                      marginBottom: "20px",
                      marginTop: "20px",
                      width:'423px',
                    }}
                  >
                    {studentList &&
                      studentList.map((item, index) => (
                        <Checkbox
                          value={item.id}
                          style={{ width: "160px", marginLeft: "8px" }}
                        >
                          {item.name}
                        </Checkbox>
                      ))}
                  </div>
                </Checkbox.Group>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "30px",
              }}
            >
              <Form.Item>
                <Button
                  htmlType="submit"
                  onClick={onClose}
                  style={{ marginRight: "20px" }}
                >
                  Cancel
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "#000" }}
                >
                  Add
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Drawer>
    </>
  );
};

export default AddBatches;

const style = {
  date: {
    display: "flex",
    gap: "40px",
  },
  dateInput: {
    height: "40px",
  },
  category: {
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
  },
};
