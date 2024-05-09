"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="fixed inset-x-0 bottom-0 bg-gray-800 text-white text-center py-3">
      © {new Date().getFullYear()} Nancy Lee
    </footer>
  );
};

export default Footer;
