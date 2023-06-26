import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getPostDetail} from "@/services/ant-design-pro/api";

const PostDetail = () => {
  const id  = useParams(); // 通过 useParams() 获取路由参数中的帖子ID

  const [post, setPost] = useState(null); // 用于存储帖子详情数据的状态

  useEffect(() => {
    // 根据帖子ID获取帖子详情数据的异步请求
    const fetchPostDetail = async () => {
      try {
        // 发起异步请求，获取帖子详情数据
        const response = await getPostDetail(id);
        console.log(response)
        // 更新帖子详情数据状态
        setPost(response);
      } catch (error) {
        console.error('Failed to fetch post detail:', error);
      }
    };

    fetchPostDetail(); // 执行异步请求
  }, [id]); // 当帖子ID发生变化时重新执行 useEffect()

  if (!post) {
    return <div>Loading...</div>; // 当帖子详情数据尚未加载完成时显示加载中的提示
  }

  return (
    <div>
      <h1>Post Detail - {post.id}</h1>
      <p>内容: {post.content}</p>
      <p>点赞数: {post.thumbNum}</p>

      {/* 根据帖子详情数据渲染其他相关内容 */}
    </div>
  );
};

export default PostDetail;
