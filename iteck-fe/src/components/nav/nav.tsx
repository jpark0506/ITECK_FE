import React from "react";

type Props = {};

const Nav = (props: Props) => {
  return (
    <div className="flex flex-col w-1/6 h-full bg-primary p-10">
      <div className="w-full text-left font-bold text-9xl">I-TECK</div>
      <div className="w-full text-left font-normal text-xl">
        실험을 위한 최적의 솔루션
      </div>
      <button className="w-full px-4 py-4 bg-secondary text-white font-normal rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        실험 추가하기
      </button>
    </div>
  );
};

export default Nav;
