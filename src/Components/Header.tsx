import { useSpeakerMutation } from "@/query/speaker";
import { useLogoutMutation, useUserQuery } from "@/query/user";
import { speakerSocket } from "@/socket/speaker";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

export const Header = () => {
  const userQuery = useUserQuery();
  const logoutMutation = useLogoutMutation();
  const speakerMutation = useSpeakerMutation();

  const router = useRouter();

  const logoutHandler = async () => {
    //로그아웃
    await logoutMutation.mutateAsync();
    router.reload();
  };

  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (speakerSocket.connected) {
      speakerSocket.emit("volume");
    }
  }, [speakerSocket.connected]);

  speakerSocket.on("volume", (volume) => {
    setVolume(volume);
  });

  return (
    <HeaderUI>
      <RowUI>
        <LogoUI
          onClick={() => {
            location.replace("/");
          }}
        >
          BsmTracker
        </LogoUI>
        <SchoolNameUI>부산소마고</SchoolNameUI>
      </RowUI>
      <ColUI>
        <UserNameUI onClick={logoutHandler}>
          {userQuery?.data?.name ?? "로그인하세요"}
        </UserNameUI>
        <VolumeInfoWrapper>
          <VolumeInfoP>📢</VolumeInfoP>
          <VolumeInputUI
            onChange={async (e) => {
              const volume = Number(e.target.value);
              await speakerMutation.mutateAsync(volume);
            }}
            value={volume}
            type="range"
            min={0}
            max={100}
          />
        </VolumeInfoWrapper>
      </ColUI>
    </HeaderUI>
  );
};

const HeaderUI = tw.div`bg-white flex justify-between w-full p-[30px] border-b-black  border-b-[1px]`;
const RowUI = tw.div`flex flex-row`;
const ColUI = tw.div`flex flex-col gap-1 items-end w-[150px]`;
const LogoUI = tw.div`text-black text-[40px] cursor-pointer font-bold`;
const SchoolNameUI = tw.p`font-bold`;
const VolumeInfoWrapper = tw.div`flex flex-row w-full gap-3 justify-center items-center`;
const VolumeInputUI = tw.input`h-[3px] w-full cursor-ew-resize appearance-none rounded-full bg-[#F5F5F5] accent-black`;
const VolumeInfoP = tw.span`text-[15px] font-bold`;
const UserNameUI = tw.p`font-medium text-[25px]`;
