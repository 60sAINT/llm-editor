import React from "react";
import circle1 from "../../assets/circle1.png";
import circle2 from "../../assets/circle2.png";

const LoginBackground = () => {
  return (
    <div className="absolute left-0 right-0 w-full h-screen">
      <img
        src={circle1}
        alt=""
        className="absolute bottom-0 left-0 mix-blend-soft-light w-48"
      />
      <img
        src={circle2}
        alt=""
        className="absolute right-0 top-0 mix-blend-soft-light w-96"
      />
    </div>
  );
};

export default LoginBackground;
