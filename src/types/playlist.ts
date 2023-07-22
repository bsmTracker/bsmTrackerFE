import { Track } from "./track";

export type Playlist = {
  id: number;
  name: string;
  trackCount: number;
  duration_s: number;
  createdAt: string;
  updatedAt: string;
  tracks?: Track[];
};

export type PlaylistDetail = {};
