import React from "react";

type Props = {
  increase: () => void;
  decrease: () => void;
};

const FileForm = (props: Props) => {
  const { increase, decrease } = props;
  return (
    <div className="flex-1 flex flex-col py-10 px-20">
      <div className="w-full text-left font-bold text-4xl">
        실험 파일 업로드하기
      </div>
      <div className="w-full text-left font-normal text-minor text-xl py-2">
        실험을 하며 추출한 파일을 업로드 해주세요.
      </div>
      <div className="flex-1 border-1 mt-3 border-secondary"></div>
      <div className="flex flex-row w-full justify-between items-end mt-2">
        <button
          onClick={decrease}
          className="bg-primary px-10 py-4 text-white text-sm rounded-lg font-light"
        >
          이전
        </button>
        <button
          onClick={increase}
          className="bg-primary px-10 py-4 text-white text-sm rounded-lg font-light"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default FileForm;
