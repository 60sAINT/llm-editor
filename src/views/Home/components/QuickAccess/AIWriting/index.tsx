import React, { useEffect, useState } from "react";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { OPERATE } from "@/views/Home/model";
import { Academic } from "./Academic";

export const AIWriting = () => {
  const [animationClass, setAnimationClass] = useState("");
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const type = params.get("type");
  const navigate = useNavigate();

  useEffect(() => {
    setAnimationClass("animate");
  }, []);

  return (
    <div className="flex justify-center">
      <div className="absolute right-[10%] h-20 flex items-center top-7">
        <CloseOutlined
          onClick={() => navigate("../recent")}
          className="text-zinc-400 text-xl"
        />
      </div>
      <div className={`box ${animationClass}`}>
        <div className="w-[575px] mt-7">
          {type === OPERATE.ACADEMIC ? <Academic /> : <></>}
        </div>
      </div>
    </div>
  );
};
