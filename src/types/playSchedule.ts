import { Audio } from "./audio";
import { Playlist } from "./playlist";
import { Tts } from "./tts";

export enum ScheduleEnum {
  "EVENT" = 1,
  "DAYS_OF_WEEK" = 2,
}

export type Time = {
  hour: number;
  minute: number;
  second: number;
};

export type PlaySchedule = {
  id: number;
  name: string;
  scheduleType: ScheduleEnum;
  playlistId: number;
  startMelodyId: number;
  ttsId: number;
  dateList: DateEntity[];
  daysOfWeek: DaysOfWeek[];
  startTime: Time;
  endTime: Time;
  startTimeSize: number;
  endTimeSize: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  playlist: Playlist;
  startMelody: Audio;
  tts: Tts;
  volume: number;
};

export type PlayScheduleDto = {
  name: string;
  startMelodyId?: number | null;
  ttsId?: number | null;
  playlistId?: number | null;
  volume: number;
} & PlayScheduleTimeDto;

export type PlayScheduleTimeDto = {
  scheduleType: ScheduleEnum;
  startTime: Time;
  endTime: Time;
  dateList?: DateEntity[];
  daysOfWeek?: DaysOfWeek[];
};

export type DaysOfWeek = {
  playScheduleId: number;
  day: number;
};

export type DateEntity = {
  playScheduleId: number;
  date: string;
};
