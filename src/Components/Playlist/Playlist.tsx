import { Playlist } from "@/types/playlist";
import { SettingIcon } from "../Icon/SettingIcon";
import { useRouter } from "next/router";

export const PlaylistCo = ({ playlist }: { playlist: Playlist }) => {
  const router = useRouter();
  const hour = Math.floor(playlist.duration_s / 60 ** 2);
  const minute = Math.floor((playlist.duration_s % 60 ** 2) / 60);
  const second = Math.floor(playlist.duration_s % 60);
  return (
    <div className=" bg-[#F5F5F5] p-[30px] min-w-[280px] cursor-pointer rounded-lg">
      <p className="text-[30px]">{playlist.name}</p>
      <div className="flex justify-between items-end">
        <div>
          <p>총 {playlist.trackCount}곡</p>
          <p>
            총 {hour}시간 {minute}분 {second}초
          </p>
        </div>
        <SettingIcon
          onClick={() => {
            router.push(`/playlist/${playlist.id}`);
          }}
        />
      </div>
    </div>
  );
};
