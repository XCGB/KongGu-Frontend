import React from "react";
import styles from "./index.less";
import { Tag } from "antd";

export default () => (
  <div className={styles.container}>
    <div id="components-tag-demo-colorful">
      <div>
        <div>
          <Tag color="magenta">最新</Tag>
          <Tag color="red">热门</Tag>
          <Tag color="volcano">二手交易</Tag>
          <Tag color="orange">美食</Tag>
          <Tag color="gold">交友</Tag>
          <Tag color="lime">考研</Tag>
          <Tag color="green">游戏</Tag>
          <Tag color="cyan">美景</Tag>
          <Tag color="blue">租房</Tag>
          <Tag color="geekblue">拼单</Tag>
          <Tag color="purple">拼车</Tag>
        </div>
      </div>
    </div>
  </div>
);
