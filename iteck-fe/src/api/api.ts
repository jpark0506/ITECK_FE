import { useMutation, useQuery } from "@tanstack/react-query";
import { ExperimentInfo } from "../types/experiment";
import { GetAxiosInstance, PostAxiosInstance } from "../axios/axios";

export const usePostExpInfo = () => {
    const { isError, isSuccess, isPending, mutate } = useMutation({
    mutationFn: async (data : ExperimentInfo) => {
      return await PostAxiosInstance<ExperimentInfo>("/experiment", data);
    },
  });
  return {
    isError,
    isSuccess,
    isPending,
    mutate,
  };
}

export const getExpList = () => {
  const { isError, isSuccess, isPending, data } = useQuery({
    queryKey: ['experiment'],
    queryFn: async () => {
      return await GetAxiosInstance("/experiment/list");
    }
  })
  return {
    isError,
    isSuccess,
    isPending,
    data,
  };
}

export const getExp = () => {
  const { isError, isSuccess, isPending, data } = useQuery({
    queryKey: ['experiment'],
    queryFn: async () => {
      return await GetAxiosInstance("/experiment");
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