import { useMemo, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  PlaySchedule,
  PlayScheduleDto,
  ScheduleEnum,
  Time,
} from "@/types/playSchedule";
import { Audio } from "@/types/audio";
import { Tts } from "@/types/tts";
import { Playlist } from "@/types/playlist";
import { DaysOfWeekSelect } from "@/Components/PlaySchedule/DaysOfWeekSelect";
import { EventSelect } from "@/Components/PlaySchedule/EventSelect";
import { TimeSelect } from "@/Components/PlaySchedule/TimeSelect";
import { MelodyCo } from "@/Components/PlaySchedule/MelodyCo";
import { TTSCo } from "@/Components/PlaySchedule/TtsCo";
import { PlaylistSelect } from "@/Components/PlaySchedule/PlaylistSelect";
import { toast } from "react-toastify";

import {
  useAddPlayScheduleMutation,
  useDeletePlayScheduleMutation,
  useEditPlayScheduleMutation,
} from "@/query/playSchedule";

export const AddEditPlayScheduleModal = ({
  closeModal,
  playSchedule,
  type,
}: {
  closeModal: any;
  playSchedule?: PlaySchedule;
  type: "post" | "put";
}) => {
  const [scheduleType, setScheduleType] = useState(
    playSchedule?.scheduleType || ScheduleEnum.EVENT
  );

  const [daysOfWeek, setDaysOfWeek] = useState(playSchedule?.daysOfWeek || [1]);
  const [startDateStr, setStartDateStr] = useState(
    playSchedule?.startDate || "2023-08-01"
  );
  const [endDateStr, setEndDateStr] = useState(
    playSchedule?.endDate || "2023-08-01"
  );
  const [startTime, setStartTime] = useState<Time>(
    playSchedule?.startTime || {
      hour: 6,
      minute: 0,
      second: 0,
    }
  );
  const [endTime, setEndTime] = useState<Time>(
    playSchedule?.endTime || {
      hour: 6,
      minute: 20,
      second: 0,
    }
  );

  const [scheduleName, setScheduleName] = useState(playSchedule?.name || "");
  const [melody, setMelody] = useState<Audio | null>(
    playSchedule?.startMelody || null
  );

  const [tts, setTts] = useState<Tts | null>(playSchedule?.tts || null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    playSchedule?.playlist || null
  );

  const [volume, setVolume] = useState(playSchedule?.volume || 25);

  const addPlayScheduleMutation = useAddPlayScheduleMutation();
  const editPlayScheduleMutation = useEditPlayScheduleMutation(
    playSchedule?.id
  );

  const deleteMutation = useDeletePlayScheduleMutation(playSchedule?.id);

  const submit = async () => {
    const scheduleData: PlayScheduleDto = {
      name: scheduleName,
      scheduleType,
      daysOfWeek,
      startTime,
      endTime,
      startDate: startDateStr,
      endDate: endDateStr,
      startMelodyId: melody?.id,
      ttsId: tts?.id,
      playlistId: selectedPlaylist?.id,
      volume,
    };
    if (!scheduleData.name) {
      toast("스케쥴 명을 입력하세요");
      return;
    }
    if (
      !scheduleData.ttsId &&
      !scheduleData.playlistId &&
      !scheduleData.startMelodyId
    ) {
      toast("tts, 플레이리스트, 멜로디 3개중 1개는 선택하셔야해요");
      return;
    }
    if (!scheduleData.startTime || !scheduleData.endTime) {
      toast("시작시간과 끝시간을 올바르게 입력하셔야해요");
      return;
    }
    if (scheduleData.scheduleType === ScheduleEnum.EVENT) {
      if (!scheduleData.startDate || !scheduleData.endDate) {
        toast("시작일자와 끝일자를 설정하셔야해요");
        return;
      }
    }
    if (scheduleData.scheduleType === ScheduleEnum.DAYS_OF_WEEK) {
      if (!scheduleData.daysOfWeek.length) {
        toast("요일을 하나 이상 선택하셔야해요");
        return;
      }
    }
    if (playSchedule && type == "put") {
      await editPlayScheduleMutation.mutateAsync(scheduleData);
    } else {
      await addPlayScheduleMutation.mutateAsync(scheduleData);
    }
    closeModal();
  };

  const scheduleSelect = useMemo(
    () => (
      <select
        value={scheduleType}
        onChange={(e: any) => setScheduleType(Number(e.target.value))}
      >
        <option value={ScheduleEnum.EVENT}>이벤트형</option>
        <option value={ScheduleEnum.DAYS_OF_WEEK}>요일형</option>
      </select>
    ),
    [scheduleType]
  );

  return (
    <div className="p-[50px] flex flex-col gap-5 bg-white">
      <div className="flex flex-col gap-2 bg-white">
        <p className="text-[30px]">스케쥴 명</p>
        <input
          className="bg-[#F3F3F3] w-[300px] h-[50px] py-1 px-2 rounded-lg"
          placeholder="기상시간"
          onChange={(e) => setScheduleName(e.target.value)}
          value={scheduleName}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-3 items-center ">
          <p className="text-[30px]">스케쥴 시간</p>
          {scheduleSelect}
        </div>
        {scheduleType === ScheduleEnum.DAYS_OF_WEEK && (
          <DaysOfWeekSelect
            selectedDays={daysOfWeek}
            setSelectedDays={setDaysOfWeek}
          />
        )}
        {scheduleType === ScheduleEnum.EVENT && (
          <EventSelect
            startDateStr={startDateStr}
            endDateStr={endDateStr}
            setStartDateStr={setStartDateStr}
            setEndDateStr={setEndDateStr}
          />
        )}
        <div className="flex flex-row gap-3">
          <p>시작 : </p>
          <TimeSelect time={startTime} setTime={setStartTime} />
        </div>
        <div className="flex flex-row gap-3">
          <p>종료 : </p>
          <TimeSelect time={endTime} setTime={setEndTime} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[30px]">재생정보</p>
        <MelodyCo melody={melody} setMelody={setMelody} />
        <TTSCo tts={tts} setTTS={setTts} />
        <PlaylistSelect
          selectedPlaylist={selectedPlaylist}
          setSelectedPlaylist={setSelectedPlaylist}
        />
        <div className="flex flex-row w-full items-center">
          <p className="w-[110px]"> 볼륨 : {volume}%</p>
          <input
            id="small-range"
            type="range"
            value={volume}
            max={100}
            min={20}
            onChange={(e: any) => setVolume(e.target.value)}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
          ></input>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button
          onClick={() => submit()}
          className="bg-black text-white p-2 w-[150px]  text-[30px]"
        >
          {type == "put" ? "수정" : "추가"}
        </button>
        {type == "put" && (
          <button
            onClick={async () => {
              await deleteMutation.mutateAsync();
              closeModal();
            }}
            className="bg-black text-white p-2 w-[150px]  text-[30px]"
          >
            삭제
          </button>
        )}
        <button
          onClick={() => closeModal()}
          className="bg-black text-white p-2 w-[150px] text-[30px]"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default AddEditPlayScheduleModal;
