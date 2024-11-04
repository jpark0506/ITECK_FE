import { useExperimentStore } from "../../store/experiment";
import CloseIcon from "../../assets/component/close";

type Props = {
  // isOpen: boolean;
  // onClose: () => void;
  // onSubmit: () => void;
  // fileIndex: number | null; // Index of the file whose factors are being edited
};
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../../components/nav/nav";

const initialFactors = [
  { name: "활물질 종류", isVariable: false },
  { name: "활물질 함량", isVariable: false },
  { name: "바인더 종류", isVariable: false },
  { name: "바인더 함량", isVariable: false },
  { name: "도전체 종류", isVariable: false },
  { name: "도전체 함량", isVariable: false },
  { name: "전해질 종류", isVariable: false },
  { name: "전해질 함량", isVariable: false },
  { name: "로딩량", isVariable: false },
  { name: "압연율", isVariable: false },
  { name: "면적", isVariable: false },
];

const FactorSelection = () => {

  const [factors, setFactors] = useState(initialFactors);

  const { id } = useParams();

  const navigate = useNavigate();

  // 변동 인자 선택 시 상태 업데이트 함수
  const handleToggleVariable = (index: number) => {
    // factor에서 최개 1개까지 선택 가능하도록 설정
    if (factors.filter((factor) => factor.isVariable).length >= 1 && !factors[index].isVariable) {
      alert("변동 인자는 최대 1개까지 선택 가능합니다.");
      return;
    }
    setFactors((prevFactors) =>
      prevFactors.map((factor, i) =>
        i === index ? { ...factor, isVariable: !factor.isVariable } : factor
      )
    );
  };

  return (
    <div className="w-full h-full flex flex-row">
      <Nav index={Number(id)} />
      <div className="flex flex-col w-full items-start p-10">
        <div className="w-full text-left font-bold text-4xl">
          고정인자/변동인자 선택하기
        </div>
        <div className="w-full text-left font-normal text-minor text-xl py-2">
          그래프 분석 시 원하는 고정인자와 변동인자를 선택해 주세요.
        </div>

        <div className="flex flex-row space-x-2 items-center justify-center mt-8">
          <h3 className="text-lg font-semibold">선택된 변동 인자:</h3>
          <div>
            {factors
              .filter((factor) => factor.isVariable)
              .map((variableFactor, i) => (
                <div key={i} className="text-green">
                  {variableFactor.name}
                </div>
              ))}
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-x-2 gap-y-1">
          {factors.map((factor, index) => (
            <button
              className={`w-full py-2 bg-white border-1 hover:border-green hover:text-green 
                rounded-md mt-5 transition-all ${factor.isVariable ? "text-green border-green" : "border-minor text-minor"}`}
              onClick={() => handleToggleVariable(index)}
            >
              <div className="text-lg">✓ {factor.name}</div>
            </button>

          ))}
        </div>

        <div className="flex flex-row w-full justify-between items-end mt-2">
          <div></div>
          <button
            onClick={() => navigate(`/view/${id}/analysis`)}
            className="bg-primary px-10 py-4 text-white text-sm rounded-lg font-light"
          >
            분석하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FactorSelection;

