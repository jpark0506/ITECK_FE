import * as React from "react";
type Props = {};
const ProcessIcon = (props: Props) => (
  <svg
    width={16}
    height={17}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={8} cy={8.5} r={4.5} stroke="#D9D9D9" />
    <circle cx={8} cy={8.5} r={7.5} stroke="#D9D9D9" strokeDasharray="2 2" />
  </svg>
);
export default ProcessIcon;
