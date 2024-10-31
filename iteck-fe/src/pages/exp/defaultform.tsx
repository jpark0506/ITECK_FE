import React, { useState, useEffect } from "react";
import { useExperimentStore } from "../../store/experiment";

type Props = {
  increase: () => void;
};

const DefaultForm = (props: Props) => {
  const { increase } = props;

  // Zustand store에서 상태와 업데이트 함수 가져오기
  const { experiment, updateExperiment } = useExperimentStore();

  // 로컬 상태를 사용해 입력 필드 값을 관리
  const [experimentTitle, setExperimentTitle] = useState(
    experiment.title || ""
  );
  const [experimentDate, setExperimentDate] = useState(
    experiment.executed_at
      ? new Date(experiment.executed_at).toISOString().slice(0, 10)
      : ""
  );
  const [experimentMemo, setExperimentMemo] = useState(experiment.memo || "");

  // 상태가 변경될 때마다 zustand 스토어에 업데이트
  useEffect(() => {
    updateExperiment({
      title: experimentTitle,
      executed_at: new Date(experimentDate),
      memo: experimentMemo,
    });
  }, [experimentTitle, experimentDate, experimentMemo, updateExperiment]);

  return (
    <div className="flex-1 flex flex-col py-10 px-20">
      <div className="w-full text-left font-bold text-4xl">
        실험 기본 정보 입력하기
      </div>
      <div className="w-full text-left font-normal text-minor text-xl py-2">
        실험을 하며 필요한 기본 정보를 입력해주세요.
      </div>
      <div className="flex-1 flex flex-col mt-3 border-minor">
        <div>
          <div className="text-primary font-semibold text-2xl">실험 제목</div>
          <input
            value={experimentTitle}
            onChange={(e) => setExperimentTitle(e.target.value)}
            placeholder="실험 제목을 입력해주세요"
            className="w-full border-minor px-4 py-2 text-primary border-1 rounded-lg mt-4"
          />
        </div>
        <div>
          <div className="text-primary font-semibold text-2xl mt-4">
            실험 날짜
          </div>
          <input
            type="date"
            value={experimentDate}
            onChange={(e) => setExperimentDate(e.target.value)}
            className="w-full border-minor px-4 py-2 text-primary border-1 rounded-lg mt-4"
          />
        </div>
        <div>
          <div className="text-primary font-semibold text-2xl mt-4">
            실험 메모하기
          </div>
          <textarea
            value={experimentMemo}
            onChange={(e) => setExperimentMemo(e.target.value)}
            rows={5}
            placeholder="실험 메모를 입력해주세요"
            className="w-full border-minor px-4 py-2 text-primary border-1 rounded-lg mt-4"
          />
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
