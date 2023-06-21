import type {ActionType, ProColumns} from "@ant-design/pro-components";
import {Button, Divider, Form, Input, message, Modal, Popconfirm, Space, Typography} from "antd";
import React, {useRef, useState} from "react";
import {deletePost, listPost, updatePost} from "@/services/ant-design-pro/api";
import {ProTable} from "@ant-design/pro-components";

const AdminPostPage: React.FC<unknown> = () => {
  const [updateData, setUpdateData] = useState<API.Post>({});
  const [reviewModalVisible, setReviewModalVisible] = useState<boolean>(false);
  const [reviewMessage, setReviewMessage] = useState<string>('通过');
  const actionRef = useRef<ActionType>();

  /**
   *  删除节点
   * @param selectedRows
   */
  const doDelete = async (selectedRows: API.Post[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      const result = await deletePost({
        id: selectedRows.find((row) => row.id)?.id || 0,
      });
      if (result) {
        message.success('操作成功');
      }
    } catch (e: any) {
      message.error('操作失败，' + e.message);
    } finally {
      hide();
    }
  };

  /**
   * 更新审核状态
   * @param post
   * @param status
   */
  const handleReview = async (post: API.Post, status: number) => {
    const hide = message.loading("处理中");
    try {
      await updatePost({
        id: post.id,
        reviewStatus: status,
        reviewMessage: status === 2 && reviewMessage === "通过" ? "" : reviewMessage,
      });
      message.success("操作成功");
      actionRef.current?.reload();
    } catch (e: any) {
      message.error("操作失败，" + e.message);
    } finally {
      hide();
    }
    setReviewModalVisible(false);
    setReviewMessage("通过"); // 重置审核信息为默认值
  };

  // 定义列的属性
  const columns: ProColumns<API.Post>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '发布者id',
      dataIndex: 'userId',
      copyable: true
    },
    {
      title: '内容',
      dataIndex: 'content',
      search: false,
    },
    {
      title: '点赞数',
      search: false,
      dataIndex: 'thumbNum',
    },
    {
      title: '创建时间',
      search: false,
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '更新时间',
      search: false,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      search: false,
      valueEnum: {
        0: {text: '待审核', status: 'Default'},
        1: {text: '通过', status: 'Success'},
        2: {text: '拒绝', status: 'Error'}
      },
    },
    {
      title: '审核信息',
      dataIndex: 'reviewMessage',
      search: false,
      copyable: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <Typography.Link
            onClick={() => {
              setUpdateData(record);
              setReviewMessage("通过");
              setReviewModalVisible(true);
            }}
          >
            审核
          </Typography.Link>
          <Popconfirm
            title="您确定要删除么？"
            onConfirm={() => doDelete([record])}
            okText="确认"
            cancelText="取消"
          >
            <Typography.Link type="danger">删除</Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <ProTable<API.Post>
        actionRef={actionRef}
        columns={columns}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          const postList = await listPost();
          return Promise.resolve({
            data: postList
          });
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        dateFormatter="string"
        toolbar={{
          title: '帖子列表',
          tooltip: '',
        }}
      />
      <Modal
        title="审核"
        visible={reviewModalVisible}
        onCancel={() => setReviewModalVisible(false)}
        footer={null}
      >
        <Form>
          <Form.Item label="审核信息">
            <Input.TextArea
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
            />
          </Form.Item>
        </Form>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Space>
            <Button
              type="danger"
              onClick={() => handleReview(updateData, 2)}
              disabled={reviewMessage === "通过"}
            >
              拒绝
            </Button>
            <Button
              type="primary"
              onClick={() => handleReview(updateData, 1)}
            >
              通过
            </Button>
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default AdminPostPage;
