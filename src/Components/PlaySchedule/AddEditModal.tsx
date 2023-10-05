import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  DateEntity,
  DaysOfWeek,
  PlaySchedule,
  PlayScheduleDto,
  ScheduleEnum,
  Time,
} from "@/types/playSchedule";
import { Audio } from "@/types/audio";
import { Tts } from "@/types/tts";
import { Playlist } from "@/types/playlist";
import { DaysOfWeekSelectCo } from "@/Components/PlaySchedule/DaysOfWeekSelectCo";
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
import { ModalUI } from "../globalStyle";
import { useRemoveTtsMutation } from "@/query/tts";
import { useRemoveAudioMutation } from "@/query/audio";
import { EventSelectCo } from "./EventSelectCo";

const AddEditPlayScheduleModal = ({
  closeModal,
  playSchedule,
  type,
  open,
}: {
  closeModal: any;
  open: boolean;
  playSchedule?: PlaySchedule;
  type: "post" | "put";
}) => {
  // const date = new Date();
  // let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
  // let dateOffset = new Date(date.getTime() - offset).toISOString();
  // const defaultDate = dateOffset.substring(0, 10);
  const defaultTime = {
    hour: 6,
    minute: 20,
    second: 0,
  };

  const [scheduleType, setScheduleType] = useState<ScheduleEnum>(
    ScheduleEnum.EVENT
  );
  const [daysOfWeek, setDaysOfWeek] = useState<DaysOfWeek[]>([]);
  const [dateList, setDateList] = useState<DateEntity[]>([]);
  const [startTime, setStartTime] = useState<Time>(defaultTime);
  const [endTime, setEndTime] = useState<Time>(defaultTime);
  const [scheduleName, setScheduleName] = useState<string>("");
  const [melody, setMelody] = useState<Audio | null>(null);
  const [tts, setTts] = useState<Tts | null>(null);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [volume, setVolume] = useState<number>(25);
  const addPlayScheduleMutation = useAddPlayScheduleMutation();
  const editPlayScheduleMutation = useEditPlayScheduleMutation(
    playSchedule?.id
  );
  const removeTtsMutation = useRemoveTtsMutation();
  const removeMelodyMutation = useRemoveAudioMutation();

  const [melodyHistory, setMelodyHistory] = useState<Audio | null>(null);
  const [ttsHistory, setTtsHistory] = useState<Tts | null>(null);
  const deleteMutation = useDeletePlayScheduleMutation(playSchedule?.id);

  useEffect(() => {
    if (type === "put") {
      if (playSchedule) {
        setScheduleType(playSchedule?.scheduleType);
        setDaysOfWeek([]);
        setDateList([]);
        if (playSchedule.scheduleType === ScheduleEnum.DAYS_OF_WEEK) {
          setDaysOfWeek(playSchedule.daysOfWeek);
        }
        if (playSchedule.scheduleType === ScheduleEnum.EVENT) {
          setDateList(playSchedule.dateList);
        }
        setScheduleName(playSchedule.name);
        setStartTime(playSchedule.startTime);
        setEndTime(playSchedule.endTime);
        setMelody(playSchedule.startMelody);
        setTts(playSchedule.tts);
        setPlaylist(playSchedule.playlist);
        setVolume(playSchedule.volume);
      }
    }
    if (type === "post") {
      setScheduleType(ScheduleEnum.EVENT);
      setDaysOfWeek([]);
      setDateList([]);
      setScheduleName("");
      setStartTime(defaultTime);
      setEndTime(defaultTime);
      setMelody(null);
      setTts(null);
      setPlaylist(null);
      setVolume(25);
    }
    setTtsHistory(null);
    setMelodyHistory(null);
  }, [open, type, playSchedule]);

  const preventClose = async (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
    if (!open) return;
    await cancelHandler();
  };

  const preventGoBack = async () => {
    if (!open) return;
    await cancelHandler();
  };

  useEffect(() => {
    window.addEventListener("popstate", preventGoBack);
    window.addEventListener("beforeunload", preventClose);
    return () => {
      window.removeEventListener("beforeunload", preventClose);
      window.removeEventListener("popstate", preventGoBack);
    };
  }, [ttsHistory, melodyHistory, open]);

  const submitHandler = async () => {
    const scheduleData: PlayScheduleDto = {
      name: scheduleName,
      scheduleType,
      daysOfWeek,
      dateList,
      startTime,
      endTime,
      startMelodyId: melody?.id ?? null,
      ttsId: tts?.id ?? null,
      playlistId: playlist?.id ?? null,
      volume: volume,
    };
    if (scheduleType === ScheduleEnum.DAYS_OF_WEEK) {
      scheduleData.dateList = [];
    }
    if (scheduleType === ScheduleEnum.EVENT) {
      scheduleData.daysOfWeek = [];
    }

    if (!scheduleData.name) {
      toast("스케줄 명을 입력하세요");
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
      if (!scheduleData.dateList?.length) {
        toast("이벤트일을 하나 이상 등록하셔야해요");
        return;
      }
    }
    if (scheduleData.scheduleType === ScheduleEnum.DAYS_OF_WEEK) {
      if (!scheduleData.daysOfWeek?.length) {
        toast("요일을 하나 이상 선택하셔야해요");
        return;
      }
    }
    try {
      if (playSchedule && type == "put") {
        await editPlayScheduleMutation.mutateAsync(scheduleData);
      } else {
        await addPlayScheduleMutation.mutateAsync(scheduleData);
      }
      closeModal();
    } catch (e) {}
  };

  const deleteHandler = async () => {
    if (ttsHistory) {
      await removeTtsMutation.mutateAsync(ttsHistory.id);
    }
    if (melodyHistory) {
      await removeMelodyMutation.mutateAsync(melodyHistory.id);
    }
    await deleteMutation.mutateAsync();
    closeModal();
  };

  const cancelHandler = async () => {
    if (ttsHistory) {
      await removeTtsMutation.mutateAsync(ttsHistory.id);
    }
    if (melodyHistory) {
      await removeMelodyMutation.mutateAsync(melodyHistory.id);
    }
    setTtsHistory(null);
    setMelodyHistory(null);
    closeModal();
  };

  const setTtsHandler = async (ttsData: Tts | null) => {
    setTts(ttsData);
    if (ttsHistory) {
      await removeTtsMutation.mutateAsync(ttsHistory.id);
    }
    if (ttsData !== null && ttsData.id !== playSchedule?.ttsId) {
      setTtsHistory(ttsData);
    }
    if (ttsData === null) {
      setTtsHistory(null);
    }
  };

  const setMelodyHandler = async (melodyData: Audio | null) => {
    setMelody(melodyData);
    if (melodyHistory) {
      await removeMelodyMutation.mutateAsync(melodyHistory.id);
    }
    if (melodyData !== null && melodyData.id !== playSchedule?.startMelodyId) {
      setMelodyHistory(melodyData);
    }
    if (melodyData === null) {
      setMelodyHistory(null);
    }
  };

  const volumeChangeHandler = (e: any) => setVolume(Number(e.target.value));

  return (
    <ModalUI open={open} onClose={cancelHandler}>
      <AddEditPlayScheduleModalUI>
        <PlayScheduleDataGroupUI>
          <ExplainText>스케줄 명</ExplainText>
          <InputUI
            placeholder="기상시간"
            onChange={(e) => setScheduleName(e.target.value)}
            value={scheduleName}
          />
        </PlayScheduleDataGroupUI>
        <PlayScheduleDataGroupUI>
          <RowGapUI>
            <ExplainText>스케줄 시간</ExplainText>
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
            <EventSelectCo dateList={dateList} setDateList={setDateList} />
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
          <MelodyCo melody={melody} setMelody={setMelodyHandler} />
          <TTSCo tts={tts} setTTS={setTtsHandler} />
          <PlaylistSelectCo
            selectedPlaylist={playlist}
            setSelectedPlaylist={setPlaylist}
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
            {type == "put" ? "저장" : "추가"}
          </ButtonUI>
          <ButtonUI onClick={cancelHandler}>취소</ButtonUI>
          {type == "put" && <ButtonUI onClick={deleteHandler}>삭제</ButtonUI>}
        </PlayScheduleBtnWrapperUI>
      </AddEditPlayScheduleModalUI>
    </ModalUI>
  );
};

const AddEditPlayScheduleModalUI = tw.div`p-[30px] flex flex-col w-[450px] max-h-[100%] overflow-y-scroll gap-5 bg-white`;
const PlayScheduleDataGroupUI = tw.div`flex flex-col gap-2`;
const ExplainText = tw.p`text-[30px]`;
const PlayScheduleBtnWrapperUI = tw.div`flex flex-row gap-2`;
const TimeSelectWrapperUI = tw.div`flex flex-row gap-3`;
const ButtonUI = tw.button`bg-black text-white p-2 w-[150px]  text-[30px]`;
const RowGapUI = tw.div`flex flex-row gap-3 items-center`;
const VolumeInputUI = tw.input`h-2 w-full cursor-ew-resize appearance-none rounded-full bg-[#F5F5F5] accent-black`;
const InputUI = tw.input`bg-[#F3F3F3] w-[300px] h-[50px] py-1 px-2 rounded-lg`;

export default AddEditPlayScheduleModal;
