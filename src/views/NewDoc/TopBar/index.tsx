import React, { useCallback, useEffect, useState } from "react";
import ExitButton from "./ExitButton";
import TopBarTitle from "./TopBarTitle";
import Status from "./Status";
import ActionButton from "./ActionButton";
import DropdownMenu from "./DropdownMenu";
import "./index.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Row } from "antd";
import { Start } from "./Start";
import { useNewDocState } from "../utils/provider";

interface TopBarProps {
  getShowCards: (showCards: boolean) => void;
  getFullText: (text: string) => void;
  getIfStartUnfold: (ifStartUnfold: boolean) => void;
}
const TopBar: React.FC<TopBarProps> = ({
  getShowCards: sendShowCardsToTopBar,
  getFullText,
  getIfStartUnfold: sendIfStartUnfold,
}) => {
  const [animate, setAnimate] = useState(false);
  const [animateReverse, setAnimateReverse] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const { cardText } = useNewDocState();

  // 点击“开始”后
  const handleStartClick = () => {
    setAnimateReverse(false);
    setAnimate(true);
    sendIfStartUnfold(true);
  };

  // 点击“效率”后，把最新的是否展示Cards传给父组件NewDoc
  const handleEfficiencyClick = useCallback(() => {
    setShowCards((prevShowCards) => !prevShowCards);
  }, []);
  useEffect(() => {
    sendShowCardsToTopBar(showCards);
  }, [showCards]);

  useEffect(() => {
    getFullText(cardText);
  }, [cardText]);

  return (
    <div
      className={`sticky top-0 z-10 ${
        !animate && "shadow-md border-b border-gray-300"
      }`}
    >
      <Row className="w-full flex items-center justify-between bg-white py-4 h-14 z-100 sticky top-0">
        <Col span={9}>
          <div className="flex items-center w0full justify-start">
            <ExitButton />
            <TopBarTitle />
            <Status />
          </div>
        </Col>
        <Col span={6} className="flex justify-center">
          <div className="flex items-center justify-between w-[300px]">
            <ActionButton label="开始" onClick={handleStartClick} />
            <ActionButton label="效率" onClick={handleEfficiencyClick} />
            <ActionButton
              label="审阅"
              onClick={() => {}}
              className="hover:cursor-not-allowed"
            />
          </div>
        </Col>
        <Col span={9}>
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
      <Start
        setAnimate={setAnimate}
        setAnimateReverse={setAnimateReverse}
        animateReverse={animateReverse}
        animate={animate}
      />
    </div>
  );
};

export default TopBar;
