import {
  SearchOutlined,
  ArrowLeftOutlined,
  PlusCircleOutlined,
  CheckCircleFilled,
  InfoCircleOutlined,
  PlusCircleFilled,
  DownOutlined,
  MailFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import {
  Input,
  Modal,
  List,
  Avatar,
  InputRef,
  Space,
  Tooltip,
  Divider,
  Skeleton,
  Radio,
  Button,
  Dropdown,
  MenuProps,
} from "antd";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRequest } from "@/hooks/useRequest";
import { shareApi } from "./api";
import { useAuth } from "@/provider/authProvider";
import {
  SearchResultItemType,
  SearchResultType,
  ShareModalProps,
} from "./model";
import { showMessage } from "@/common/utils/message";

export const ShareModal: React.FC<ShareModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  currentDoc,
}) => {
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultType>([]);
  const searchInputRef = useRef<InputRef>(null);

  const {
    runAsync: searchUsers,
    data: users,
    loading: searchUsersLoading,
  } = useRequest(async () => {
    const res = await shareApi.searchUser({
      token: `Bearer ${token}` || "",
      email: searchQuery,
      doc_id: currentDoc ? currentDoc.doc_id : "",
    });
    return [res];
  });
  const handleSearch = () => {
    searchUsers().then((data) => {
      if (data) setSearchResults(data as unknown as SearchResultType);
    });
  };
  useEffect(() => {
    setSearchResults(users as unknown as SearchResultType);
  }, [users]);

  useEffect(() => {
    if (isSearching && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearching]);

  const { runAsync: changePermission, loading: changePermissionLoading } =
    useRequest(async (permission, email) => {
      const res = await shareApi.share({
        token: `Bearer ${token}` || "",
        to_email: email,
        doc_id: currentDoc ? currentDoc.doc_id : "",
        permission,
      });
      return res;
    });
  const { runAsync: unShare, loading: unShareLoading } = useRequest(
    async (email) => {
      const res = await shareApi.unShare({
        token: `Bearer ${token}` || "",
        to_email: email,
        doc_id: currentDoc ? currentDoc.doc_id : "",
      });
      return res;
    }
  );

  const ShareDropdown = ({
    disabled,
    user,
  }: {
    disabled: boolean;
    user: SearchResultItemType;
  }) => {
    const [selectedOption, setSelectedOption] = useState<string>(
      user.permission
    );

    const handleMenuClick = async (e: any) => {
      const option = e.target.value;
      changePermission(option, user.email)
        .then(() => {
          setSelectedOption(option);
          getParticipants();
          searchUsers();
        })
        .then(() => showMessage("分享成功", 2));
    };

    const menuItems = useMemo(() => {
      const items: MenuProps["items"] = [
        {
          label: (
            <Radio.Group
              onChange={handleMenuClick}
              value={selectedOption}
              className="h-[42px] flex items-center"
            >
              <Radio value="read">只读</Radio>
              <Radio value="write">可编辑</Radio>
            </Radio.Group>
          ),
          key: "1",
        },
      ];

      if (selectedOption !== "") {
        items.push(
          {
            label: (
              <Button type="link" icon={<MailFilled />} className="px-0">
                重新发送
              </Button>
            ),
            key: "2",
            onClick: () => {
              changePermission(selectedOption, user.email)
                .then(() => {
                  searchUsers();
                  getParticipants();
                })
                .then(() => showMessage("分享成功", 2));
            },
          },
          {
            label: (
              <Button type="link" icon={<MinusCircleFilled />} className="px-0">
                移除分享
              </Button>
            ),
            key: "3",
            onClick: () => {
              unShare(user.email)
                .then(() => {
                  searchUsers();
                  getParticipants();
                  setSelectedOption("");
                })
                .then(() => showMessage("移除成功", 2));
            },
          }
        );
      }

      return items;
    }, [selectedOption, user.email, user.permission]);

    console.log(user.permission);
    return (
      <Dropdown
        menu={{ items: menuItems }}
        trigger={["click"]}
        disabled={disabled}
      >
        <Button type="primary" className="w-20 h-6 text-xs mr-4">
          {user.permission === ""
            ? "添加权限"
            : user.permission === "read"
            ? "只读"
            : "可编辑"}{" "}
          <DownOutlined />
        </Button>
      </Dropdown>
    );
  };

  const {
    runAsync: getParticipants,
    data: participants,
    loading: getParticipantsLoading,
  } = useRequest(async () => {
    const res = await shareApi.getDocParticipants({
      token: `Bearer ${token}` || "",
      doc_id: currentDoc ? currentDoc.doc_id : "",
    });
    return res.participant_list;
  });

  useEffect(() => {
    if (currentDoc) getParticipants();
  }, [currentDoc]);

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className="[&_.ant-modal-body]:h-[400px]"
      footer={null}
    >
      {isSearching ? (
        <div className="pt-1">
          <div
            onClick={() => {
              setIsSearching(false);
              setSearchQuery("");
            }}
            className="relative bottom-3 w-16 cursor-pointer rounded py-0.5 px-1.5 flex items-center justify-between text-stone-600 hover:bg-stone-200"
          >
            <ArrowLeftOutlined />
            <span>返回</span>
          </div>
          <Input
            ref={searchInputRef}
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="输入 用户邮箱 添加协作权限"
            className="w-full"
            onPressEnter={handleSearch}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="pt-5 [&_.ant-list-empty-text]:py-0 [&_.ant-list-empty-text]:h-24 [&_.ant-list-empty-text]:flex [&_.ant-list-empty-text]:items-center [&_.ant-list-empty-text]:justify-center [&_.ant-empty-normal]:my-0">
            <Input
              className="w-full mt-2.5 mb-5"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearching(true);
              }}
              placeholder="输入 用户邮箱 添加协作权限"
              prefix={<SearchOutlined />}
            />
            <div className="flex justify-between items-center">
              <div className="flex">
                <span className="zinc-500">协作者</span>
                <Tooltip
                  title={
                    <span className="text-xs">
                      协作者不能进行移动和删除操作
                    </span>
                  }
                >
                  <InfoCircleOutlined className="ml-3.5" />
                </Tooltip>
              </div>
              <div
                className="text-primary cursor-pointer"
                onClick={() => setIsSearching(true)}
              >
                <PlusCircleFilled className="mr-1.5" />
                添加协作者
              </div>
            </div>
            <Divider className="my-2.5" />
            <Skeleton
              active
              loading={
                getParticipantsLoading ||
                changePermissionLoading ||
                unShareLoading
              }
              paragraph={{ rows: 2 }}
            >
              <List
                itemLayout="horizontal"
                dataSource={
                  participants &&
                  participants.filter(
                    (item: SearchResultItemType) => item.permission !== "own"
                  )
                }
                renderItem={(item: SearchResultItemType) => (
                  <List.Item
                    actions={[<ShareDropdown disabled={false} user={item} />]}
                    className="!py-0 h-8 hover:bg-stone-50 [&_.ant-list-item-action]:ml-14 mb-5"
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={
                            item.nickname ? (
                              item.nickname[0]
                            ) : (
                              <SearchOutlined />
                            )
                          }
                          size={21}
                          className="mr-1"
                        />
                      }
                      title={item.nickname}
                      description={item.email}
                      className="!items-center [&_.ant-list-item-meta-content]:flex [&_.ant-list-item-meta-content]:justify-between [&_.ant-list-item-meta-content]:items-center [&_.ant-list-item-meta-title]:!mb-0 [&_.ant-list-item-meta-content]:!w-64"
                    />
                  </List.Item>
                )}
              />
            </Skeleton>
            <div className="flex justify-between items-center">
              <div className="flex">
                <span className="zinc-500">管理者</span>
                <Tooltip
                  title={
                    <span className="text-xs">
                      管理者可以进行移动和删除操作
                    </span>
                  }
                >
                  <InfoCircleOutlined className="ml-3.5" />
                </Tooltip>
              </div>
            </div>
            <Divider className="my-2.5" />
            <Skeleton active loading={getParticipantsLoading}>
              <List
                itemLayout="horizontal"
                dataSource={
                  participants &&
                  participants.filter(
                    (item: SearchResultItemType) => item.permission == "own"
                  )
                }
                renderItem={(item: SearchResultItemType) => (
                  <List.Item
                    actions={[<div className="ml-[18px] mr-9">管理员</div>]}
                    className="!py-0 h-8 hover:bg-stone-50 [&_.ant-list-item-action]:ml-14"
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={
                            item.nickname ? (
                              item.nickname[0]
                            ) : (
                              <SearchOutlined />
                            )
                          }
                          size={21}
                          className="mr-1"
                        />
                      }
                      title={item.nickname}
                      description={item.email}
                      className="!items-center [&_.ant-list-item-meta-content]:flex [&_.ant-list-item-meta-content]:justify-between [&_.ant-list-item-meta-content]:items-center [&_.ant-list-item-meta-title]:!mb-0 [&_.ant-list-item-meta-content]:!w-64"
                    />
                  </List.Item>
                )}
              />
            </Skeleton>
          </div>
          <Space>
            <div
              className="font-bold cursor-pointer flex items-center h-9 text-white px-2 py-2.5 rounded-[3px] bg-black"
              onClick={() => {
                setIsSearching(true);
              }}
            >
              <PlusCircleOutlined className="mr-2.5 text-lg" />
              <span className="leading-9">添加协作者</span>
            </div>
          </Space>
        </div>
      )}
      {isSearching && (
        <Skeleton
          active
          loading={
            searchUsersLoading || changePermissionLoading || unShareLoading
          }
          paragraph={{ rows: 2 }}
          title={false}
          className="mt-5"
        >
          {searchResults &&
            searchResults.length > 0 &&
            searchResults[0].user_id && (
              <List
                itemLayout="horizontal"
                dataSource={searchResults}
                className="mt-5"
                renderItem={(item) => (
                  <List.Item
                    actions={[<ShareDropdown disabled={false} user={item} />]}
                    className="!py-0 h-8 hover:bg-stone-50 [&_.ant-list-item-action]:ml-14"
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={
                            item.nickname ? (
                              item.nickname[0]
                            ) : (
                              <SearchOutlined />
                            )
                          }
                          size={21}
                          className="mr-1"
                        />
                      }
                      title={item.nickname}
                      description={item.email}
                      className="!items-center [&_.ant-list-item-meta-content]:flex [&_.ant-list-item-meta-content]:justify-between [&_.ant-list-item-meta-content]:items-center [&_.ant-list-item-meta-title]:!mb-0 [&_.ant-list-item-meta-content]:!w-64"
                    />
                  </List.Item>
                )}
              />
            )}
        </Skeleton>
      )}
      {isSearching && (
        <div className="text-primary absolute bottom-5">
          <CheckCircleFilled className="mr-2.5" />
          添加协作者时，向对方发通知
        </div>
      )}
    </Modal>
  );
};
