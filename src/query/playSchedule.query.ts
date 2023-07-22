import axios from "axios";
import { useQuery } from "react-query";

export const PlaySchedulesQueryKey = ["playSchedule", "list"];
const playSchedulesUrl = "/api/play-schedule";

export const usePlaySchedulesQuery = () => {
  const playSchedulesQuery = useQuery({
    queryKey: PlaySchedulesQueryKey,
    queryFn: () => axios.get(playSchedulesUrl).then((res) => res.data),
  });
  return {
    playSchedulesQuery,
  };
};
