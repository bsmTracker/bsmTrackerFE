import { useLogoutMutation, useUserQuery } from "@/query/user";
import { useRouter } from "next/router";
import { useMemo } from "react";
import tw from "tailwind-styled-components";

export const Header = () => {
  const userQuery = useUserQuery();
  const logoutMutation = useLogoutMutation();

  const user = useMemo(() => {
    return userQuery.data;
  }, [userQuery.data]);
  const router = useRouter();

  const logoutHandler = async () => {
    //로그아웃
    console.log("logout...");
    await logoutMutation.mutateAsync();
    router.push("/");
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
      <ColUI onClick={logoutHandler}>
        <UserNameUI>{user?.name ?? "로그인하세요"}</UserNameUI>
      </ColUI>
    </HeaderUI>
  );
};

const HeaderUI = tw.div`bg-white flex justify-between w-full p-[30px] border-b-black  border-b-[1px]`;
const RowUI = tw.div`flex flex-row`;
const ColUI = tw.div`flex flex-col`;
const LogoUI = tw.div`text-black text-[40px] cursor-pointer font-bold`;
const SchoolNameUI = tw.p`font-bold`;
const UserNameUI = tw.p`font-medium text-[25px]`;
