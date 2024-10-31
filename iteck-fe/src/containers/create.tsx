import React from "react";
import Nav from "../components/nav/nav";
import { useNavigate } from "react-router-dom";

type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();

  const toAnalysis = () => {
    navigate("/create/analysis");
  };

  const toSimulation = () => {
    navigate("/create/simulation");
  };

  return (
    <div className="w-full h-full flex flex-row">
      <Nav></Nav>
      <div className="flex-1 flex flex-row justify-center items-center p-20 py-40 space-x-20">
        <div className="flex flex-col flex-1 h-full rounded-2xl border-1 text-primary border-primary justify-start items-center p-10 group-hover:bg-primary group-hover:text-white transition-colors">
          <div className="w-full text-left font-bold text-3xl">
            그래프 분석 / 이상치 감지
          </div>
          <p className="w-full flex-1 text-left text-minor font-normal text-lg pt-4 ">
            아래와 같은 정리된 그래프를 볼 수 있어요!
            <ul className="list-disc w-full pl-5">
              <li>전류 / 전압</li>
              <li>사이클 / 용량</li>
              <li>전기용량(dQ/dV) / 전압</li>
              <li> 사용자 지정 그래프</li>
            </ul>
            <br />
          </p>
          <button
            onClick={toAnalysis}
            className="bg-primary font-bold px-10 py-4 text-white border-white border-1 text-sm rounded-lg mt-4 hover:bg-white hover:text-primary hover:border-primary transition-all "
          >
            시작하기
          </button>
        </div>
        <div className="flex flex-col flex-1 h-full rounded-2xl border-1 text-primary border-primary justify-start items-center p-10 group-hover:bg-primary group-hover:text-white transition-colors">
          <div className="w-full text-left font-bold text-3xl">시뮬레이션</div>
          <p className="w-full h-full flex-1 text-left text-minor font-normal text-lg pt-4 ">
            업로드한 데이터로, 배터리 충방전 시뮬레이션을 돌려볼 수 있어요!
          </p>
          <button
            onClick={toSimulation}
            className="bg-primary font-bold px-10 py-4 text-white border-white border-1 text-sm rounded-lg mt-4 hover:bg-white hover:text-primary hover:border-primary transition-all "
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
