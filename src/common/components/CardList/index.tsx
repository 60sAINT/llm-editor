import React from "react";
import "./index.css"; // 确保你有一个 CSS 文件来定义动画

const CardList: React.FC = () => {
  const cards = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="card-list">
      {cards.map((_, index) => (
        <Card key={index} index={index} />
      ))}
    </div>
  );
};

interface CardProps {
  index: number;
}
const Card: React.FC<CardProps> = ({ index }) => {
  return <div className={`card card-${index}`}>Card {index + 1}</div>;
};

export default CardList;
