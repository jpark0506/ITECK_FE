import React from "react";
import { useExperimentStore } from "../../store/experiment";
import CloseIcon from "../../assets/component/close";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  fileIndex: number | null; // Index of the file whose factors are being edited
};

const FactorModal = ({ isOpen, onClose, onSubmit, fileIndex }: Props) => {
  const {
    experiments,
    updateFactor,
    updateElectrode,
  } = useExperimentStore();

  // Ensure fileIndex is valid and the experiment exists
  const experiment = fileIndex !== null ? experiments[fileIndex] : null;

  const renderFactorInput = (index: number) => (
    <div key={index}>
      <div className="text-primary font-semibold text-2xl mt-4">
        {experiment?.factor[index]?.name || `고유인자 ${index + 1}`}
      </div>
      <div className="flex flex-row w-full space-x-2 mt-2">
        <div className="w-full flex flex-col rounded-lg border-1 justify-center items-start">
          <div className="w-full flex text-sm justify-start h-full text-minor py-2 px-4">
            종류
          </div>
          <input
            value={experiment?.factor[index]?.type || ""}
            onChange={(e) => updateFactor(fileIndex!, index, { type: e.target.value })}
            placeholder="종류를 입력해주세요"
            className="w-full px-4 py-2 text-primary rounded-lg"
          />
        </div>
        <div className="w-full flex flex-col rounded-lg border-1 justify-center items-start">
          <div className="w-full flex text-sm justify-start h-full text-minor py-2 px-4">
            함량(%)
          </div>
          <input
            type="number"
            value={experiment?.factor[index]?.amount || ""}
            onChange={(e) => {
              const amount = parseFloat(e.target.value);
              if (!isNaN(amount)) {
                updateFactor(fileIndex!, index, { amount });
              }
            }}
            placeholder="함량을 입력해주세요"
            className="w-full px-4 py-2 text-primary rounded-lg"
          />
        </div>
      </div>
    </div>
  );

  const handleComplete = () => {
    onSubmit();
    onClose(); // Close the modal after saving
  };

  if (!isOpen || experiment === null) return null; // If modal is closed or experiment doesn't exist, render nothing

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed bg-black opacity-50 z-10 inset-0"
        onClick={onClose} // Close modal on overlay click
      ></div>

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="bg-white p-10 rounded-lg shadow-lg w-3/4 max-w-3xl h-3/4 overflow-auto">
          <div className="flex-1 flex flex-col py-10 px-10">
            <div className="flex flex-row justify-between w-full text-left font-bold text-4xl">
              <div>고유인자 입력하기</div>
              <button onClick={onClose}>
                <CloseIcon />
              </button>
            </div>
            <div className="w-full text-left font-normal text-minor text-xl py-2">
              실험을 하며 사용한 고유인자를 입력해주세요.
            </div>
            <div className="flex-1 flex flex-col mt-3 border-minor overflow-y-auto">
              {/* Render all unique factors for the selected file */}
              {experiment.factor.map((_, index) => renderFactorInput(index))}

              {/* Electrode Information Section */}
              <div className="text-primary font-semibold text-2xl mt-4">
                전극 정보
              </div>
              <div className="flex flex-row w-full space-x-2 mt-2">
                <div className="w-full flex flex-col rounded-lg border-1 justify-center items-start">
                  <div className="w-full flex text-sm justify-start h-full text-minor py-2 px-4">
                    면적(cm^2)
                  </div>
                  <input
                    type="number"
                    value={experiment.electrode.area || ""}
                    onChange={(e) => {
                      const area = e.target.value;
                      if (!isNaN(Number(area))) {
                        updateElectrode(fileIndex!, { area });
                      }
                    }}
                    placeholder="면적을 입력해주세요"
                    className="w-full px-4 py-2 text-primary rounded-lg"
                  />
                </div>
                <div className="w-full flex flex-col rounded-lg border-1 justify-center items-start">
                  <div className="w-full flex text-sm justify-start h-full text-minor py-2 px-4">
                    로딩량(mg/cm^2)
                  </div>
                  <input
                    type="number"
                    value={experiment.electrode.loading || ""}
                    onChange={(e) => {
                      const loading = e.target.value;
                      if (!isNaN(Number(loading))) {
                        updateElectrode(fileIndex!, { loading });
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
                  value={experiment.electrode.rollingRate || ""}
                  onChange={(e) => {
                    const rollingRate = e.target.value;
                    if (!isNaN(Number(rollingRate))) {
                      updateElectrode(fileIndex!, { rollingRate });
                    }
                  }}
                  placeholder="압연율을 입력해주세요"
                  className="w-full px-4 py-2 text-primary rounded-lg"
                />
              </div>
            </div>
            <div className="flex flex-row w-full justify-between items-end mt-2">
              <button
                onClick={onClose}
                className="bg-gray-200 px-10 py-4 text-gray-700 text-sm rounded-lg font-light"
              >
                닫기
              </button>
              <button
                onClick={handleComplete}
                className="bg-primary px-10 py-4 text-white text-sm rounded-lg font-light hover:bg-green"
              >
                완료하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FactorModal;
