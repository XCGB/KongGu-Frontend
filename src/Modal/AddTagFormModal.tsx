import { Form, Input, Modal, Tag } from "antd";
import React, { useState } from "react";

// 弹出新增标签界面
export const AddTagFormModal = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const [selectedColor, setSelectedColor] = useState("");
  const [tagName, setTagName] = useState("");

  const handleOk = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      onCreate({ ...values, tagColor: selectedColor });
      setSelectedColor("");
      setTagName("");
    });
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleTagNameChange = (event) => {
    setTagName(event.target.value);
  };

  return (
    <Modal
      visible={visible}
      title="新增标签"
      okText="创建"
      cancelText="取消"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="tagName"
          label="标签名"
          rules={[{ required: true, message: "请输入标签名!" }]}
        >
          <Input value={tagName} onChange={handleTagNameChange} />
        </Form.Item>
        <Form.Item
          name="tagColor"
          label="标签颜色"
          rules={[{ required: true, message: "请选择标签颜色!" }]}
        >
          <input type="color" value={selectedColor} onChange={handleColorChange} />
        </Form.Item>
      </Form>
      <div style={{ marginTop: "10px" }}>
        {selectedColor && <Tag color={selectedColor}>{tagName}</Tag>}
      </div>
    </Modal>
  );
};
