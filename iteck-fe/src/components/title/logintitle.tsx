import React from "react";

type Props = {};

const LoginTitle = (props: Props) => {
  return (
    <div className="h-full w-1/2 flex flex-col justify-center items-center text-right">
      <div className="w-full text-8xl font-bold text-left pl-40">I-TECK</div>
      <div className="w-full text-4xl font-semibold text-left pl-40">
        실험을 위한 최고의 솔루션
      </div>
    </div>
  );
};

export default LoginTitle;
