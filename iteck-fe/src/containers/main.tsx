import React, { useEffect } from "react";
import Nav from "../components/nav/nav";
import { useLoginStore } from "../store/auth";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import MainPage from "../pages/main";
import CreateExp from "../pages/exp/defaultform";

type Props = {};

const Main = (props: Props) => {
  const { isLogin } = useLoginStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-row">
      <Nav></Nav>
      <div className="flex-grow">
        <MainPage />
        {/* 페이지별로 변경될 화면 내용 */}
      </div>
    </div>
  );
};

export default Main;
