import React, { useEffect } from "react";
import InputComponent from "../components/mainInput";
import Nav from "../components/nav/nav";
import { useLoginStore } from "../store/auth";
import { useNavigate, useNavigation } from "react-router-dom";

type Props = {};

const Main = (props: Props) => {
  const { isLogin, setIsLogin } = useLoginStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-row justify-center items-center">
      <Nav />
    </div>
  );
};

export default Main;
