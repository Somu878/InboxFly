import React from "react";
interface classifyButtonProps {
  state: boolean;
  classified: boolean;
  action: React.MouseEventHandler<HTMLButtonElement>;
}
function ClassifyButton({ action, classified, state }: classifyButtonProps) {
  return (
    <button
      className="flex items-center justify-center border p-1 font-normal rounded-md border-gray-100 disabled:cursor-not-allowed min-w-20"
      disabled={classified}
      onClick={action}
    >
      {state ? <LoadingBtn /> : !classified ? "Classify" : "Classified"}
    </button>
  );
}

export default ClassifyButton;

function LoadingBtn() {
  return (
    <div
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
  );
}
