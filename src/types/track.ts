import { Audio } from "./audio";
import { Playlist } from "./playlist";

export type Track = {
  id: number;
  playlistId: number;
  playlist: Playlist;
  code: string;
  order: number;
  name: string;
  image: string;
  duration_ms: number;
  audioId: number;
  audio: Audio;
};

export type PreviewTrack = {
  code: string;
  image: string;
  name: string;
  duration_ms: number;
  isLive: boolean;
};

export type SearchedTrack = PreviewTrack & { save: boolean };
