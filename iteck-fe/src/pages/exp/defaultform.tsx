import React from "react";

type Props = {
  increase: () => void;
};

const DefaultForm = (props: Props) => {
  const { increase } = props;
  return (
    <div className="flex-1 flex flex-col py-10 px-20">
      <div className="w-full text-left font-bold text-4xl">
        실험 기본 정보 입력하기
      </div>
      <div className="w-full text-left font-normal text-minor text-xl py-2">
        실험을 하며 필요한 기본 정보를 입력해주세요.
      </div>
      <div className="flex-1 flex flex-col  mt-3 border-minor">
        <div>
          <div className="text-primary font-semibold text-2xl">실험 제목</div>
          <input
            placeholder="실험 제목을 입력해주세요"
            className="w-full border-minor px-4 py-2 text-minor border-1 rounded-lg mt-4 "
          ></input>
        </div>
        <div>
          <div className="text-primary font-semibold text-2xl mt-4">
            실험 날짜
          </div>
          <input
            placeholder="실험 날짜를 입력해주세요"
            className="w-full border-minor px-4 py-2 text-minor border-1 rounded-lg mt-4 "
          ></input>
        </div>
        <div>
          <div className="text-primary font-semibold text-2xl mt-4">
            실험 메모하기
          </div>
          <textarea
            rows={5}
            placeholder="실험 메모를 입력해주세요"
            className="w-full border-minor px-4 py-2 text-minor border-1 rounded-lg mt-4"
          ></textarea>
        </div>
      </div>
      <div className="flex flex-row w-full justify-between items-end mt-2">
        <div></div>
        <button
          onClick={() => increase()}
          className="bg-primary px-10 py-4 text-white text-sm rounded-lg font-light"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default DefaultForm;
