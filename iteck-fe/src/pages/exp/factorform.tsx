import React from "react";

type Props = {
  decrease: () => void;
};

const FactorForm = (props: Props) => {
  const { decrease } = props;
  return (
    <div className="flex-1 flex flex-col py-10 px-20">
      <div className="w-full text-left font-bold text-4xl">
        고유인자 입력하기
      </div>
      <div className="w-full text-left font-normal text-minor text-xl py-2">
        실험을 하며 사용한 고유인자를 입력해주세요.
      </div>
      <div className="flex-1 border-1 mt-3 border-secondary"></div>
      <div className="flex flex-row w-full justify-between items-end mt-2">
        <button
          onClick={decrease}
          className="bg-primary px-10 py-4 text-white text-sm rounded-lg font-light"
        >
          이전
        </button>
        <button className="bg-primary px-10 py-4 text-white text-sm rounded-lg font-light hover:bg-green">
          완료하기
        </button>
      </div>
    </div>
  );
};

export default FactorForm;
