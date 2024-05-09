"use client";

import { useState } from "react";

interface CopyToClipboardProps {
  text: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5 seconds
    } else {
      console.error("Clipboard not supported");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
    >
      {copied ? "Copied!" : "Copy to Clipboard"}
    </button>
  );
};

export default CopyToClipboard;
