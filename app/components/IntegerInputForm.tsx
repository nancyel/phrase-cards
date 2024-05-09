"use client";

import React, { useState } from "react";

interface IntegerInputFormProps {
  page: number | null;
  setPage: React.Dispatch<React.SetStateAction<number | null>>;
}

export const IntegerInputForm: React.FC<IntegerInputFormProps> = ({
  page,
  setPage,
}) => {
  const [input, setInput] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Regular expression to allow only integer values
    if (/^\d*$/.test(value)) {
      setInput(value);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setPage(parseInt(input, 10) || null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="integerInput"
        value={input}
        onChange={handleChange}
        required
        type="number"
        className="border border-gray-300 px-2 py-1"
      />
      <button
        type="submit"
        className="ml-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      >
        Submit
      </button>
      {page !== null && <p># requested: {page}</p>}
    </form>
  );
};

export default IntegerInputForm;
