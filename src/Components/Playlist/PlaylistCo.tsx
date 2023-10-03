import { Playlist } from "@/types/playlist";
import { SettingIcon } from "../Icon/SettingIcon";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";

export const PlaylistCo = ({ playlist }: { playlist: Playlist }) => {
  const router = useRouter();
  const hour = Math.floor(playlist.duration_s / 60 ** 2);
  const minute = Math.floor((playlist.duration_s % 60 ** 2) / 60);
  const second = Math.floor(playlist.duration_s % 60);

  const settingBtnHandler = () => {
    router.push(`/playlist/${playlist.id}`);
  };

  return (
    <PlaylistUI className="">
      <PlaylistNameUI>{playlist.name}</PlaylistNameUI>
      <PlaylistDetailUI>
        <ColUI>
          <DetailTextUI>총 {playlist.trackCount}곡</DetailTextUI>
          <DetailTextUI>
            총 {hour}시간 {minute}분 {second}초
          </DetailTextUI>
        </ColUI>
        <SettingIcon onClick={settingBtnHandler} />
      </PlaylistDetailUI>
    </PlaylistUI>
  );
};

const PlaylistUI = tw.div`
p-[30px] min-w-[280px] cursor-pointer rounded-lg bg-[#FBFAF9] shadow-lg
`;

const PlaylistNameUI = tw.p`text-[30px]`;
const PlaylistDetailUI = tw.div`flex justify-between items-end"`;
const ColUI = tw.div``;
const DetailTextUI = tw.p``;
