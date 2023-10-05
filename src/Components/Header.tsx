import { useLogoutMutation, useUserQuery } from "@/query/user";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";

export const Header = () => {
  const userQuery = useUserQuery();
  const logoutMutation = useLogoutMutation();

  const router = useRouter();

  const logInOrOutHandler = async () => {
    //로그아웃
    if (userQuery?.data?.name) {
      await logoutMutation.mutateAsync();
    } else {
      router.replace("/login");
    }
  };

  return (
    <HeaderUI>
      <LogoRowUI>
        <LogoUI
          onClick={() => {
            location.replace("/");
          }}
        >
          BsmTracker
        </LogoUI>
        <SchoolNameUI>부산소마고</SchoolNameUI>
      </LogoRowUI>
      <ColUI>
        <UserNameUI>{userQuery?.data?.name ?? "no-user"}</UserNameUI>
        <LoginInOrOutBtn onClick={logInOrOutHandler}>
          {userQuery?.data?.name ? "로그아웃" : "로그인"}
        </LoginInOrOutBtn>
      </ColUI>
    </HeaderUI>
  );
};

const HeaderUI = tw.div` flex justify-between w-full p-[30px] border-b-black shadow-md fixed top-0 left-0 z-50 shadow-lg bg-white`;
const LogoRowUI = tw.div`flex flex-col md:flex-row`;
const ColUI = tw.div`flex flex-col gap-1 items-end w-[150px]`;
const LogoUI = tw.p`text-black text-[30px] cursor-pointer font-bold flex flex-row sm:text-[40px]`;
const SchoolNameUI = tw.p`font-bold`;
const UserNameUI = tw.p`font-medium text-[18px] lg:text-[25px] md:text-[20px] sm:text-[18px]`;
const LoginInOrOutBtn = tw.button`bg-black text-white px-2 rounded-lg text-[16px]`;
