import React, { useEffect } from "react";
import Ex from "../../assets/component/ex";
import ProcessIcon from "../../assets/component/processIcon";
import ProcessIconComplete from "../../assets/component/processIconComplete";

type Props = {
  index?: number;
};

const navList = [
  "실험 기본 정보 입력하기",
  "실험 파일 업로드하기",
  "고유 인자 입력하기",
];

const ExpList = (props: Props) => {
  const { index } = props;

  useEffect(() => {
    console.log(index);
  }, [index]);

  return (
    <div className="w-full flex flex-1 flex-col text-white justify-start items-start">
      {navList.map((title, titleIndex) => {
        return (
          <div
            key={titleIndex}
            className="flex flex-row py-2 items-center justify-start space-x-3 font-light"
          >
            {titleIndex <= index! ? <ProcessIconComplete /> : <ProcessIcon />}
            <div>{title}</div>
          </div>
        );
      })}
      <div></div>
    </div>
  );
};

export default ExpList;
