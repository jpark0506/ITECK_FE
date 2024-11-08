import React from "react";
import Ex from "../../assets/component/ex";
import { useNavigate } from "react-router-dom";
import { useGetExpList } from "../../api/api";
import { useResultStore } from "../../store/result";
import { useLoginStore } from "../../store/auth";

type Props = {
  index?: string;
};

type Meta = {
  id: number;
  title: string;
};

const NavList = (props: Props) => {
  const navigate = useNavigate();
  const { userName } = useLoginStore();
  const { data: navList, isFetching } = useGetExpList(userName!);
  const { clear } = useResultStore();
  const { index } = props;

  return (
    <div
      className="w-full flex flex-1 flex-col text-white overflow-auto mt-3 space-y-2"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >

      {(navList === undefined || navList?.length === 0) && (
        <div className="w-full text-center font-normal text-sm py-3 text-minor">
          실험을 추가해주세요
        </div>
      )}

      {
        navList?.map((nav) => (
          <button
            key={nav?.id}
            onClick={() => {
              clear();
              navigate(`/view/${nav?.id}`);
            }}
            className={`${index === nav?.id ? "bg-white text-primary" : "bg-primary"
              } flex w-full text-left items-center flex-row font-normal p-3 rounded-lg border-1 border-primary hover:border-white hover:text-primary hover:bg-white transition-all py-2 px-4 space-x-2`}
          >
            <Ex />
            <div>{nav.title}</div>
          </button>
        ))}
    </div>
  );
};

export default NavList;
