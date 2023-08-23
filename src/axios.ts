import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const RESPONSE = {
  STATUS: {
    OK: 200,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    UNVERIFY: 400,
    NOTFOUND: 404,
  },
};

const responseInterceptors = (response: AxiosResponse) => {
  return response;
};

const responseErrorInterceptors = async (errorResponse: any) => {
  const { response } = errorResponse;
  if (response?.status === RESPONSE.STATUS.UNAUTHORIZED) {
    toast("로그인을 해야합니다.");
    await new Promise((resolve) =>
      setTimeout(() => {
        location.href = "/login";
      }, 1000)
    );

    return;
  } else if (response?.status === RESPONSE.STATUS.FORBIDDEN) {
    toast("해당 작업은 권한에 맞는 작업이 아닙니다.");
    return;
  } else if (response?.status !== RESPONSE.STATUS.OK) {
    if (response?.data?.message) {
      toast(response?.data?.message);
    } else {
      throw errorResponse;
    }
    return;
  }
};

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  responseInterceptors,
  responseErrorInterceptors
);

export default axios;
