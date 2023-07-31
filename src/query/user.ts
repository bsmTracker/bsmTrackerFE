import { useMutation, useQuery, useQueryClient } from "react-query";
import { USER_CACH_KEYS } from "./queryKey";
import axios from "../axios";
import { User, UserLoginDto } from "../types/user";

const useUserQuery = () => {
  return useQuery({
    queryKey: USER_CACH_KEYS.userKey,
    queryFn: async () => {
      return axios.post("/api/oauth/getUser").then((res) => res?.data as User);
    },
  });
};

const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      await axios.post("/api/oauth/logout");
    },
  });
};

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (loginDto: UserLoginDto) => {
      await axios.post("/api/oauth/login", loginDto);
    },
  });
};

export { useUserQuery, useLoginMutation, useLogoutMutation };
