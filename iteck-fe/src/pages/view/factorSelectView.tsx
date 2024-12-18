import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../../components/nav/nav";
import { useFactorStore } from "../../store/condition";

type Factor = {
  name: string;
  isVariable: boolean;
  isFixed: boolean;
  value: string;
};

const initialFactors: Factor[] = [
  { name: "활물질 종류", isVariable: false, isFixed: false, value: "" },
  { name: "활물질 함량", isVariable: false, isFixed: false, value: "" },
  { name: "바인더 종류", isVariable: false, isFixed: false, value: "" },
  { name: "바인더 함량", isVariable: false, isFixed: false, value: "" },
  { name: "도전재 종류", isVariable: false, isFixed: false, value: "" },
  { name: "도전재 함량", isVariable: false, isFixed: false, value: "" },
  { name: "전해질 종류", isVariable: false, isFixed: false, value: "" },
  { name: "전해질 함량", isVariable: false, isFixed: false, value: "" },
  { name: "로딩량", isVariable: false, isFixed: false, value: "" },
  { name: "압연율", isVariable: false, isFixed: false, value: "" },
  { name: "면적", isVariable: false, isFixed: false, value: "" },
];

const LoadingSpinner: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600 flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p>데이터를 불러오는 중입니다...</p>
    </div>
  );
};

const FactorSelection: React.FC = () => {
  const [factors, setFactors] = useState<Factor[]>(initialFactors);
  const { id: experimentId } = useParams();
  const navigate = useNavigate();

  const {
    experiments,
    setKindFactors,
    setAmountFactors,
    setVariableFactor,
    resetFactors,
  } = useFactorStore();

  const experimentFactors = experiments[experimentId!] || {
    kindFactors: [],
    amountFactors: [],
    variableFactor: null,
  };

  useEffect(() => {
    resetFactors(experimentId!);
  }, [experimentId, resetFactors]);

  const handleFactorChange = (
    index: number,
    field: "value" | "isVariable" | "isFixed",
    value?: string
  ) => {
    setFactors((prevFactors) =>
      prevFactors.map((factor, i) => {
        if (i === index) {
          if (field === "isVariable" && !factor.isVariable && prevFactors.some((f) => f.isVariable)) {
            alert("변동 인자는 최대 1개까지 선택 가능합니다.");
            return factor;
          }

          if (field === "isFixed" && !factor.value) {
            alert("고정 인자는 값을 입력해야 선택 가능합니다.");
            return factor;
          }

          const updatedFactor = {
            ...factor,
            [field]: field === "value" ? value : !factor[field],
            isVariable: field === "isVariable" ? !factor.isVariable : factor.isVariable,
            isFixed: field === "isFixed" ? !factor.isFixed : factor.isFixed,
          };

          if (field === "isVariable") {
            setVariableFactor(experimentId!, updatedFactor.isVariable ? updatedFactor : null);
          }

          if (field === "isFixed") {
            const updatedKindFactors = updatedFactor.isFixed && updatedFactor.name.includes("종류")
              ? [...experimentFactors.kindFactors, updatedFactor]
              : experimentFactors.kindFactors.filter((f) => f.name !== updatedFactor.name);

            const updatedAmountFactors = updatedFactor.isFixed && updatedFactor.name.includes("함량")
              ? [...experimentFactors.amountFactors, updatedFactor]
              : experimentFactors.amountFactors.filter((f) => f.name !== updatedFactor.name);

            setKindFactors(experimentId!, updatedKindFactors);
            setAmountFactors(experimentId!, updatedAmountFactors);
          }

          return updatedFactor;
        }
        return factor;
      })
    );
  };

  const handleSubmit = async () => {
    navigate(`/view/${experimentId}/analysis`);
  };

  return (
    <div className="w-full h-full flex flex-row">
      <Nav index={experimentId} />
      <div className="flex flex-1 flex-col w-full items-start p-10 ">
        <div className="w-full text-left font-bold text-4xl">고정인자/변동인자 선택하기</div>
        <div className="w-full text-left font-normal text-minor text-xl py-2">
          그래프 분석 시 원하는 고정인자와 변동인자를 선택해 주세요.
        </div>
        <div className="flex flex-row space-x-2 items-center justify-center mt-4">
          <h3 className="text-lg font-semibold">선택된 고정 인자 (종류):</h3>
          <div className="text-green">
            {experimentFactors.kindFactors.length > 0
              ? experimentFactors.kindFactors.map((f) => <div
                className="rounded-md border-1 border-green text-green py-2 px-4">{`${f.name} = ${f.value}`}</div>)
              : "선택되지 않음"}
          </div>
        </div>

        <div className="flex flex-row space-x-2 items-center justify-center mt-4">
          <h3 className="text-lg font-semibold">선택된 고정 인자 (함량):</h3>
          <div className="flex flex-row space-x-2 text-blue">
            {experimentFactors.amountFactors.length > 0
              ? experimentFactors.amountFactors.map((f) =>
                <div
                  className="rounded-md border-1 border-green text-green py-2 px-4">{`${f.name} = ${f.value}`}</div>
              )
              : "선택되지 않음"}
          </div>
        </div>

        <div className="flex flex-row space-x-2 items-center justify-center mt-8">
          <h3 className="text-lg font-semibold">선택된 변동 인자:</h3>
          <div className="text-red-400">
            {experimentFactors.variableFactor
              ? <div
                className="rounded-md border-1 border-red-400 text-red-400 py-2 px-4">{`${experimentFactors.variableFactor.name}`}</div>
              : "선택되지 않음"}
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-x-2 gap-y-1 mt-5 overflow-auto">
          {factors.map((factor, index) => (
            <div key={index} className="flex flex-col border-1 rounded-lg p-4">
              <div className="w-full flex flex-col justify-center items-start">
                <div className="w-full flex text-xl justify-start h-full text-minor py-2 px-2">
                  {factor.name}
                </div>
                <input
                  type="text"
                  value={factor.value}
                  onChange={(e) => handleFactorChange(index, "value", e.target.value)}
                  placeholder={`${factor.name}을(를) 입력해주세요`}
                  className="w-full px-4 py-4 text-primary rounded-lg border-b-1"
                />
              </div>
              <div className="flex flex-row items-start space-x-2">
                <button
                  className={`py-2 bg-white hover:text-red-400 rounded-md mt-2 transition-all ${factor.isVariable ? "text-red-400" : "text-minor"}`}
                  onClick={() => handleFactorChange(index, "isVariable")}
                >
                  <div className="text-lg inline">✓ 변동 인자</div>
                </button>

                <button
                  className={`py-2 bg-white hover:text-green rounded-md mt-2 transition-all ${factor.isFixed ? "text-green" : "text-minor"}`}
                  onClick={() => handleFactorChange(index, "isFixed")}
                >
                  <div className="text-lg inline">✓ 고정 인자</div>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row w-full justify-between items-end mt-4">
          <button onClick={handleSubmit} className="bg-primary px-10 py-4 text-white text-sm rounded-lg font-light">
            분석하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FactorSelection;
