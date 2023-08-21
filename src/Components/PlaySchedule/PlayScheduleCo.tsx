import { PlaySchedule, ScheduleEnum } from "@/types/playSchedule";
import { Modal, Switch } from "@mui/material";
import { SettingIcon } from "../Icon/SettingIcon";
import { AddEditPlayScheduleModal } from "./AddEditModal";
import { useEffect, useState } from "react";
import { overlappingScheduleState } from "../../store/overlappingSchedule";
import { useRecoilState } from "recoil";
import {
  useFindOverlappingPlayScheduleMutation,
  useSetPlayScheduleActiveStatusMutation,
} from "@/query/playSchedule";
import tw from "tailwind-styled-components";
import { ModalUI } from "../globalStyle";

const days = ["일", "월", "화", "수", "목", "금", "토"];

export const PlayScheduleCo = ({ schedule }: { schedule: PlaySchedule }) => {
  const [editPlayScheduleModal, setEditPlayScheduleModal] = useState(false);

  const togglePlayScheduleStatusMutation =
    useSetPlayScheduleActiveStatusMutation(schedule.id);

  const [overlappingSchedule, setOverlappingSchedule] = useRecoilState(
    overlappingScheduleState
  );
  const findOverlappingPlayScheduleMutation =
    useFindOverlappingPlayScheduleMutation(schedule.id);
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

  const settingClickHandler = () => {
    setEditPlayScheduleModal(true);
  };

  return (
    <PlayScheduleCoUI bgColor={bgColor}>
      <BetweenUI>
        <NameUI>
          {schedule.name.length > 10 ? name.substring(0, 10) + ".." : name}
        </NameUI>
        <SettingIcon onClick={settingClickHandler} />
      </BetweenUI>
      <ContentUI>
        {schedule.scheduleType === ScheduleEnum.DAYS_OF_WEEK &&
          schedule.daysOfWeek.sort().map((day: number) => days[day] + " ")}
        {schedule.scheduleType === ScheduleEnum.EVENT &&
          `${schedule.startDate} ~ ${schedule.endDate}`}
      </ContentUI>
      <TimeContentUI>
        시작 : {schedule.startTime.hour}시 {schedule.startTime.minute}분{" "}
        {schedule.startTime.second}초
      </TimeContentUI>
      <TimeContentUI>
        종료 : {schedule.endTime.hour}시 {schedule.endTime.minute}분{" "}
        {schedule.endTime.second}초
      </TimeContentUI>
      <p>시작멜로디 {schedule.startMelody ? "있음" : "없음"}</p>
      <p>tts {schedule.tts ? "있음" : "없음"}</p>
      <ContentUI>
        플레이리스트 :{" "}
        {schedule.playlist ? <a>{schedule.playlist.name}</a> : "없음"}
      </ContentUI>
      <ContentUI>설정볼륨 : {schedule.volume}%</ContentUI>
      스케쥴 활성화 :{" "}
      <Switch
        onClick={async () => {
          const targetStatus = !schedule.active;
          if (targetStatus === true) {
            const findedOverlappingPlaySchedule =
              await findOverlappingPlayScheduleMutation.mutateAsync();
            if (findedOverlappingPlaySchedule)
              setOverlappingSchedule(findedOverlappingPlaySchedule);
          }
          await togglePlayScheduleStatusMutation.mutateAsync(targetStatus);
        }}
        checked={schedule.active}
      />
      <ModalUI open={editPlayScheduleModal}>
        <AddEditPlayScheduleModal
          playSchedule={schedule}
          type="put"
          closeModal={() => {
            setEditPlayScheduleModal(false);
          }}
        />
      </ModalUI>
    </PlayScheduleCoUI>
  );
};

const PlayScheduleCoUI = tw.div<{ bgColor: string }>`${({ bgColor }) =>
  bgColor} p-[30px] cursor-pointer w-[280px] rounded-lg`;

const ContentUI = tw.p`text-[15px] font-bold`;
const TimeContentUI = tw.p`text-[18px] font-bold`;
const NameUI = tw.p`text-[30px]`;
const BetweenUI = tw.div`flex justify-between gap-3`;
