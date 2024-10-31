import React from "react";
import InputComponent from "../components/mainInput";
import { useLoginStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import LoginTitle from "../components/title/logintitle";

type Props = {};

const Login = (props: Props) => {
  const { setIsLogin } = useLoginStore();

  const navigate = useNavigate();

  const onLogin = () => {
    setIsLogin(true);
    navigate("/");
  };
  return (
    <div className="w-full h-full flex flex-row justify-center items-center">
      <LoginTitle />
      <div className="h-full w-1/2 flex flex-col justify-center items-center p-40 space-y-10 ">
        <InputComponent placeholder="이메일을 입력해주세요" />
        <InputComponent placeholder="비밀번호를 입력해주세요" />
        <div className="w-full flex flex-row justify-between items-center">
          <button
            className="w-2/3 px-3 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={onLogin}
          >
            로그인하기
          </button>
          <a href="/signup" className="w-1/3 text-primary text-right underline">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
