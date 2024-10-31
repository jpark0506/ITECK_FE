import React from "react";

type Props = {};

type NavList = {
  date: string;
  title: string;
};

const navList: NavList[] = [
  {
    date: "10월 27일",
    title: "제목1",
  },
  {
    date: "10월 27일",
    title: "제목2",
  },
  {
    date: "10월 27일",
    title: "제목3",
  },
  {
    date: "10월 27일",
    title: "제목4",
  },
  {
    date: "10월 27일",
    title: "제목5",
  },
];

const NavList = (props: Props) => {
  return (
    <div className="w-full flex flex-col text-white">
      <div className="w-full text-left flex-row">10월 27일</div>
      {/* TODO: selected와 아닌 거 구분하기 */}
      {navList.map((nav, index) => {
        return (
          <div key={index} className={`w-full text-left`}>
            {nav.title}
          </div>
        );
      })}
    </div>
  );
};

export default NavList;
