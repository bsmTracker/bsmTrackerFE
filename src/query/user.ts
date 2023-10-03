import { useMutation, useQuery, useQueryClient } from "react-query";
import { USER_CACH_KEYS } from "./queryKey";
import axios from "../axios";
import { User, UserLoginDto } from "../types/user";

const useUserQuery = () => {
  return useQuery({
    queryKey: USER_CACH_KEYS.userKey,
    queryFn: async () => {
      console.log("((())))");
      return axios.get("/api/oauth/getUser").then((res) => res?.data as User);
    },
  });
};

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      localStorage.setItem("access_token", "");
      queryClient.setQueryData(USER_CACH_KEYS.userKey, null);
      location.replace("/login");
    },
  });
};

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (loginDto: UserLoginDto) => {
      const { data } = await axios.post("/api/oauth/login", loginDto);
      localStorage.setItem("access_token", data.accessToken);
      axios.defaults.headers["access_token"] = data.access_token;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(USER_CACH_KEYS.userKey);
    },
  });
};

export { useUserQuery, useLoginMutation, useLogoutMutation };
