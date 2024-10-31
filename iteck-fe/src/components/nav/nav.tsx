import React from "react";
import Plus from "../../assets/component/plus";

type Props = {};

const Nav = (props: Props) => {
  return (
    <div className="flex flex-col w-1/6 h-full bg-primary p-4 text-white">
      <div className="w-full text-left font-semibold text-4xl mb-2">I-TECK</div>
      <div className="w-full text-left font-normal text-sm pb-2">
        실험을 위한 최적의 솔루션
      </div>
      <button className="flex flex-row space-x-2 items-center w-full px-4 py-3 border-2 bg-primary text-white hover:text-primary font-normal rounded-lg hover:bg-white text-left border-white transition-color duration-500">
        <Plus />
        <div className="text-md ">실험 추가하기</div>
      </button>
    </div>
  );
};

export default Nav;
