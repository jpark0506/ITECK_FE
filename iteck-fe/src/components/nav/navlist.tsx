import React from "react";
import Ex from "../../assets/component/ex";

type Props = {};

type NavList = {
  date: string; // 날짜를 string 형식으로 저장
  titles: string[]; // 각 날짜에 따라 여러 제목들을 저장
};

const navList: NavList[] = [
  // {
  //   date: "10월 28일",
  //   titles: ["배터리 2차 실험", "배터리 2차 실험"],
  // },
  // {
  //   date: "10월 27일",
  //   titles: ["배터리 2차 실험", "배터리 2차 실험"],
  // },
];

const NavList = (props: Props) => {
  return (
    <div className="w-full flex flex-1 flex-col text-white">
      {/* TODO: selected와 아닌 거 구분하기 */}
      {navList.length === 0 && (
        <div className="w-full text-center font-normal text-md py-3 text-minor">
          실험을 추가해주세요
        </div>
      )}
      {navList.map((nav) => (
        <div className="w-full text-left flex-col space-x-1 space-y-3 py-3">
          <div className="pl-2 text-white font-semibold text-md">
            {nav.date}
          </div>
          {nav.titles.map((title) => (
            <button className="flex w-full text-left items-center flex-row font-normal p-3 rounded-lg border-1 border-primary hover:border-white hover:text-primary hover:bg-white transition-all py-2 px-4 space-x-2">
              <Ex />
              <div>{title}</div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NavList;
