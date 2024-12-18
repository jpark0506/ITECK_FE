import React from "react";

type Props = {};

const ProcessIconComplete = (props: Props) => {
  return (
    <svg
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.5 8.5C12.5 10.9853 10.4853 13 8 13C5.51472 13 3.5 10.9853 3.5 8.5C3.5 6.01472 5.51472 4 8 4C10.4853 4 12.5 6.01472 12.5 8.5Z"
        fill="#D9D9D9"
        stroke="#D9D9D9"
      />
      <circle cx={8} cy={8.5} r={7.5} stroke="#D9D9D9" strokeDasharray="2 2" />
    </svg>
  );
};

export default ProcessIconComplete;
