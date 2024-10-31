import React, { useEffect } from "react";
import Nav from "../components/nav/nav";
import { useLoginStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import DefaultForm from "../pages/exp/defaultform";
import FileForm from "../pages/exp/fileform";
import FactorForm from "../pages/exp/factorform";
import ErrorPage from "../error";

type Props = {};

type IndexProps = {
  index: number;
  increase: () => void;
  decrease: () => void;
};

const Pages = (props: IndexProps) => {
  const { index, increase, decrease } = props;
  useEffect(() => {
    console.log(index);
  });
  switch (index) {
    case 0:
      return <DefaultForm increase={increase} />;
    case 1:
      return <FileForm increase={increase} decrease={decrease} />;
    case 2:
      return <FactorForm decrease={decrease} />;
    default:
      return <ErrorPage />;
  }
};

const CreateAnalysis = (props: Props) => {
  const { isLogin } = useLoginStore();

  const [index, setIndex] = React.useState(0);

  const increase = () => {
    setIndex(index + 1);
  };

  const decrease = () => {
    setIndex(index - 1);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-row">
      <Nav index={index} analysis={true}></Nav>
      <Pages index={index} increase={increase} decrease={decrease} />
    </div>
  );
};

export default CreateAnalysis;
