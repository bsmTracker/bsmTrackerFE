export const PLAYLIST_CACHE_KEYS = {
  playlistListKey: ["playlist", "list"],
  searchKey: (playlistId: number) => ["playlist", "search", playlistId],
  playlistDetailKey: (playlistId: number) => ["playlist", "detail", playlistId],
};

export const PLAYSCHEDULE_CACH_KEYS = {
  playScheduleListKey: ["playSchedule", "list"],
};

export const USER_CACH_KEYS = {
  userKey: "user",
};
