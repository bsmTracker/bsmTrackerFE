import { DaysOfWeek, PlaySchedule, ScheduleEnum } from "@/types/playSchedule";
import { Switch } from "@mui/material";
import { SettingIcon } from "../Icon/SettingIcon";
import { useEffect, useRef, useState } from "react";
import { overlappingScheduleState } from "../../store/overlappingSchedule";
import { useRecoilState } from "recoil";
import {
  useFindOverlappingPlayScheduleMutation,
  useSetPlayScheduleActiveStatusMutation,
} from "@/query/playSchedule";
import tw from "tailwind-styled-components";

const days = ["일", "월", "화", "수", "목", "금", "토"];

export const PlayScheduleCo = ({
  schedule,
  nowPlaying,
  onClick,
}: {
  schedule: PlaySchedule;
  nowPlaying: boolean;
  onClick: any;
}) => {
  const ref = useRef<any>();
  const togglePlayScheduleStatusMutation =
    useSetPlayScheduleActiveStatusMutation(schedule.id);

  const [overlappingSchedule, setOverlappingSchedule] = useRecoilState(
    overlappingScheduleState
  );
  const findOverlappingPlayScheduleMutation =
    useFindOverlappingPlayScheduleMutation(schedule.id);
  const [mark, setMark] = useState<boolean>(false);

  const name = schedule.name;

  useEffect(() => {
    if (nowPlaying) {
      ref.current.scrollIntoView();
    }
  }, [nowPlaying]);

  useEffect(() => {
    if (overlappingSchedule?.id === schedule.id) {
      ref.current.scrollIntoView();
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          if (i % 2 === 1) {
            setMark(false);
          } else {
            setMark(true);
          }
        }, 500 * i);
      }
      setOverlappingSchedule(null);
    }
  }, [overlappingSchedule]);

  return (
    <PlayScheduleCoUI mark={String(mark || nowPlaying)} ref={ref}>
      <p>{nowPlaying ? "(현재 재생중)" : ""}</p>
      <BetweenUI>
        <NameUI>
          {schedule.name.length > 10 ? name.substring(0, 10) + ".." : name}
        </NameUI>
        <SettingIcon onClick={onClick} />
      </BetweenUI>
      <ContentUI>
        {schedule.scheduleType === ScheduleEnum.DAYS_OF_WEEK &&
          schedule?.daysOfWeek.map((day: DaysOfWeek) => days[day.day] + " ")}
        {schedule.scheduleType === ScheduleEnum.EVENT &&
          `${schedule.dateList[0]?.date}외 ${schedule.dateList.length - 1}일`}
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
      스케줄 활성화 :{" "}
      <Switch
        onClick={async () => {
          const targetStatus = !schedule.active;
          if (targetStatus === true) {
            const findedOverlappingPlaySchedule: PlaySchedule =
              await findOverlappingPlayScheduleMutation.mutateAsync();
            if (findedOverlappingPlaySchedule)
              setOverlappingSchedule(findedOverlappingPlaySchedule);
          }
          await togglePlayScheduleStatusMutation.mutateAsync(targetStatus);
        }}
        checked={schedule.active}
      />
    </PlayScheduleCoUI>
  );
};
const PlayScheduleCoUI = tw.div`
  p-[30px] cursor-pointer rounded-lg min-w-[280px] shadow-lg
  ${({ mark }: { mark: string }) =>
    mark === "true" ? `bg-[#E6FEFC] border-black border-[1px]` : `bg-[#FBFAF9]`}
`;

const ContentUI = tw.p`text-[15px] font-bold`;
const TimeContentUI = tw.p`text-[18px] font-bold`;
const NameUI = tw.p`text-[30px]`;
const BetweenUI = tw.div`flex justify-between gap-3`;
