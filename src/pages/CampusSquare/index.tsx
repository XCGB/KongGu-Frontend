import {PageContainer} from '@ant-design/pro-components';
import {Avatar,Card} from 'antd';
import React, {useEffect, useState} from 'react';
import ListVertical from '../../components/ListVertical';
import TagColorful from '../../components/TagColorful';
import {currentUser, listTags} from "@/services/ant-design-pro/api";
import CreateModal from "@/pages/CampusSquare/components/CreateModal";
import styles from "./index.less";

const result = await currentUser();
const loginUser = result.data;

const SquarePage: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await listTags();
      if (response) {
        setTags(response);
      }
    };
    fetchTags();
  }, []);

  return (
    <PageContainer>
      {/*内容发布卡片*/}
      <Card
        // bordered={false}
        style={{ width: '100%',color:"gray"}}
        key="1"
        onClick={() => setCreateModalVisible(true)}
      >
        <span>
          {loginUser != null &&
            <Avatar
              src={loginUser.avatar}
              style={{width: 50,height:50 }} // 自定义 avatar 样式
            />}
          点击发布内容...
        </span>
        <br/>
      </Card>
      <div className={styles.container}>
        <div id="components-tag-demo-colorful">
          <div>
            <div>
              {tags.map((tag, index) => (
                <TagColorful key={index} color={tag.tagColor}name={tag.tagName} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ListVertical />
      <CreateModal
        modalVisible={createModalVisible}
        onSubmit={() => setCreateModalVisible(false)}
        onCancel={() => setCreateModalVisible(false)}
        tagList={tags} // 将获取到的标签列表传递给 CreateModal 组件
      />
    </PageContainer>
  );
};

export default SquarePage;
