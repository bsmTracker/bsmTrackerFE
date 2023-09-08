import { PlaySchedule } from "@/types/playSchedule";
import { atom } from "recoil";

export const overlappingScheduleState = atom<PlaySchedule | null>({
  key: "overlapping_schedule_state",
  default: undefined,
});
