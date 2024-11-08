import { useMutation, UseMutationOptions, UseMutationResult, useQuery } from "@tanstack/react-query";
import { ExperimentInfo, Electrode } from '../types/experiment';
import { GetAxiosInstance, PostAxiosInstance } from "../axios/axios";
import { useLoginStore } from "../store/auth";

export const usePostExpInfo = () => {
    const { data, isError, isSuccess, isPending, mutate } = useMutation({
    mutationFn: async (data : ExperimentInfo) => {
      return await PostAxiosInstance<ExperimentInfo>("/exp/meta/post", data);
    },
  });
  return {
    data,
    isError,
    isSuccess,
    isPending,
    mutate,
  };
}

export const useGetExpList = (name:string) => {

  const { isError, isSuccess, isPending, data , isFetching } = useQuery<ExperimentInfo[]>({
    queryKey: ['experiment'],
    queryFn: async () => {
      const response = await GetAxiosInstance<ExperimentInfo[]>(`/exp/meta/get?userName=${name}`);
      return response.data.data;
    }
  })
  return {
    isError,
    isSuccess,
    isFetching,
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

type Factor = {
  name: string;
  value: string;
};

type PostExpDetectProps = {
  yFactor?: "current" | "voltage" | "dchgToChg" | "chgToDchg";
  kindFactors: Factor[];
  amountFactors: Factor[];
  variableFactor: Factor | null;
  method : "time" | "cycle" | "voltage" | "detect";
};

const fetchExpData = async ({ kindFactors, amountFactors, variableFactor, yFactor, method }: PostExpDetectProps) => {
  const params: any = {}; // 빈 객체를 만들어 조건에 따라 필요한 항목을 추가

  // '종류'나 '함량' 제거를 위한 이름 변환 함수
  const normalizeName = (name: string) => {
    return name.replace(/( 종류| 함량)$/, "");
  };

  if (kindFactors && kindFactors.length > 0) {
    params.factorKind = kindFactors
      .map((factor) => {
        const name = normalizeName(factor.name);
        return `${name}:${factor.value}`;
      })
      .join(",");
  }

  if (amountFactors && amountFactors.length > 0) {
    params.factorAmount = amountFactors
      .map((factor) => {
        const name = normalizeName(factor.name);
        return `${name}:${factor.value}`;
      })
      .join(",");
  }

  if (variableFactor) {
    if(variableFactor.name.includes("종류")) {
      params.variable = `factorKind:${normalizeName(variableFactor.name)}:desc`;
    }
    if(variableFactor.name.includes("함량")) {
      params.variable = `factorAmount:${normalizeName(variableFactor.name)}:desc`;
    }
  }
  if (yFactor) {
    if(method == "cycle" && yFactor == "current" || yFactor=="voltage")
    params.yFactor = "dchgToChg";
    else if(method == "time" && yFactor == "dchgToChg" || yFactor=="chgToDchg")
    params.yFactor = "current";
    else
    params.yFactor = yFactor;
  }

  switch(method){
    case "time":
       const timeresponse = await GetAxiosInstance("/exp/import/time", {
          params,
        });
        console.log(timeresponse);
        return timeresponse.data.data;
    case "cycle":
      const cycleresponse = await GetAxiosInstance("/exp/import/cycle", {
          params,
        });
        return cycleresponse.data.data;
    case "voltage":
      const voltageresponse = await GetAxiosInstance("/exp/import/voltage", {
          params,
        });
        return voltageresponse.data.data;
    case "detect":
      const detectresponse = await GetAxiosInstance("/exp/detect", {
          params,
        });
        return detectresponse.data.data;
  }
};

export const useGetExpResult = (props: PostExpDetectProps) => {
  const { data, isError, isFetching, refetch, isFetched, isSuccess, } = useQuery(
    {
      queryKey:["expResult", props],
      queryFn: () => fetchExpData(props),
      enabled: false,
      initialData:[],
    }
  );

  return {
    data,
    isError,
    isFetching,
    refetch,
    isFetched,
    isSuccess
  };
};

export const useUploadFile = (userName:string) => {
  const { isError, isSuccess, isPending, mutate } = useMutation({
    mutationFn: async (data) => {
      const formData = createFormData(data,userName);
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
const createFormData = (data: any, userName:any) => {
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
      userName:userName
    }

    // factorObject를 배열로 감싸 JSON 문자열로 변환 후 추가
    formData.append("factorDto", new Blob([JSON.stringify([factorObject])], {
      type: "application/json"
    }));
  });

  return formData;
};