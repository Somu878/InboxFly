import React from "react";
interface classifyButtonProps {
  classified: boolean;
  action: React.MouseEventHandler<HTMLButtonElement>;
}
function ClassifyButton({ action, classified }: classifyButtonProps) {
  return (
    <button
      className="border p-1 font-normal rounded-md border-gray-100 disabled:cursor-not-allowed"
      disabled={classified}
      onClick={action}
    >
      {!classified ? "Classify" : "Classified"}
    </button>
  );
}

export default ClassifyButton;
