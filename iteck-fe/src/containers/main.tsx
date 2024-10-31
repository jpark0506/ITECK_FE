import React, { useEffect } from "react";
import Nav from "../components/nav/nav";
import { useLoginStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

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
    </div>
  );
};

export default Main;
