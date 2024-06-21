import React from "react";
interface classifyButtonProps {
  state: boolean;
  classified: boolean;
  action: React.MouseEventHandler<HTMLButtonElement>;
}
function ClassifyButton({ action, classified, state }: classifyButtonProps) {
  return (
    <button
      className="flex items-center justify-center border p-1 font-normal rounded-md border-gray-100  disabled:border-green-800 "
      disabled={classified}
      onClick={action}
    >
      {state ? (
        <LoadingBtn />
      ) : !classified ? (
        <svg height="15" width="15" fill="#FFFFFF" viewBox="0 0 24 24">
          <path
            fill="#ffc400"
            d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"
          ></path>
        </svg>
      ) : (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 7L9.42857 17L6 13"
            stroke="green"
            strokeWidth="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export default ClassifyButton;

function LoadingBtn() {
  return (
    <div
      className="inline-block h-4 w-4 p-1 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
  );
}
