type Props = {
  className?: string;
};
const Plus = (props: Props) => {
  const { className } = props;
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_113_582)">
        <path
          d="M8 3.33325V12.6666"
          stroke="white"
          strokeWidth={1.33333}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.33333 8H12.6667"
          stroke="white"
          strokeWidth={1.33333}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_113_582">
          <rect width={16} height={16} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default Plus;
