import React, { useState } from "react";
import { Select, Tag } from "antd";
import { useRequest } from "@/hooks/useRequest";
import { pdfApi } from "../../api";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/provider/authProvider";

const { Option } = Select;

export interface EditableTagsProps {
  initialTags: Array<string>;
}

const EditableTags: React.FC<EditableTagsProps> = ({ initialTags }) => {
  const [searchParams] = useSearchParams();
  const pdfId = searchParams.get("pdfId");
  const { token } = useAuth();
  const { runAsync: updateTags } = useRequest(async (newTags) => {
    const res = await pdfApi.updateTags(
      `Bearer ${token}` || "",
      pdfId!,
      newTags
    );
    return res;
  });

  const [tags, setTags] = useState(initialTags);
  const [editing, setEditing] = useState(false);

  const handleTagChange = (value: React.SetStateAction<string[]>) => {
    setTags(value);
    updateTags(value); // Update tags on change
  };

  const handleTagAdd = (value: string) => {
    if (value && !tags.includes(value)) {
      const newTags = [...tags, value];
      setTags(newTags);
      updateTags(newTags);
    }
  };

  const handleTagDelete = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    updateTags(newTags);
  };

  return (
    <div
      className="pl-2 text-neutral-900 [&_.ant-tag]:my-1"
      onClick={() => setEditing(true)}
      style={{ cursor: "pointer" }}
    >
      {!editing && tags?.length > 0 ? (
        tags.map((tag) => (
          <Tag
            key={tag}
            closable
            onClose={(e) => {
              e.preventDefault();
              handleTagDelete(tag);
            }}
          >
            {tag}
          </Tag>
        ))
      ) : (
        <Select
          mode="tags"
          style={{ width: "100%" }}
          placeholder="输入以添加标签"
          value={tags}
          onChange={handleTagChange}
          onBlur={() => setEditing(false)}
          onInputKeyDown={(e) => {
            if (e.key === "Enter") {
              const inputValue = (e.target as HTMLInputElement).value;
              if (inputValue) {
                handleTagAdd(inputValue);
                (e.target as HTMLInputElement).value = "";
              }
              e.preventDefault(); // Prevent form submission
              setEditing(false);
            }
          }}
          defaultOpen={false}
          dropdownRender={() => <></>}
          className="[&_.ant-select-arrow]:hidden"
          popupClassName="hidden"
        >
          {tags &&
            tags.map((tag) => (
              <Option key={tag} value={tag}>
                {tag}
              </Option>
            ))}
        </Select>
      )}
      {tags && tags.length === 0 && editing && (
        <div style={{ width: "100%", height: "0px" }}></div>
      )}
    </div>
  );
};

export default EditableTags;
