import type {ActionType, ProColumns} from "@ant-design/pro-components";
import React, {useRef, useState} from "react";
import {addTag, appendUser, changeTagColor, deleteTag, listTags} from "@/services/ant-design-pro/api";
import {ProTable, } from "@ant-design/pro-components";
import {Button, List, message, Modal, Space, Tag,} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {AddTagFormModal} from "@/Modal/AddTagFormModal";

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
  const [showForm, setShowForm] = useState(false);
  const actionRef = useRef<ActionType>();
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [currentTagId, setCurrentTagId] = useState('');
  const [previewColor, setPreviewColor] = useState('');
  const [currentTagName, setCurrentTagName] = useState('');

  const setShowColorPicker = (tagId, initialColor, tagName) => {
    setSelectedColor(initialColor);
    setPreviewColor(initialColor);
    setCurrentTagId(tagId);
    setCurrentTagName(tagName);
    setColorPickerVisible(true);
  };


  const handleColorChange = (event) => {
    const tagColor = event.target.value;
    setSelectedColor(tagColor);
    setPreviewColor(tagColor);
  };

  const handleColorUpdate = async () => {
    try {
      await changeTagColor(currentTagId, selectedColor);
      message.success('标签颜色修改成功');
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } catch (error) {
      message.error('标签颜色修改失败');
    }
    setColorPickerVisible(false);
  };



  const handleCreateTag = async (values: any) => {
    try {
      // 调用异步函数appendUser
      await addTag(values);
      message.success('标签创建成功');
      // 在这里可以执行其他相关操作或刷新数据
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } catch (error) {
      message.error('标签创建失败');
      // 在这里可以处理错误情况
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

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
      title: '标签',
      dataIndex: 'tagName',
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
            <Tag color={record.tagColor} key={record.tagName}>
              {record.tagName}
            </Tag>
        </Space>
      ),
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
            // 打开对话框来修改颜色
            setShowColorPicker(record.id, record.tagColor, record.tagName);
          }}
        >
          修改颜色
        </a>,
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
                      description={
                        <Tag color={record.tagColor}>{record.tagName}</Tag>
                      }
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
        dateFormatter="string"
        toolbar={{
          title: '帖子列表',
          tooltip: '',
        }}
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
          <AddTagFormModal
            visible={showForm}
            onCancel={handleCancel}
            onCreate={handleCreateTag}
          />,
        ]}
      />
      <Modal
        visible={colorPickerVisible}
        title="选择颜色"
        onCancel={() => setColorPickerVisible(false)}
        onOk={handleColorUpdate} // 更新颜色时触发handleColorUpdate函数
      >
        <input
          type="color"
          value={selectedColor}
          onChange={handleColorChange}
        />
        <div style={{ marginTop: '10px' }}>
          <Tag color={previewColor}>{currentTagName}</Tag>
        </div>
      </Modal>
    </div>
  );
};

export default AdminTagPage;
