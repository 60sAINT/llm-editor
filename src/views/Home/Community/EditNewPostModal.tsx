import { Button, message, Upload } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useAuth } from "@/provider/authProvider";
import { useRequest } from "@/hooks/useRequest";
import { publicPostApi } from "@/views/NewDoc/TopBar/PublicModal/api";

export interface PublicModalProps {
  setModalPublicOpen: (isModalPublicOpen: boolean) => void;
  setNewPost: (content: string) => void;
}

export const EditNewPostModal: React.FC<PublicModalProps> = ({
  setModalPublicOpen,
  setNewPost,
}) => {
  const { token } = useAuth();
  const [cover, setCover] = useState<string | null>(null);
  const [isPublishDisabled, setIsPublishDisabled] = useState(true);
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: [""],
      },
    ],
  });

  const handlePublishClick = async () => {
    if (!cover) {
      message.warning("请先上传封面");
      return;
    }
    // 发布逻辑
    message.info("发布中...");
    await newPost();
    message.success("发布成功！");
    setModalPublicOpen(false);
    setNewPost(JSON.stringify(editor.document));
  };

  const handleChange = async (info: any) => {
    const file = info.file;
    if (file) {
      const base64 = await getBase64(file);
      setCover(base64);
      setIsPublishDisabled(false);
    }
  };

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传帖子封面</div>
    </div>
  );

  const { runAsync: newPost } = useRequest(async () => {
    const res = await publicPostApi.newPost({
      token: `Bearer ${token}` || "",
      content:
        JSON.stringify(editor.document) ||
        JSON.stringify({
          type: "paragraph",
          content: [""],
        }),
      title: "",
      cover: cover!,
    });
    return res.data.doc;
  });

  return (
    <>
      <div className="h-44 pt-3 mb-3 border-stone-300 rounded-lg border overflow-y-auto">
        <BlockNoteView editor={editor} className="[&_.bn-editor]:px-6" />
      </div>
      <Upload
        name="cover"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={() => false} // Prevent automatic upload
        onChange={handleChange}
      >
        {cover ? (
          <img src={cover} alt="cover" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <Button
        type="primary"
        onClick={handlePublishClick}
        disabled={isPublishDisabled}
        className="mt-3 float-right"
      >
        发布
      </Button>
    </>
  );
};
