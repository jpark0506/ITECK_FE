import React, { useEffect } from "react";
import Nav from "../components/nav/nav";
import { useLoginStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import DefaultForm from "../pages/exp/defaultform";

type Props = {};

const CreateAnalysis = (props: Props) => {
  const { isLogin } = useLoginStore();

  const [index, setIndex] = React.useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-row">
      <Nav index={index} analysis={true}></Nav>
      <DefaultForm />
    </div>
  );
};

export default CreateAnalysis;
