import { Button, Drawer, Form, Input, Modal, Select, Upload, theme } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Context from "../../components/sidebar/context/Context";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import { addUserAction, userAction } from "../../redux/action/user";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddBFFStar = () => {
  const context = useContext(Context);
  const { addBffStarOpen, setAddBffStarOpen } = context;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state);
  const [apiData, setApiData] = useState({});
  const [gradeList, setGradeList] = useState("");

  const onFinish = (values) => {
    const formData = {
      name: values.name,
      email: values.email,
      about: values.about,
      role_id: parseFloat(values.role_id),
      password: values.password,
    };
    setApiData(formData);
    dispatch(addUserAction(formData));
    navigate("/web/users");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    navigate("/web/users");
  };

  useEffect(() => {
    if (state.getGrade.data !== "") {
      if (state.getGrade.data.data.code === 200) {
        setGradeList(state.getGrade.data.data.data);
      }
    }
    if (state.addUser.data !== "") {
      if (state.addUser.data.data.code === 200) {
        navigate("/web/users");
        window.location.reload();
      }
    }
  }, [state]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClose = () => {
    setAddBffStarOpen(false);
  };


  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);

  console.log(fileList);


  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Drawer
        className="container"
        title={
          <>
            <CloseOutlined onClick={onClose} /> <span>Add BFF Star of the month</span>{" "}
          </>
        }
        width={450}
        closable={false}
        onClose={onClose}
        open={addBffStarOpen}
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
              label="Name"
              style={{ fontWeight: "600" }}
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input style={{ width: "340px" }} />
            </Form.Item>


            <Form.Item
              label="About"
              style={{ fontWeight: "600" }}
              name="about"
              rules={[{ required: true, message: "Please input about star!" }]}
            >
              <Input style={{ width: "336px" }} />
            </Form.Item>

            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-circle"
                // fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>


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

export default AddBFFStar;
