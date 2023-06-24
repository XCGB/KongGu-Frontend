import type {ActionType, ProColumns} from "@ant-design/pro-components";
import React, {useEffect, useRef, useState} from "react";
import {ProTable} from "@ant-design/pro-components";
import {currentUser, searchPost} from "@/services/ant-design-pro/api";

// 在请求函数中获取当前用户ID并传递给searchPost
const request = async (params, sorter, filter) => {
  // 表单搜索项会从 params 传入，传递给后端接口。
  console.log(params, sorter, filter);

  try {
    // 调用currentUser获取当前用户信息
    const user = await currentUser();
    const currentUserId = user?.id; // 假设用户ID在user对象的id属性中

    // 使用获取到的用户ID调用searchPost
    const postList = await searchPost({ id: currentUserId });

    return Promise.resolve({
      data: postList
    });
  } catch (error) {
    // 处理错误
    console.error("Error fetching current user or post list:", error);
    return Promise.reject(error);
  }
};

const AdminPostPage: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();

  // 定义列的属性
  const columns: ProColumns<API.Post>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '发布者ID',
      dataIndex: 'userId',
      search: false,
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
      title: '发布时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
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
  ];

  return (
    <div>
      <ProTable<API.Post>
        actionRef={actionRef}
        columns={columns}
        request={request}
        rowKey="index"
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
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

export default AdminPostPage;
