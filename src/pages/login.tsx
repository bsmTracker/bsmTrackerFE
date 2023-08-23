import { UserLoginDto } from "@/types/user";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { useLoginMutation } from "@/query/user";
import tw from "tailwind-styled-components";

const Login = () => {
  const router = useRouter();

  const { handleSubmit, register } = useForm<UserLoginDto>();

  const loginMutation = useLoginMutation();

  const onSubmit = async (data: UserLoginDto) => {
    await loginMutation.mutateAsync(data, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <LoginUI onSubmit={handleSubmit(onSubmit)}>
      <h1>BsmTracker Login하기</h1>
      <LoginInputUI
        type="email"
        placeholder="이메일"
        {...register("email", {
          required: true,
        })}
      ></LoginInputUI>
      <LoginInputUI
        type="password"
        placeholder="비밀번호"
        {...register("password", {
          required: true,
        })}
      ></LoginInputUI>
      <LoginButtonUI type="submit" value="로그인">
        로그인하기
      </LoginButtonUI>
    </LoginUI>
  );
};

const LoginUI = tw.form`flex flex flex-col w-full h-full items-center justify-center p-[10px]`;
const LoginButtonUI = tw.button`m-[10px] p-[10px] h-[60px]  w-full max-w-[700px] bg-black text-white text-center flex items-center justify-center cursor-pointer`;
const LoginInputUI = tw.input`bg-white border-black border-[0.5px] m-[10px] p-[10px] w-full max-w-[700px]`;

export default Login;
