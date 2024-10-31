import React from "react";
import { useExperimentStore } from "../../store/experiment";

type Props = {
  increase: () => void;
  decrease: () => void;
};

const FileForm = (props: Props) => {
  const { increase, decrease } = props;

  // Zustand store에서 상태와 업데이트 함수 가져오기
  const { uploadedFiles, addFiles, deleteFile } = useExperimentStore();

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      addFiles(Array.from(files)); // 선택된 파일을 상태에 추가
    }
  };

  return (
    <div className="flex-1 flex flex-col py-10 px-20">
      <div className="w-full text-left font-bold text-4xl">
        실험 파일 업로드하기
      </div>
      <div className="w-full text-left font-normal text-minor text-xl py-2">
        실험을 하며 추출한 파일을 업로드 해주세요.
      </div>
      <div className="flex-1 flex flex-col mt-3 border-minor">
        <div>
          <div className="text-primary font-semibold text-2xl">
            파일 업로드하기
          </div>
          <div className="mt-4">
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
          <div className="text-primary font-semibold text-2xl mt-4">
            업로드한 파일
          </div>
          {/* 업로드한 파일 리스트 3열 그리드 표시 및 삭제 기능 */}
          {uploadedFiles.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-row justify-between p-4 border border-green rounded-lg text-center text-green relative"
                >
                  {file.name}
                  <button
                    onClick={() => deleteFile(index)}
                    className="flex-1 text-red-500 hover:text-white hover:bg-red-500 transition-all px-1 rounded-md border-1 border-red-500"
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
