import { useEffect, useState } from "react";
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
import { DaysOfWeekSelectCo } from "@/Components/PlaySchedule/DaysOfWeekSelectCo";
import { EventSelectCo } from "@/Components/PlaySchedule/EventSelectCo";
import { TimeSelectCo } from "@/Components/PlaySchedule/TimeSelectCo";
import { MelodyCo } from "@/Components/PlaySchedule/MelodyCo";
import { TTSCo } from "@/Components/PlaySchedule/TtsCo";
import { PlaylistSelectCo } from "@/Components/PlaySchedule/PlaylistSelectCo";
import { toast } from "react-toastify";
import tw from "tailwind-styled-components";

import {
  useAddPlayScheduleMutation,
  useDeletePlayScheduleMutation,
  useEditPlayScheduleMutation,
} from "@/query/playSchedule";
import { useRemoveAudioMutation } from "@/query/audio";
import { useRemoveTtsMutation } from "@/query/tts";

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
  const date = new Date();
  let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
  let dateOffset = new Date(date.getTime() - offset).toISOString();
  const today = dateOffset.substring(0, 10);
  const [daysOfWeek, setDaysOfWeek] = useState(playSchedule?.daysOfWeek || [1]);
  const [startDateStr, setStartDateStr] = useState(
    playSchedule?.startDate || today
  );
  const [endDateStr, setEndDateStr] = useState(playSchedule?.endDate || today);
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
  const removeAudioMutation = useRemoveAudioMutation();
  const removeTtsMutation = useRemoveTtsMutation();

  const submitHandler = async () => {
    const scheduleData: PlayScheduleDto = {
      name: scheduleName,
      scheduleType,
      daysOfWeek,
      startTime,
      endTime,
      startDate: startDateStr,
      endDate: endDateStr,
      startMelodyId: melody?.id ?? null,
      ttsId: tts?.id ?? null,
      playlistId: selectedPlaylist?.id ?? null,
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

  const deleteHandler = async () => {
    await deleteMutation.mutateAsync();
    closeModal();
  };

  const cancelHandler = async () => {
    if (tts) {
      await removeTtsMutation.mutateAsync(tts.id);
    }
    if (melody) {
      await removeAudioMutation.mutateAsync(melody.id);
    }
    closeModal();
  };

  const volumeChangeHandler = (e: any) => setVolume(e.target.value);

  return (
    <AddEditPlayScheduleModalUI>
      <PlayScheduleDataGroupUI>
        <ExplainText>스케쥴 명</ExplainText>
        <InputUI
          placeholder="기상시간"
          onChange={(e) => setScheduleName(e.target.value)}
          value={scheduleName}
        />
      </PlayScheduleDataGroupUI>
      <PlayScheduleDataGroupUI>
        <RowGapUI>
          <ExplainText>스케쥴 시간</ExplainText>
          <select
            value={scheduleType}
            onChange={(e: any) => setScheduleType(Number(e.target.value))}
          >
            <option value={ScheduleEnum.EVENT}>이벤트형</option>
            <option value={ScheduleEnum.DAYS_OF_WEEK}>요일형</option>
          </select>
        </RowGapUI>
        {scheduleType === ScheduleEnum.DAYS_OF_WEEK && (
          <DaysOfWeekSelectCo
            selectedDays={daysOfWeek}
            setSelectedDays={setDaysOfWeek}
          />
        )}
        {scheduleType === ScheduleEnum.EVENT && (
          <EventSelectCo
            startDateStr={startDateStr}
            endDateStr={endDateStr}
            setStartDateStr={setStartDateStr}
            setEndDateStr={setEndDateStr}
          />
        )}
        <TimeSelectWrapperUI>
          <p>시작 : </p>
          <TimeSelectCo time={startTime} setTime={setStartTime} />
        </TimeSelectWrapperUI>
        <TimeSelectWrapperUI>
          <p>종료 : </p>
          <TimeSelectCo time={endTime} setTime={setEndTime} />
        </TimeSelectWrapperUI>
      </PlayScheduleDataGroupUI>
      <PlayScheduleDataGroupUI>
        <ExplainText>재생정보</ExplainText>
        <MelodyCo melody={melody} setMelody={setMelody} />
        <TTSCo tts={tts} setTTS={setTts} />
        <PlaylistSelectCo
          selectedPlaylist={selectedPlaylist}
          setSelectedPlaylist={setSelectedPlaylist}
        />
        <RowGapUI>
          <p className="w-[110px]"> 볼륨 : {volume}%</p>
          <VolumeInputUI
            type="range"
            value={volume}
            max={100}
            min={20}
            onChange={volumeChangeHandler}
          />
        </RowGapUI>
      </PlayScheduleDataGroupUI>
      <PlayScheduleBtnWrapperUI>
        <ButtonUI onClick={submitHandler}>
          {type == "put" ? "닫기" : "추가"}
        </ButtonUI>
        {type == "post" && <ButtonUI onClick={cancelHandler}>취소</ButtonUI>}
        {type == "put" && <ButtonUI onClick={deleteHandler}>삭제</ButtonUI>}
      </PlayScheduleBtnWrapperUI>
    </AddEditPlayScheduleModalUI>
  );
};

const AddEditPlayScheduleModalUI = tw.div`p-[50px] flex flex-col gap-5 bg-white`;
const PlayScheduleDataGroupUI = tw.div`flex flex-col gap-2`;
const ExplainText = tw.p`text-[30px]`;
const PlayScheduleBtnWrapperUI = tw.div`flex flex-row gap-2`;
const TimeSelectWrapperUI = tw.div`flex flex-row gap-3`;
const ButtonUI = tw.button`bg-black text-white p-2 w-[150px]  text-[30px]`;
const RowGapUI = tw.div`flex flex-row gap-3 items-center`;
const VolumeInputUI = tw.input`h-2 w-full cursor-ew-resize appearance-none rounded-full bg-[#F5F5F5] accent-black`;
const InputUI = tw.input`bg-[#F3F3F3] w-[300px] h-[50px] py-1 px-2 rounded-lg`;

export default AddEditPlayScheduleModal;
