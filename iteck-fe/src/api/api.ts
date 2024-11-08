import { useMutation, useQuery } from "@tanstack/react-query";
import { ExperimentInfo, Electrode } from '../types/experiment';
import { GetAxiosInstance, PostAxiosInstance } from "../axios/axios";
export const usePostExpInfo = () => {
    const { isError, isSuccess, isPending, mutate } = useMutation({
    mutationFn: async (data : ExperimentInfo) => {
      return await PostAxiosInstance<ExperimentInfo>("/exp/meta/post", data);
    },
  });
  return {
    isError,
    isSuccess,
    isPending,
    mutate,
  };
}

export const useGetExpList = (name:string) => {

  const { isError, isSuccess, isPending, data } = useQuery<ExperimentInfo[]>({
    queryKey: ['experiment'],
    queryFn: async () => {
      const response = await GetAxiosInstance<ExperimentInfo[]>(`/exp/meta/get?userName=${name}`);
      return response.data.data;
    }
  })
  return {
    isError,
    isSuccess,
    isPending,
    data,
  };
}

export const useGetExpMeta = (metaId:string) => {
  const { isError, isSuccess, isFetching, isPending, data } = useQuery({
    queryKey: ['experiment', metaId],
    queryFn: async () => {
      const response = await GetAxiosInstance(`/exp/meta/get/${metaId}`);
      return response.data.data;
    },
    initialData: {
      title: "",
      expDate: "",
      memo: ""
    },
    select: (data) => {
      return {
        title: data.title,
        expDate: data.regDate,
        memo: data.memo
      }
    }
  })

  return {
    isError,
    isSuccess,
    isPending,
    data,
  }
}
export const useUploadFile = () => {
  const { isError, isSuccess, isPending, mutate } = useMutation({
    mutationFn: async (data) => {
      const formData = createFormData(data);
      return await PostAxiosInstance("/exp/upload", formData);
    },
  });
  return {
    isError,
    isSuccess,
    isPending,
    mutate,
  };
};
const createFormData = (data: any) => {
  const formData = new FormData();

  data.forEach((item: any) => {
    // 파일 추가 (파일이 존재하는 경우에만 추가)
    if (item.file) {
      formData.append("file", item.file); // 파일명도 포함
    }

    // factor 객체 생성: 원하는 형태로 변환
    const factors = item.factor.reduce((acc: any, factor: any) => {
          acc[factor.name] = { details: { [factor.type]: factor.amount } };
          return acc;
        }, {});

    // 전극 데이터를 factorObject의 일부로 추가
    factors["전극"] = {
      details:{
      "면적": item.electrode.area,
      "로딩량": item.electrode.loading,
      "압연율": item.electrode.rollingRate
      }
    };

    const factorObject = {
      factors,
      userName:"프론트"
    }

    // factorObject를 배열로 감싸 JSON 문자열로 변환 후 추가
    formData.append("factorDto", new Blob([JSON.stringify([factorObject])], {
      type: "application/json"
    }));
  });

  return formData;
};