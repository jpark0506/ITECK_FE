import React from "react";
import { useExperimentStore } from "../../store/experiment";

type Props = {
  decrease: () => void;
};

const FactorForm = (props: Props) => {
  const { decrease } = props;

  // Zustand store에서 상태와 업데이트 함수 가져오기
  const {
    uniqueFactors,
    updateFactor,
    electrode,
    updateElectrode,
    getExperiment,
  } = useExperimentStore();

  const renderFactorInput = (index: number) => (
    <div key={index}>
      <div className="text-primary font-semibold text-2xl mt-4">
        {uniqueFactors[index].name}
      </div>
      <div className="flex flex-row w-full space-x-2 mt-2">
        <div className="w-full flex flex-col rounded-lg border-1 justify-center items-start ">
          <div className="w-full flex text-sm justify-start h-full text-minor py-2 px-4">
            종류
          </div>
          <input
            value={uniqueFactors[index].type}
            onChange={(e) => updateFactor(index, { type: e.target.value })}
            placeholder="종류를 입력해주세요"
            className="w-full px-4 py-2 text-primary rounded-lg"
          />
        </div>
        <div className="w-full flex flex-col rounded-lg border-1 justify-center items-start ">
          <div className="w-full flex text-sm justify-start h-full text-minor py-2 px-4">
            함량(%)
          </div>
          <input
            type="number"
            value={uniqueFactors[index].amount}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                updateFactor(index, { amount: e.target.value });
              }
            }}
            placeholder="함량을 입력해주세요"
            className="w-full px-4 py-2 text-primary rounded-lg"
          />
        </div>
      </div>
    </div>
  );

  // 완료 버튼 클릭 시 상태 출력 함수
  const handleComplete = () => {
    const finalData = getExperiment();
    const alertData = JSON.stringify(
      { ...finalData, electrode, uniqueFactors },
      null,
      2
    );
    alert(`최종 입력 데이터:\n${alertData}`);
  };

  return (
    <div className="flex-1 flex flex-col py-10 px-20">
      <div className="w-full text-left font-bold text-4xl">
        고유인자 입력하기
      </div>
      <div className="w-full text-left font-normal text-minor text-xl py-2">
        실험을 하며 사용한 고유인자를 입력해주세요.
      </div>
      <div className="flex-1 flex flex-col mt-3 border-minor overflow-y-auto">
        {uniqueFactors.map((_, index) => renderFactorInput(index))}
        <div>
          <div className="text-primary font-semibold text-2xl mt-4">전극</div>
          <div className="flex flex-row w-full space-x-2 mt-2">
            <div className="w-full flex flex-col rounded-lg border-1 justify-center items-start ">
              <div className="w-full flex text-sm justify-start h-full text-minor py-2 px-4">
                면적(cm^2)
              </div>
              <input
                type="number"
                value={electrode.area}
                onChange={(e) => {
                  if (!isNaN(Number(e.target.value))) {
                    updateElectrode({ area: e.target.value });
                  }
                }}
                placeholder="면적을 입력해주세요"
                className="w-full px-4 py-2 text-primary rounded-lg"
              />
            </div>
            <div className="w-full flex flex-col rounded-lg border-1 justify-center items-start ">
              <div className="w-full flex text-sm justify-start h-full text-minor py-2 px-4">
                로딩량(mg/cm^2)
              </div>
              <input
                type="number"
                value={electrode.loading}
                onChange={(e) => {
                  if (!isNaN(Number(e.target.value))) {
                    updateElectrode({ loading: e.target.value });
                  }
                }}
                placeholder="로딩량을 입력해주세요"
                className="w-full px-4 py-2 text-primary rounded-lg"
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col rounded-lg border-1 justify-center items-start mt-4">
            <div className="w-full flex text-sm justify-start h-full text-minor py-2 px-4">
              압연율(%)
            </div>
            <input
              type="number"
              value={electrode.rollingRate}
              onChange={(e) => {
                if (!isNaN(Number(e.target.value))) {
                  updateElectrode({ rollingRate: e.target.value });
                }
              }}
              placeholder="압연율을 입력해주세요"
              className="w-full px-4 py-2 text-primary rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-between items-end mt-2">
        <button
          onClick={decrease}
          className="bg-primary px-10 py-4 text-white text-sm rounded-lg font-light"
        >
          이전
        </button>
        <button
          onClick={handleComplete}
          className="bg-primary px-10 py-4 text-white text-sm rounded-lg font-light hover:bg-green"
        >
          완료하기
        </button>
      </div>
    </div>
  );
};

export default FactorForm;
