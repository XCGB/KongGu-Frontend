import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {appendUser, deleteUsers, searchUsers} from '@/services/ant-design-pro/api';
import {useRef, useState} from 'react';
import {Avatar, Button, Col, Image, List, message, Modal, Row, Space, Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {UserFormModal} from '@/Modal/UserFormModal'
import moment from "moment";

const handleDelete = (record: API.CurrentUser, action: ActionType | undefined) => {
  const deleteConfirmationModal = Modal.confirm({
    title: '删除用户',
    content: (
      <>
        <p>请确认是否删除用户!</p>
        <p>学号: {record.userAccount}</p>
        <p>姓名: {record.username}</p>
      </>
    ),
    onOk: () => {
      deleteConfirmationModal.destroy();
      deleteUsers(record.id)
        .then(() => {
          message.success('用户删除成功');
          // 执行删除成功后的操作，例如重新加载数据
          if (action) {
            action.reload(); // 重新加载数据
          }
        })
        .catch((error) => {
          message.error('用户删除失败');
        });
    },
    onCancel: () => {
      deleteConfirmationModal.destroy();
    },
  });
};

// 定义列的属性
const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '学号',
    dataIndex: 'userAccount',
    search: false,
  },
  {
    title: '姓名',
    dataIndex: 'username',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    search: false,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    search: false,
    render: (_, record) => (
      <div>
        <Image src={record.avatar} width={100}></Image>
      </div>
    ),
  },
  {
    title: '性别',
    dataIndex: 'gender',
    search: false,
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      // all: {text: '超长'.repeat(50)},
      0: {text: '男', status: 'success'},
      1: {text: '女', status: 'success'},
    },
    render: (text, record) => {
      const genderLabel = record.gender === 0 ? '男' : '女';
      const genderColor = record.gender === 0 ? 'seagreen' : 'cornflowerblue'; // 海绿色 矢车菊蓝
      return (
        <Space>
          <Tag color={genderColor}>{genderLabel}</Tag>
        </Space>
      );
    },
  },
  {
    title: '入学年份',
    dataIndex: 'grade',
    search: false,
  },
  {
    title: '学院',
    dataIndex: 'college',
    search: false,
  },
  {
    title: '专业',
    dataIndex: 'profession',
    search: false,
  },
  {
    title: '爱好',
    dataIndex: 'hobby',
    search: false,
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    filters: true,
    onFilter: true,
    search: false,
    valueType: 'select',
    valueEnum: {
      0: {text: '正常', status: 'Success'},//颜色是红色
      1: {
        text: '非法',
        status: 'Error', //颜色是灰色
      },
    },
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    search: false,
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      0: {text: '普通用户', status: 'Default'},
      1: {
        text: '管理员',
        status: 'Success', //颜色是绿色
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'date',
    search: false,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="viewModel"
        onClick={() => {
          Modal.info({
            title: '用户信息',
            content: (
              <List>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={record.avatar} />}
                    title="姓名"
                    description={record.username}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title="学号"
                    description={record.userAccount}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title="性别"
                    description={record.gender === 0 ? '男' : '女'}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title="入学年级"
                    description={record.grade}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title="学院与专业"
                    description={
                      <Space>
                        <span>{record.college}</span>
                        <span>{record.profession}</span>
                      </Space>
                    }
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title="爱好"
                    description={record.hobby}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title="状态"
                    description={record.userStatus === 0 ? '正常' : '非法'}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title="角色"
                    description={record.userRole === 0 ? '普通用户' : '管理员'}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title="创建时间"
                    description={moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')}
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
        key="editable"
        onClick={() => {
          Modal.info({
            title: '用户信息',
            content: (
              <List>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={record.avatar} />}
                    title="姓名"
                    description={record.username}
                  />
                </List.Item>
              </List>
            ),
          });
        }}
      >
        封号
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => handleDelete(record,action)} // 在这里调用删除逻辑
        menus={[
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];


export default () => {
  const [showForm, setShowForm] = useState(false);
  const actionRef = useRef<ActionType>();

  const handleCreateUser = async (values: any) => {
    try {
      // 调用异步函数appendUser
      await appendUser(values);
      message.success('用户创建成功');
      // 在这里可以执行其他相关操作或刷新数据
    } catch (error) {
      message.error('用户创建失败');
      // 在这里可以处理错误情况
    }
    setShowForm(false);
  };


  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      <ProTable<API.CurrentUser>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          const userList = await searchUsers(params);
          return {
            data: userList
          }
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
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
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="用户表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined/>}
            onClick={() => {
              setShowForm(true);
            }}
            type="primary"
          >
            新建
          </Button>,
          <UserFormModal
            visible={showForm}
            onCancel={handleCancel}
            onCreate={handleCreateUser}
          />,
        ]}
      />
    </div>
  );
};
