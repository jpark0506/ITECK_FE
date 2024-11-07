import { useMutation, useQuery } from "@tanstack/react-query";
import { ExperimentInfo } from "../types/experiment";
import { GetAxiosInstance, PostAxiosInstance } from "../axios/axios";
import ExpView from '../containers/view';
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
  const { isError, isSuccess, isPending, data } = useQuery({
    queryKey: ['experiment'],
    queryFn: async () => {
      return await GetAxiosInstance(`/exp/meta/get/${metaId}`);
    }
  })

  return {
    isError,
    isSuccess,
    isPending,
    data,
  }
}

export const uploadFile = () => {
  const { isError, isSuccess, isPending, mutate } = useMutation({
    mutationFn: async (data : FormData) => {
      return await PostAxiosInstance<FormData>("/file", data);
    },
  });
  return {
    isError,
    isSuccess,
    isPending,
    mutate,
  };
}