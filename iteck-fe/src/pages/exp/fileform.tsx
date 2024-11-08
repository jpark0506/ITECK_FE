import React, { useEffect } from "react";
import { useExperimentStore } from "../../store/experiment";
import Nav from "../../components/nav/nav";
import FactorModal from "./factorModal";
import { use } from "framer-motion/client";
import { useUploadFile } from "../../api/api";

type Props = {};

const FileForm = (props: Props) => {
  const {
    experiments,
    addFiles,
    deleteFile,
    initExperiments,
    updateFactor,
  } = useExperimentStore();

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = React.useState<number | null>(null);

  useEffect(() => {
    initExperiments();
  }, [initExperiments]);

  useEffect(() => {
    console.log(experiments);
  }, [experiments]);

  const onOpen = (fileIndex: number) => {
    setSelectedFileIndex(fileIndex);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setSelectedFileIndex(null);
  };

  const { mutate: uploadFile } = useUploadFile();

  const handleUpload = (data: any) => {
    const fileCount = data.filter((item: any) => item.file).length;
    const factorCount = data.length;

    if (fileCount !== factorCount) {
      console.error("파일 개수와 factorDto 개수가 일치하지 않습니다.");
      return;
    }
    uploadFile(data, {
      onSuccess: () => {
        console.log("Upload successful!");
      },
      onError: (error) => {
        console.error("Error during upload:", error);
      },
    });
  };

  const onSubmit = () => {
    alert("고유 인자 입력이 완료되었습니다.");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      addFiles(Array.from(files));
    }
  };

  return (
    <div className="w-full h-full flex flex-row">
      <FactorModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        fileIndex={selectedFileIndex}
      />
      <Nav />
      <div className="flex-1 flex flex-col py-10 px-20">
        <div className="w-full text-left font-bold text-4xl">실험 파일 업로드하기</div>
        <div className="w-full text-left font-normal text-minor text-xl py-2">
          실험을 하며 추출한 파일을 업로드 해주세요.
        </div>
        <div className="flex-1 flex flex-col mt-3 border-minor">
          <div>
            <div className="text-primary font-semibold text-2xl">파일 업로드하기</div>
            <div className="mt-4 mb-4">
              <input
                type="file"
                multiple
                className="hidden"
                id="file-upload"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="w-100px border-minor px-4 py-2 text-minor border-1 rounded-lg cursor-pointer hover:bg-gray-600 transition-all"
              >
                파일 업로드하기
              </label>
            </div>
          </div>
          <div>
            <div className="text-primary font-semibold text-2xl mt-4">업로드한 파일</div>
            {experiments.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {experiments.map((experiment, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col justify-start items-start p-4 border bg-green rounded-lg text-center text-white"
                  >
                    <div className="text-white font-semibold text-xl">{experiment.name}</div>

                    <button
                      className="w-full py-2 bg-white text-green hover:bg-gray-300 rounded-md mt-5 transition-all"
                      onClick={() => onOpen(index)}
                    >
                      고유 인자 입력하기
                    </button>

                    <div className="text-left mt-4 text-sm text-white">
                      <div className="font-semibold">Factor Types:</div>
                      {experiment.factor.length > 0 ? (
                        experiment.factor.map((factor, factorIndex) => (
                          <div key={factorIndex}>
                            - {factor.name}: {factor.type || "N/A"}
                          </div>
                        ))
                      ) : (
                        <div>입력된 고유 인자가 없습니다.</div>
                      )}
                    </div>

                    <button
                      onClick={() => deleteFile(index)}
                      className="w-full py-2 bg-red-500 hover:bg-red-400 transition-all text-white rounded-md mt-5"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-minor mt-2">파일이 없습니다.</div>
            )}
          </div>
        </div>
        <div className="flex flex-row w-full justify-between items-end mt-2">
          <div></div>
          <button
            onClick={() => handleUpload(experiments)}
            className="bg-primary px-10 py-4 text-white text-sm rounded-lg font-light"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileForm;
