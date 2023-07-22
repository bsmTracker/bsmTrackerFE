import { UserLoginDto } from "@/types/user";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginMutation } from "@/query/user";

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
    <div className="flex flex-col w-full h-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col min-w-[700px]"
      >
        <input
          type="email"
          {...register("email", {
            required: true,
          })}
          placeholder="이메일"
          className={inputStyle}
        ></input>
        <input
          type="password"
          {...register("password", {
            required: true,
          })}
          placeholder="비밀번호"
          className={inputStyle}
        ></input>
        <button type="submit" value="로그인" className={buttonStyle}>
          로그인하기
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

const buttonStyle =
  "m-[10px] p-[10px] h-[60px] bg-black text-white text-center flex items-center justify-center cursor-pointer";

const inputStyle = "bg-white border-black border-[0.5px] m-[10px] p-[10px]";

export default Login;
