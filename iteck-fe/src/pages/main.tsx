import React from "react";
import LoginTitle from "../components/title/logintitle";
import Plus from "../assets/component/plus";
import { useNavigate } from "react-router-dom";

type Props = {};

const MainPage = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 h-full justify-center items-center">
      <div className="h-full w-3/4 flex flex-col justify-center items-start text-right space-y-3 pl-20">
        <div className="w-full text-8xl font-bold text-left">I-TECK</div>
        <div className="w-full text-2xl font-semibold text-left">
          실험을 위한 최고의 솔루션
        </div>
        <div className="w-full text-4xl font-semibold text-left">
          안녕하세요, 박준혁님!
        </div>
        <button
          onClick={() => navigate("/create/analysis")}
          className="flex flex-row items-center justify-between text-left w-1/3 bg-primary text-white font-semibold pl-4 rounded-lg border-1 border-primary hover:border-white hover:bg-secondary transition-all py-2 px-4 space-x-2"
        >
          <div>실험 분석 추가하기</div>
          <Plus />
        </button>
        <button
          onClick={() => navigate("/upload")}
          className="flex flex-row items-center justify-between text-left w-1/3 bg-green text-white font-semibold pl-4 rounded-lg border-1 border-green hover:border-white hover:bg-secondary transition-all py-2 px-4 space-x-2"
        >
          <div>데이터 추가하기</div>
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default MainPage;
