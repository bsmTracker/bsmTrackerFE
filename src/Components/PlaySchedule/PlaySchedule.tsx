import { PlaySchedule, ScheduleEnum } from "@/types/playSchedule";
import { Modal, Switch } from "@mui/material";
import axios from "../../axios";
import { useMutation, useQueryClient } from "react-query";
import { SettingIcon } from "../Icon/SettingIcon";
import { AddEditPlayScheduleModal } from "./AddEditModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { overlappingScheduleState } from "./store/overlappingSchedule";
import { useRecoilState } from "recoil";

const days = ["일", "월", "화", "수", "목", "금", "토"];

export const PlayScheduleCo = ({ schedule }: { schedule: PlaySchedule }) => {
  const [editPlayScheduleModal, setEditPlayScheduleModal] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => axios.post(`/api/play-schedule/${schedule.id}/toggleActivation`),
    {
      async onSettled(data, error: any, variables, context) {
        await queryClient.invalidateQueries({
          queryKey: ["playSchedule", "list"],
        });
      },
    }
  );

  const [overlappingSchedule, setOverlappingSchedule] = useRecoilState(
    overlappingScheduleState
  );
  const [bgColor, setBgColor] = useState("bg-[#F5F5F5]");

  const name = schedule.name;

  useEffect(() => {
    if (overlappingSchedule?.id === schedule.id) {
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          if (i % 2 === 1) {
            setBgColor("bg-[#F5F5F5]");
          } else {
            setBgColor("bg-white border-black border-[2px]");
          }
        }, 500 * i);
      }
      setOverlappingSchedule(null);
    }
  }, [overlappingSchedule]);

  return (
    <div
      className={`${bgColor} p-[30px] cursor-pointer min-w-[280px] rounded-lg`}
    >
      <div className="flex justify-between gap-3">
        <p className="text-[30px]">
          {schedule.name.length > 10 ? name.substring(0, 10) + ".." : name}
        </p>
        <SettingIcon
          onClick={() => {
            setEditPlayScheduleModal(true);
          }}
        />
      </div>
      <p className="text-[14px] font-bold">
        {schedule.scheduleType === ScheduleEnum.DAYS_OF_WEEK &&
          schedule.daysOfWeek.sort().map((day: number) => days[day] + " ")}
        {schedule.scheduleType === ScheduleEnum.EVENT &&
          `${schedule.startDate} ~ ${schedule.endDate}`}
      </p>
      <p className="text-[18px] font-bold">
        시작 : {schedule.startTime.hour}시 {schedule.startTime.minute}분{" "}
        {schedule.startTime.second}초
      </p>
      <p className="text-[18px] font-bold">
        종료 : {schedule.endTime.hour}시 {schedule.endTime.minute}분{" "}
        {schedule.endTime.second}초
      </p>
      <p>시작멜로디 {schedule.startMelody ? "있음" : "없음"}</p>
      <p>tts {schedule.tts ? "있음" : "없음"}</p>
      <p className="text-[15px]">
        플레이리스트 :{" "}
        {schedule.playlist ? <a>{schedule.playlist.name}</a> : "없음"}
      </p>
      <p className="text-[15px]">설정볼륨 : {schedule.volume}%</p>
      스케쥴 활성화 :{" "}
      <Switch
        onClick={async () => {
          try {
            await mutation.mutateAsync();
          } catch (e: any) {
            if (e?.response?.data?.id) {
              toast(
                `"${e.response.data?.name}"과 시간이 겹쳐 활성화 할 수 없습니다!`
              );
              setOverlappingSchedule(e.response.data);
            }
            if (e?.response?.data?.message) {
              toast(mutation?.error?.response?.data?.message);
            }
          }
        }}
        checked={schedule.active}
      />
      <Modal
        open={editPlayScheduleModal}
        onClose={() => {}}
        className="flex items-center justify-center"
      >
        <AddEditPlayScheduleModal
          playSchedule={schedule}
          type="put"
          closeModal={() => {
            setEditPlayScheduleModal(false);
          }}
        />
      </Modal>
    </div>
  );
};
