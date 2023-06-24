import type {ActionType, ProColumns} from "@ant-design/pro-components";
import React, {useRef, useState} from "react";
import {deleteTag, deleteUsers, listTags} from "@/services/ant-design-pro/api";
import {ProTable, } from "@ant-design/pro-components";
import {List, message, Modal,} from "antd";

const handleDelete = (record: API.Tag, action: ActionType | undefined) => {
  const deleteConfirmationModal = Modal.confirm({
    title: '删除标签',
    content: (
      <>
        <p>请确认是否删除标签!</p>
        <p>标签名: {record.tagName}</p>
      </>
    ),
    onOk: () => {
      deleteConfirmationModal.destroy();
      deleteTag(record.id)
        .then(() => {
          message.success('标签删除成功');
          // 执行删除成功后的操作，例如重新加载数据
          if (action) {
            action.reload(); // 重新加载数据
          }
        })
        .catch((error) => {
          message.error('标签删除失败');
        });
    },
    onCancel: () => {
      deleteConfirmationModal.destroy();
    },
  });
};

const AdminTagPage: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();

  // 定义列的属性
  const columns: ProColumns<API.Tag>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '发布者ID',
      dataIndex: 'userId',
      copyable: true,
      search: false,
    },
    {
      title: '标签名',
      dataIndex: 'tagName'
    },
    {
      title: '引用次数',
      search: false,
      dataIndex: 'postNum',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      search: false,
    },
    {
      title: '更新时间',
      search: false,
      dataIndex: 'updateTime',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            Modal.info({
              title: '标签信息',
              content: (
                <List>
                  <List.Item>
                    <List.Item.Meta
                      title="标签名"
                      description={record.tagName}
                    />
                  </List.Item>
                </List>
              ),
            });
          }}
        >
          查看
        </a>,
        <a
          key="delete"
          onClick={() => {
            handleDelete(record,action)
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<API.Tag>
        actionRef={actionRef}
        columns={columns}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params);
          const tagList = await listTags(params);
          return Promise.resolve({
            data: tagList
          });
        }}
        rowKey="index"
        pagination={{
          showQuickJumper: true,
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        toolbar={{
          title: '帖子列表',
          tooltip: '',
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
      />

    </div>
  );
};

export default AdminTagPage;
