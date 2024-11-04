import React, { useEffect, useState } from "react";
import Nav from "../components/nav/nav";
import { useLoginStore } from "../store/auth";
import { Outlet, Route, Routes, useNavigate, useParams } from "react-router-dom";
import MainPage from "../pages/main";
import ExpView from "./view";

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

      </div>
    </div>
  );
};

export default Main;
