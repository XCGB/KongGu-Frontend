import { addPost, listTags } from "@/services/ant-design-pro/api";
import { Button, message, Modal, Select } from 'antd';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import TextArea from "antd/es/input/TextArea";

interface CreateModalProps {
  modalVisible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.Post) => {
  const hide = message.loading('正在发布');
  try {
    const result = await addPost({ ...fields } as API.PostAddRequest);
    hide();
    if (result) {
      message.success('发布成功');
      return true;
    }
    return false;
  } catch (error) {
    hide();
    message.error('发布失败请重试！');
    return false;
  }
};

/**
 * 创建数据模态框
 * @param props
 * @constructor
 */
const CreateModal: React.FC<PropsWithChildren<CreateModalProps>> = (props) => {
  const { modalVisible, onSubmit, onCancel, tagList } = props;

  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<{ id: string }[]>([]);

  return (
    <Modal
      destroyOnClose
      title="发布内容"
      width={700}
      visible={modalVisible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>取消</Button>,
        <Button
          key="submit"
          type="primary"
          onClick={async () => {
            const post: API.Post = {
              reviewStatus: 1,
              content: content,
              tags: selectedTags
            };
            console.log(post);
            const success = await handleAdd(post);
            if (success) {
              onSubmit?.();
            }
          }}
        >
          发布
        </Button>
      ]}
    >
      <TextArea
        placeholder="请输入内容"
        autoSize={{ minRows: 12, maxRows: 30 }}
        showCount
        maxLength={8192}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Select
        mode="tags"
        placeholder="选择标签"
        style={{ width: "100%", marginTop: 16 }}
        value={selectedTags.map((tag) => tag.id)}
        onChange={(values) =>
          setSelectedTags(values.map((tagId) => ({ id: tagId })))
        }
      >
        {tagList.map((tag) => (
          <Select.Option key={tag.id} value={tag.id}>
            {tag.tagName}
          </Select.Option>
        ))}
      </Select>
    </Modal>
  );
};


export default CreateModal;
