import React, {useEffect, useState} from "react";
import styles from "./index.less";
import {List, Avatar, Tag, Button, Space} from "antd";
import {
  MessageOutlined,
  LikeOutlined,
  BorderBottomOutlined, LikeFilled
} from "@ant-design/icons";
import {listPostWithUser, postDoThumb} from "@/services/ant-design-pro/api";
import message from "antd/es/message";

const result = await listPostWithUser();

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
  return thumbNum >= 10;
}

// 判断是否有图片
function hasImage(photo) {
  return photo != null;
}

const YourComponent = () => {
  const [postList, setPostList] = useState<API.PostWithUser[]>([]);
  useEffect(() => {
    // 将获取的帖子列表设置到状态中
    setPostList(result);
  }, []);



  /**
   * 点赞 / 取消点赞
   * @param post
   * @param index
   */
  const doThumb = async (post: API.PostWithUser) => {
    try {
      const res = await postDoThumb({ postId: post.id });
      if(res.code == 200){
        const changeThumbNum = res.data;
        post.thumbNum += changeThumbNum;
        if(changeThumbNum == 1){
          message.success("点赞成功！");
        }else if (changeThumbNum == -1){
          message.success("取消点赞！");
        }
        setPostList([...postList]);
      }else{
        message.error(res.message);
      }

    } catch (e: any) {
      message.error('操作失败，请重试！', e.message);
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
            onChange: page => {
              console.log(page);
            },
            pageSize: 10
          }}

          dataSource={postList}
          footer={
            <div>
              <b></b>
            </div>
          }
          renderItem={item => (
            <List.Item
              key={item.id}
              style={{}}
              actions={[
                <IconText
                  // icon={TagOutlined}
                  icon={BorderBottomOutlined}
                  text= {convertTime(item.createTime) }
                  key="list-vertical-star-o"
                />,
                <Button type="text" onClick={() => doThumb(item)}>
                  <Space>
                    {item.hasThumb ? <LikeFilled /> : <LikeOutlined />}
                    {/*{ <LikeOutlined />}*/}
                    {item.thumbNum}
                  </Space>
                </Button>,
                <IconText
                  icon={MessageOutlined}
                  text="0"
                  key="list-vertical-message"
                />
              ]}
              // extra={
              //   <img
              //     // width={180}
              //     height={180}
              //     style={{border: 0}}
              //     // alt=""
              //     src={item.photo}
              //   />
              // }
            >

              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.user.avatar}
                    style={{ marginTop: '10px',width: 50,height:50 }} // 自定义 avatar 样式
                  />
                }
                // title={<a href={item.href}>{item.id}</a>}
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
              <br/>

              {hasImage(item.photo) &&
                <img
                  // width={180}
                  height={180}
                  style={{border: 0}}
                  // alt=""
                  src={item.photo}
                />}

              <div></div>
              {isRecentPost(item.createTime) && <span><Tag color="magenta">最新</Tag></span>}
              {isHotPost(item.thumbNum) && <span><Tag color="red">热门</Tag></span>}

            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default YourComponent;
