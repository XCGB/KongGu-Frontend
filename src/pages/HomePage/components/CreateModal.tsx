import {addPost} from "@/services/ant-design-pro/api";
import {Button, message, Modal} from 'antd';
import React, {PropsWithChildren, useState} from 'react';
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
    if (result){
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
  const { modalVisible, onSubmit, onCancel } = props;
  const [content, setContent] = useState("");// 添加状态变量来存储输入的值

  return (
    <Modal
      destroyOnClose
      title="发布内容"
      width={700}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={[
        <Button key="cancel" onClick={() => onCancel()}>取消</Button>,
        <Button key="submit" type="primary" onClick={async () => {
          // @ts-ignore
          const post: API.Post = {
            reviewStatus: 1, //暂时设置为1，不用审核直接通过
            content: content // 使用输入的文本内容作为 content 的值
          };
          const success = await handleAdd(post);
          if (success) {
            onSubmit?.();
          }
        }}>发布</Button>
      ]}
    >
      <TextArea
        placeholder="请输入内容"
        autoSize={{ minRows: 12, maxRows: 30 }}
        showCount
        maxLength={8192}
        value={content} // 将输入的值绑定到 TextArea 组件的 value 属性
        onChange={(e) => setContent(e.target.value)} // 在输入变化时更新状态变量的值
      />
    </Modal>
  );
};

export default CreateModal;
