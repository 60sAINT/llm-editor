import React, { useCallback, useEffect, useState } from "react";
import ExitButton from "./ExitButton";
import TopBarTitle from "./TopBarTitle";
import Status from "./Status";
import ActionButton from "./ActionButton";
import DropdownMenu from "./DropdownMenu";
import "./index.css";
import { Avatar, Col, Modal, Row } from "antd";
import { Start } from "./Start";
import { useNewDocState } from "../utils/provider";
import { Avatars } from "./Avatars";
import { UserOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { PublicModal } from "./PublicModal";

interface TopBarProps {
  getShowCards: (showCards: boolean) => void;
  getShowAIWriting: (showAIWriting: boolean) => void;
  getFullText: (text: string) => void;
  getIfStartUnfold: (ifStartUnfold: boolean) => void;
  is_note?: boolean;
  paper_id?: string;
  is_shared: boolean;
  docId?: string;
}
const TopBar: React.FC<TopBarProps> = ({
  getShowCards: sendShowCardsToTopBar,
  getShowAIWriting: sendShowAIWritingToTopBar,
  getFullText,
  getIfStartUnfold: sendIfStartUnfold,
  is_note,
  paper_id,
  is_shared,
  docId,
}) => {
  const [animate, setAnimate] = useState(false);
  const [animateReverse, setAnimateReverse] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showAIWriting, setShowAIWriting] = useState(false);
  const { cardText } = useNewDocState();
  const [modalPublicOpen, setModalPublicOpen] = useState(false);

  // 点击“开始”后
  const handleStartClick = () => {
    setAnimateReverse(false);
    setAnimate(true);
    sendIfStartUnfold(true);
  };

  // 点击“效率”后，把最新的是否展示Cards传给父组件NewDoc
  const handleEfficiencyClick = useCallback(() => {
    if (showAIWriting)
      setShowAIWriting((prevShowAIWriting) => !prevShowAIWriting);
    setShowCards((prevShowCards) => !prevShowCards);
  }, [showAIWriting]);
  useEffect(() => {
    sendShowCardsToTopBar(showCards);
  }, [showCards]);

  // 点击AI写作后
  const handleAIClick = useCallback(() => {
    if (showCards) setShowCards((prevShowCards) => !prevShowCards);
    setShowAIWriting((prevShowAIWriting) => !prevShowAIWriting);
  }, [showCards]);
  useEffect(() => {
    sendShowAIWritingToTopBar(showAIWriting);
  }, [showAIWriting]);

  useEffect(() => {
    getFullText(cardText);
  }, [cardText]);

  return (
    <div
      className={`sticky top-0 z-10 ${
        !animate && "shadow-md border-b border-gray-300"
      }`}
    >
      <Row className="w-full flex items-center justify-between bg-white h-14 z-100 sticky top-0">
        <Col span={is_note ? 12 : 9}>
          <div className="flex items-center w0full justify-start">
            <ExitButton />
            <TopBarTitle />
            <Status is_note={is_note} paper_id={paper_id} noteId={docId} />
          </div>
        </Col>
        <Col span={is_note ? 0 : 6} className="flex justify-center">
          <div className="flex items-center justify-between w-[300px]">
            <ActionButton label="开始" onClick={handleStartClick} />
            <ActionButton label="效率" onClick={handleEfficiencyClick} />
            <ActionButton label="AI写作" onClick={handleAIClick} />
          </div>
        </Col>
        <Col span={is_note ? 12 : 9}>
          <div className="flex items-center mr-1 justify-end">
            {is_shared ? (
              <Avatars is_shared={is_shared} />
            ) : (
              <Avatar
                icon={<UserOutlined />}
                size="small"
                className="h-6 w-6 mr-2"
              />
            )}
            {!is_shared && (
              <button
                className={classNames(
                  "px-2.5 w-14 h-6 hover:bg-neutral-200 rounded-sm text-topbar-text"
                )}
                onClick={() => setModalPublicOpen(true)}
              >
                发布
              </button>
            )}
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
      <Modal
        title={<div className="border-b border-gray-200 pb-3.5">发布帖子</div>}
        centered
        open={modalPublicOpen}
        onOk={() => setModalPublicOpen(false)}
        onCancel={() => setModalPublicOpen(false)}
        className="[&_.ant-modal-footer]:hidden [&_.ant-modal-content]:w-[696px] [&_.ant-modal-content]:h-[420px] [&_.ant-modal-body]:h-[270px]"
      >
        <PublicModal setModalPublicOpen={setModalPublicOpen} />
      </Modal>
    </div>
  );
};

export default TopBar;
