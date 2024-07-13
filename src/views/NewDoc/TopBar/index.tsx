import React, { useCallback, useEffect, useState } from "react";
import ExitButton from "./ExitButton";
import TopBarTitle from "./TopBarTitle";
import Status from "./Status";
import ActionButton from "./ActionButton";
import DropdownMenu from "./DropdownMenu";
import "./index.css";
import { UpOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Row } from "antd";

interface TopBarProps {
  getShowCards: (showCards: boolean) => void;
}
const TopBar: React.FC<TopBarProps> = ({
  getShowCards: sendShowCardsToTopBar,
}) => {
  const [animate, setAnimate] = useState(false);
  const [animateReverse, setAnimateReverse] = useState(false);
  const [showCards, setShowCards] = useState(false);

  // 点击“开始”后
  const handleStartClick = () => {
    setAnimateReverse(false);
    setAnimate(true);
  };
  // 再次点击“开始”后，即折叠开始
  const handleFold = () => {
    setAnimate(false);
    setAnimateReverse(true);
  };

  // 点击“效率”后，把最新的是否展示Cards传给父组件NewDoc
  const handleEfficiencyClick = useCallback(() => {
    setShowCards((prevShowCards) => !prevShowCards);
  }, []);
  useEffect(() => {
    sendShowCardsToTopBar(showCards);
  }, [showCards]);

  return (
    <div className={`${!animate && "shadow-md border-b border-gray-300"}`}>
      <Row className="w-full flex items-center justify-between bg-white py-4 h-14 z-10">
        <Col span={8}>
          <div className="flex items-center">
            <ExitButton />
            <TopBarTitle />
            <Status />
          </div>
        </Col>
        <Col span={8} className="flex justify-center">
          <div className="flex items-center justify-between w-[300px]">
            <ActionButton label="开始" onClick={handleStartClick} />
            <ActionButton label="效率" onClick={handleEfficiencyClick} />
            <ActionButton label="审阅" onClick={() => {}} />
          </div>
        </Col>
        <Col span={8}>
          <div className="flex items-center mr-1 justify-end">
            <Avatar
              icon={<UserOutlined />}
              size="small"
              className="h-5 w-5 mr-5"
            />
            <DropdownMenu />
          </div>
        </Col>
      </Row>
      <div
        className={`shadow-md border-b border-gray-300 h-9 w-full ${
          animateReverse ? "animateReverse" : ""
        }  ${animate ? "animate" : "hidden"}`}
      >
        <UpOutlined
          className="float-right inline-block leading-8 !font-black text-base mr-5"
          onClick={handleFold}
        />
      </div>
    </div>
  );
};

export default TopBar;
