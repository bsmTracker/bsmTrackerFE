import { userState } from "@/store/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "../axios";
import { useRecoilState } from "recoil";

export const Auth = (HocComponent: any) => {
  return function auth() {
    const [user, setUser] = useRecoilState(userState);
    const router = useRouter();
    const func = async () => {
      try {
        const response = await axios.post("/api/oauth/getUser");
        setUser(response?.data);
      } catch (e) {
        router.replace("/login");
      }
    };

    useEffect(() => {
      func();
    }, []);

    return <HocComponent />;
  };
};
