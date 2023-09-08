import { usePlayerVolumeMutation } from "@/query/player";
import { useLogoutMutation, useUserQuery } from "@/query/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

export const Header = () => {
  const userQuery = useUserQuery();
  const logoutMutation = useLogoutMutation();
  // const playerVolumeMutation = usePlayerVolumeMutation();

  const router = useRouter();

  const logoutHandler = async () => {
    //로그아웃
    await logoutMutation.mutateAsync();
    router.reload();
  };

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
      </ColUI>
    </HeaderUI>
  );
};

const HeaderUI = tw.div`bg-white flex justify-between w-full p-[30px] border-b-black  border-b-[1px]`;
const RowUI = tw.div`flex flex-row`;
const ColUI = tw.div`flex flex-col gap-1 items-end w-[150px]`;
const LogoUI = tw.div`text-black text-[40px] cursor-pointer font-bold`;
const SchoolNameUI = tw.p`font-bold`;
const UserNameUI = tw.p`font-medium text-[25px]`;
