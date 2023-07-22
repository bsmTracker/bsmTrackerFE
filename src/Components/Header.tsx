// const

import { userState } from "@/store/user";
import { useRecoilValue } from "recoil";

export const Header = () => {
  const user = useRecoilValue(userState);

  return (
    <div className="bg-white flex justify-between w-full p-[30px] border-b-black  border-b-[1px]">
      <div className="flex flex-row">
        <h1
          onClick={() => {
            location.replace("/");
          }}
          className="text-black text-[40px] cursor-pointer font-bold"
        >
          BsmTracker
        </h1>
        <p className="font-bold">부산소마고</p>
      </div>
      <div
        onClick={() => {
          if (!user) {
            //로그아웃
          }
        }}
        className="text-black flex items-center"
      >
        <p className="font-medium text-[25px]">
          {user?.name ?? "로그인하세요"}
        </p>
      </div>
    </div>
  );
};
