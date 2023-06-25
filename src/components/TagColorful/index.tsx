import React from 'react';
import { Tag } from 'antd';

const TagColorful = ({ color, name }) => {
  return <Tag color={color}>{name}</Tag>;
};

export default TagColorful;
