import React from "react";

type Props = {};

const LogoutButton = (props: Props) => {
  return (
    <div>
      <button className="w-full text-left flex-col font-semibold pl-4 rounded-lg border-1 border-primary hover:border-white hover:text-primary hover:bg-white transition-all py-2 px-4 space-x-2">
        <div>로그아웃</div>
      </button>
    </div>
  );
};

export default LogoutButton;
