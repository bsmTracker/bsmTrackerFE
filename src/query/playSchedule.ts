import axios from "../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PLAYSCHEDULE_CACH_KEYS } from "./queryKey";
import { PlaySchedule, PlayScheduleDto } from "@/types/playSchedule";

/** queries */
const usePlayScheduleListQuery = () => {
  return useQuery({
    queryKey: PLAYSCHEDULE_CACH_KEYS.playScheduleListKey,
    queryFn: async () =>
      axios
        .get("/api/play-schedule")
        .then((res) => res?.data as PlaySchedule[]),
  });
};

/** mutations */

const useAddPlayScheduleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PlayScheduleDto) => {
      await axios.post(`/api/play-schedule`, data);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(
        PLAYSCHEDULE_CACH_KEYS.playScheduleListKey
      );
    },
  });
};

const useEditPlayScheduleMutation = (playScheduleId?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PlayScheduleDto) => {
      await axios.put(`/api/play-schedule/${playScheduleId}`, data);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(
        PLAYSCHEDULE_CACH_KEYS.playScheduleListKey
      );
    },
  });
};

const useDeletePlayScheduleMutation = (playScheduleId?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/play-schedule/${playScheduleId}`);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries(
        PLAYSCHEDULE_CACH_KEYS.playScheduleListKey
      );
    },
  });
};

const useSetPlayScheduleActiveStatusMutation = (playScheduleId?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (active: boolean) =>
      await axios.post(
        `/api/play-schedule/${playScheduleId}/toggleActivation`,
        {
          active,
        }
      ),
    onSettled: async () => {
      await queryClient.invalidateQueries(
        PLAYSCHEDULE_CACH_KEYS.playScheduleListKey
      );
    },
  });
};

const useFindOverlappingPlayScheduleMutation = (playScheduleId: number) => {
  return useMutation({
    mutationFn: async () => {
      return axios
        .post(
          `/api/play-schedule/${playScheduleId}/findOverlappingPlaySchedule`
        )
        .then((res) => res?.data);
    },
  });
};

export {
  usePlayScheduleListQuery,
  useAddPlayScheduleMutation,
  useEditPlayScheduleMutation,
  useDeletePlayScheduleMutation,
  useSetPlayScheduleActiveStatusMutation,
  useFindOverlappingPlayScheduleMutation,
};
