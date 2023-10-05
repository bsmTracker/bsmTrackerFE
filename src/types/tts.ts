import { Audio } from "./audio";

export type Tts = {
  id: number;
  content: string;
  duration_ms: number;
  audio: Audio;
};
