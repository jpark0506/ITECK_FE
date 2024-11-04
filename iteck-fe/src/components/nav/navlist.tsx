import React from "react";
import Ex from "../../assets/component/ex";
import { useNavigate } from "react-router-dom";

type Props = {
  index?: number;
};

type Exp = {
  id: number; // 각 실험의 고유 id
  date: string; // 날짜를 string 형식으로 저장
  title: string; // 실험의 제목
};

const navList: Exp[] = [
  {
    id: 1,
    date: "2024-10-10",
    title: "실험1",
  },
  {
    id: 2,
    date: "2024-10-11",
    title: "실험2",
  },
  {
    id: 3,
    date: "2024-10-12",
    title: "실험3",
  },
  {
    id: 4,
    date: "2024-10-13",
    title: "실험4",
  },
  {
    id: 5,
    date: "2024-10-14",
    title: "실험5",
  },
  {
    id: 6,
    date: "2024-10-15",
    title: "실험6",
  },
  {
    id: 7,
    date: "2024-10-16",
    title: "실험7",
  },
  {
    id: 8,
    date: "2024-10-17",
    title: "실험8",
  },
  {
    id: 9,
    date: "2024-10-18",
    title: "실험9",
  },
  {
    id: 10,
    date: "2024-10-19",
    title: "실험10",
  },
  {
    id: 11,
    date: "2024-10-20",
    title: "실험11",
  },
  {
    id: 12,
    date: "2024-10-21",
    title: "실험12",
  },
  {
    id: 13,
    date: "2024-10-22",
    title: "실험13",
  },
  {
    id: 14,
    date: "2024-10-23",
    title: "실험14",
  },
  {
    id: 15,
    date: "2024-10-24",
    title: "실험15",
  },
  {
    id: 16,
    date: "2024-10-25",
    title: "실험16",
  },
  {
    id: 17,
    date: "2024-10-26",
    title: "실험17",
  },
];

const NavList = (props: Props) => {

  const navigate = useNavigate();

  const { index } = props;
  return (
    <div className="w-full flex flex-1 flex-col text-white overflow-auto mt-3 space-y-2"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>

      {navList.length === 0 && (
        <div className="w-full text-center font-normal text-sm py-3 text-minor">
          실험을 추가해주세요
        </div>
      )}
      {navList.map((nav) => (
        <button
          onClick={() => navigate(`/view/${nav.id}`)}
          className={`${index === nav.id ? 'bg-white text-primary' : 'bg-primary'}
          flex w-full text-left items-center flex-row font-normal p-3 rounded-lg border-1 border-primary hover:border-white hover:text-primary hover:bg-white transition-all py-2 px-4 space-x-2`}>
          <Ex />
          <div>{nav.title}</div>
        </button>
      ))}
    </div>
  );
};

export default NavList;
