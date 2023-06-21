import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import styles from './BaseView.less';
import {currentUser, updateLoginUser, uploadAvatar} from "@/services/ant-design-pro/api";
import {ProFormTextArea} from "@ant-design/pro-components";

const genderOptions = [
  {
    label: '男',
    value: 0,
  },
  {
    label: '女',
    value: 1,
  },
];

// 头像组件
const AvatarView = ({ avatar, form }: { avatar: string; form: any }) => {
  const [, setAvatarFile] = useState<File | null>(null);
  const [uploadedAvatar, setUploadedAvatar] = useState<string>('');

  const handleAvatarChange = async (info: any) => {
    const { status, originFileObj } = info.file;
    if (status === 'done') {
      setAvatarFile(originFileObj);
      try {
        const url = await uploadAvatar(originFileObj);
        form.setFieldsValue({ avatar: url });
        setUploadedAvatar(url); // 保存上传成功后的头像 URL
        message.success('头像上传成功');
      } catch (error) {
        message.error('头像上传失败');
      }
    } else if (status === 'error') {
      message.error('头像上传失败');
    }
  };
  const avatarSrc = uploadedAvatar || avatar;

  return (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatarSrc} alt="avatar" />
      </div>
      <Upload showUploadList={false} onChange={handleAvatarChange}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );
};

const BaseView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loginUser, setLoginUser] = useState<API.CurrentUser | null>(null);
  const [gradeOptions, setGradeOptions] = useState([]);

  const fetchCurrentUser = async () => {
    try {
      const response = await currentUser();
      if (response) {
        // 获取到当前用户数据
        setLoginUser(response);
      } else {
        // 处理获取用户数据失败的情况
        console.error('Failed to fetch current user data:');
      }
    } catch (error) {
      console.error('Failed to fetch current user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    const currentYear = new Date().getFullYear();
    const options = [];
    for (let year = 2000; year <= currentYear; year++) {
      const label = `${year}级`;
      const value = `${year}级`;
      options.push({ label, value });
    }
    setGradeOptions(options);
  }, []);

  const getAvatar = () => {
    if (loginUser && loginUser.avatar) {
      return loginUser.avatar;
    }
    return 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
  };

  const handleFinish = async (fields: API.CurrentUser) => {
    const hide = message.loading('正在修改');
    try {
      await updateLoginUser(loginUser.id, {
        ...fields,
      });
      const updatedUser = await currentUser(); // 调用 currentUser 方法获取最新的用户数据
      if (updatedUser) {
        setLoginUser(updatedUser); // 更新 loginUser 的状态
        hide();
        message.success('修改成功');
        return true;
      } else {
        hide();
        message.error('修改失败请重试！');
        return false;
      }
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
      return false;
    }
  };

  const [form] = ProForm.useForm(); // 添加这一行，创建 form 对象

  return (
    <div className={styles.baseView}>
      {!loading && (
        <>
          <div className={styles.left}>
            <ProForm
              form={form} // 添加这一行，将 form 对象传递给 ProForm
              layout="vertical"
              onFinish={async (value) => {
                const success = await handleFinish({
                  ...value,
                });
              }}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                },
              }}
              initialValues={{
                ...loginUser,
                avatar: getAvatar(), // 设置 avatar 初始值
              }}
            >
              <ProForm.Item name="avatar" hidden>
                <input type="hidden" />
              </ProForm.Item>
              <ProFormText
                width="md"
                name="nickname"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="userAccount"
                label="学号"
                disabled={true}
              />
              <ProFormText
                width="md"
                name="username"
                label="姓名"
                disabled={true}
              />
              <ProFormSelect
                width="sm"
                name="gender"
                label="性别"
                rules={[
                  {
                    required: true,
                    message: '请选择您的性别!',
                  },
                ]}
                options={genderOptions}
                labelRender={(option: { label: any; }) => option.label}
              />
              <ProFormSelect
                width="sm"
                name="grade"
                label="入学年级"
                rules={[
                  {
                    required: true,
                    message: '请选择您的入学年级!',
                  },
                ]}
                options={gradeOptions}
              />
              <ProFormSelect
                width="sm"
                name="college"
                label="学院"
                rules={[
                  {
                    required: true,
                    message: '请选择您所在学院!',
                  },
                ]}
                options={[
                  {
                    label: '教育学院',
                    value: '教育学院',
                  },
                  {
                    label: '心理学院',
                    value: '心理学院',
                  },
                  {
                    label: '经济学院',
                    value: '经济学院',
                  },
                  {
                    label: '法学院',
                    value: '法学院',
                  },
                  {
                    label: '马克思主义学院',
                    value: '马克思主义学院',
                  },
                  {
                    label: '文学院',
                    value: '文学院',
                  },
                  {
                    label: '外国语学院',
                    value: '外国语学院',
                  },  {
                    label: '传播学院',
                    value: '传播学院',
                  },
                  {
                    label: '社会历史学院',
                    value: '社会历史学院',
                  },
                  {
                    label: '公共管理学院',
                    value: '公共管理学院',
                  },
                  {
                    label: '旅游学院',
                    value: '旅游学院',
                  },
                  {
                    label: '体育科学学院',
                    value: '体育科学学院',
                  },
                  {
                    label: '音乐学院',
                    value: '音乐学院',
                  },
                  {
                    label: '数学与统计学院',
                    value: '数学与统计学院',
                  },
                  {
                    label: '计算机与网络空间安全学院',
                    value: '计算机与网络空间安全学院',
                  },                  {
                    label: '阿里云大数据学院',
                    value: '阿里云大数据学院',
                  },
                  {
                    label: '光电与信息工程学院',
                    value: '光电与信息工程学院',
                  },
                  {
                    label: '化学与材料学院',
                    value: '化学与材料学院',
                  },
                  {
                    label: '地理科学学院',
                    value: '地理科学学院',
                  },
                  {
                    label: '生命科学学院',
                    value: '生命科学学院',
                  },
                  {
                    label: '海外教育学院',
                    value: '海外教育学院',
                  },

                ]}
                initialValue={loginUser?.college}
              />
              <ProFormText
                width="md"
                name="profession"
                label="专业"
                rules={[
                  {
                    required: true,
                    message: '请输入您的专业!',
                  },
                ]}
              />
              <ProFormTextArea
                name="hobby"
                label="兴趣"
                rules={[
                  {
                    required: false,
                    message: '请填写你的兴趣爱好!',
                  },
                ]}
              />
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatar()} form={form} /> {/* 将 form 对象传递给 AvatarView */}
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
