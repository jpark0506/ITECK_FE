import React from "react";
import Plus from "../../assets/component/plus";
import NavList from "./navlist";
import LogoutButton from "./navlogoutbutton";
import { useNavigate } from "react-router-dom";

type Props = {
  index?: number;
  analysis?: boolean;
  simulation?: boolean;
};

const Nav = (props: Props) => {
  const navigate = useNavigate();
  const { index } = props
  return (
    <div className="flex flex-col w-1/6 h-full bg-primary p-4 text-white">
      <div
        className="w-full text-left font-semibold text-4xl mb-2"
        onClick={() => navigate("/")}
      >
        I-TECK
      </div>
      <div
        onClick={() => navigate("/")}
        className="w-full text-left font-normal text-sm pb-3"
      >
        실험을 위한 최적의 솔루션
      </div>
      <div className="w-full text-left font-bold text-md pb-3">
        박준혁님, 환영합니다.
      </div>

      <button
        onClick={() => navigate("/create/analysis")}
        className="flex flex-row space-x-2 items-center w-full px-4 py-2 border-1 bg-primary text-white hover:text-primary font-normal rounded-lg hover:bg-white text-left border-white transition-color duration-500"
      >
        <Plus />
        <div className="text-md ">실험 추가하기</div>
      </button>
      <NavList index={index} />
      <LogoutButton />
    </div>
  );
};

export default Nav;
