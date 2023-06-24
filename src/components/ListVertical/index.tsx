import React, { useEffect, useState } from "react";
import styles from "./index.less";
import { List, Avatar, Tag, Button, Space, message } from "antd";
import {
  MessageOutlined,
  LikeOutlined,
  LikeFilled,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { listPostWithUser, postDoThumb } from "@/services/ant-design-pro/api";

const IconText = ({ icon, text }) => (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

// 日期转换函数
function convertTime(originalTime) {
  const date = new Date(originalTime);
  const localTime = date.toLocaleString();
  return localTime;
}

// 判断是否是最近的帖子
function isRecentPost(createTime) {
  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000; // 一天的毫秒数
  const currentTime = new Date().getTime(); // 当前时间的毫秒数
  const postTime = new Date(createTime).getTime(); // 帖子创建时间的毫秒数
  return currentTime - postTime < ONE_DAY_IN_MS;
}

// 判断是否是热门帖子
function isHotPost(thumbNum) {
  return thumbNum >= 3;
}

const YourComponent = () => {
  const [postList, setPostList] = useState<API.PostWithUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await listPostWithUser();
        console.log(result)
        // 更新帖子的点赞状态
        const updatedPostList = result.map((post) => {
          // 判断当前帖子是否已点赞
          post.hasThumb = post.thumbNum > 0;
          return post;
        });
        setPostList(updatedPostList);
      } catch (error) {
        message.error("获取帖子列表失败，请重试！");
      }
    };

    fetchData();
  }, []);

  /**
   * 点赞 / 取消点赞
   * @param post
   * @param index
   */
  const doThumb = async (post: API.PostWithUser) => {
    try {
      const changeThumbNum = await postDoThumb({ postId: post.id });
      if (changeThumbNum) {
        post.thumbNum += changeThumbNum;
        if (changeThumbNum === 1) {
          message.success("点赞成功！");
          post.hasThumb = true; // 设置为点赞状态
        } else if (changeThumbNum === -1) {
          message.success("取消点赞！");
          post.hasThumb = false; // 设置为取消点赞状态
        }
        setPostList([...postList]);
      }
    } catch (error) {
      message.error("操作失败，请重试！");
    }
  };

  return (
    // 组件的JSX结构
    <div className={styles.container}>
      <div id="components-list-demo-vertical">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={postList}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              style={{}}
              actions={[
                <IconText
                  icon={FieldTimeOutlined}
                  text={convertTime(item.createTime)}
                  key="list-vertical-star-o"
                />,
                <Button type="text" onClick={() => doThumb(item)}>
                  <Space>
                    {item.hasThumb ? <LikeFilled /> : <LikeOutlined />}
                    {item.thumbNum}
                  </Space>
                </Button>,
                <IconText
                  icon={MessageOutlined}
                  text="0"
                  key="list-vertical-message"
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.user.avatar}
                    style={{
                      marginTop: "10px",
                      width: 50,
                      height: 50,
                    }} // 自定义 avatar 样式
                  />
                }
                title={item.user.username}
                description={
                  <span>
                    <Tag color="geekblue">{item.user.grade}</Tag>
                    <Tag color="cyan">{item.user.college}</Tag>
                    <Tag color="cyan">{item.user.profession}</Tag>
                  </span>
                }
              />
              {item.content}
              <br />

              <div></div>
              {isRecentPost(item.createTime) && (
                <span>
                  <Tag color="magenta">最新</Tag>
                </span>
              )}
              {isHotPost(item.thumbNum) && (
                <span>
                  <Tag color="red">热门</Tag>
                </span>
              )}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default YourComponent;
