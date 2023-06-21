import {Form, Input, message, Modal, Select} from "antd";
import {useEffect, useState} from "react";
import {uploadAvatar} from "@/services/ant-design-pro/api";
import Dragger from "antd/es/upload/Dragger";
import {InboxOutlined} from "@ant-design/icons";

// 弹出新增用户界面
export const UserFormModal = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const [, setAvatarFile] = useState(null);
  const [avatar, setAvatar] =  useState(null);

  const handleOk = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      onCreate(values);
    });
  };

  const handleAvatarChange = async (info) => {
    const { status, originFileObj } = info.file;
    if (status === 'done') {
      // 上传成功
      setAvatarFile(originFileObj);
      try {
        // 调用异步函数上传头像到阿里OSS
        const url  = await uploadAvatar(originFileObj);
        form.setFieldsValue({ avatar: url }); // 将URL设置到表单字段中
        setAvatar(url); // 设置头像URL
        message.success('头像上传成功');
      } catch (error) {
        message.error('头像上传失败');
      }
    } else if (status === 'error') {
      // 上传失败
      message.error('头像上传失败');
    }
  };

  useEffect(() => {
    if (visible) {
      setAvatarFile(null);
      setAvatar('');
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      title="新增用户"
      okText="创建"
      cancelText="取消"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="avatar" label="头像">
          {avatar ? (
            <img src={avatar} alt="Avatar"  style={{ width: '150px', height: '100px' }} />
          ) : (
            <Dragger
              accept="image/*"
              onChange={handleAvatarChange}
              showUploadList={false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖动文件到此区域上传头像</p>
            </Dragger>
          )}
        </Form.Item>
        <Form.Item
          name="userAccount"
          label="学号"
          rules={[{ required: true, message: 'Please input the username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="姓名"
          rules={[{ required: true, message: 'Please input the username!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};


