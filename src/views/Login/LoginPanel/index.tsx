import React from "react";
import LoginForm from "./LoginForm";
import signal from "../../../assets/signal.png";
import inCircle from "../../../assets/inCircle.png";

function LoginPanel() {
  return (
    <div className="w-full h-screen flex items-center">
      <div className="relative h-[560px] w-[960px] bg-white/90 m-auto rounded-[20px] shadow-2xl">
        <img
          src={signal}
          className="absolute mix-blend-soft-light z-10 left-1/3 top-[-10%] w-[120px]"
        />
        <div className="relative h-full w-1/2 float-left text-white bg-gradient-to-br from-primary to-indigo-500 rounded-l-3xl">
          <div className="px-20 h-full">
            <div className="relative top-1/2 -translate-y-1/2">
              <h3 className="m-0 p-0 text-lg">Welcom to</h3>
              <h1 className="p-0 font-extrabold mt-2.5 text-3xl">
                <span className="font-extralight">基于</span>xxxxxx
                <span className="font-extralight">的</span>
                <br />
                协心编辑器
              </h1>
              <p className="leading-loose font-extralight text-lg">
                这里写对编辑器的介绍
                <br />
                这里写对编辑器的介绍
                <br />
                这里写对编辑器的介绍
                <br />
                这里写对编辑器的介绍
                <br />
                这里写对编辑器的介绍
              </p>
            </div>
          </div>
          <img
            src={inCircle}
            className="absolute -right-20 w-44 h-auto bottom-5"
          />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPanel;
