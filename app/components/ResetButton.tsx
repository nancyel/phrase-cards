"use client";

import React from "react";

const handleReset = () => {
  window.location.reload();
};

function ResetButton() {
  return (
    <button
      onClick={handleReset}
      className="px-4 py-2 bg-[#673ab7] text-white rounded hover:bg-[#400d9e] focus:outline-none"
    >
      Reset
    </button>
  );
}

export default ResetButton;
