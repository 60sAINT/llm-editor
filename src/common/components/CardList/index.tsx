import React from "react";
import "./index.css"; // 确保你有一个 CSS 文件来定义动画
// import { Spin } from "antd";

interface CardListProps {
  dataSource: any[];
  loading?: boolean;
  classname?: string;
  maxHeight?: string;
  fullBtn?: React.ReactNode;
}

const CardList = ({
  dataSource,
  classname,
  maxHeight,
  fullBtn,
}: CardListProps) => {
  return (
    // <Spin spinning={loading}>
    <div
      className={`card-list ${classname}`}
      style={maxHeight ? { maxHeight: maxHeight } : {}}
    >
      {dataSource.map((item, index) => (
        <Card key={index} index={index}>
          {item}
          <div className="absolute bottom-5 right-5">{fullBtn}</div>
        </Card>
      ))}
    </div>
    // </Spin>
  );
};

interface CardProps {
  index: number;
  children?: React.ReactNode;
}
const Card: React.FC<CardProps> = ({ index, children }) => {
  return <div className={`card card-${index}`}>{children}</div>;
};

export default CardList;
