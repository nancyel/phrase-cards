"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import CopyToClipboard from "./components/CopyToClipboard";
import IntegerInputForm from "./components/IntegerInputForm";
import ResetButton from "./components/ResetButton";

export default function Home() {
  const [page, setPage] = useState<number | null>(null);

  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`/api/items?page=${page}`);

      if (response.status === 200) {
        const data = await response.json();
        setItems(data);
      }
    };

    fetchItems();
  }, [page]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, items]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (items.length > 0) {
      if (event.key === " ") {
        handleSpace();
      } else if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    }
  };

  const handleSpace = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < items.length - 1 ? prevIndex + 1 : items.length - 1
    );
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return !page ? (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-xl md:text-2xl mb-5 mx-auto px-6 lg:px-8 max-w-screen-lg">
        How many lines would you like to review?
      </div>
      <IntegerInputForm page={page} setPage={setPage} />
    </div>
  ) : (
    <div
      {...handlers}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <div className="mt-6">
        <Suspense
          fallback={
            <h6 className="text-center ltr">
              📡 Loading data please wait ...{" "}
            </h6>
          }
        >
          {items.length > 0 ? (
            <div
              className={`sm:text-base text-2xl md:text-4xl m-auto leading-10 md:leading-[3rem] px-4 sm:px-6 lg:px-8 max-w-screen-lg`}
            >
              {items[currentIndex]}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </Suspense>
      </div>

      <div className="mt-10 space-x-2">
        <CopyToClipboard text={items[currentIndex]} />

        <ResetButton />
      </div>
      <span className="text-base mt-10">
        {currentIndex + 1}/{items.length}
      </span>
      <div className="mt-10 text-gray-500 italic text-center">
        <p className="mb-2">
          Hit the <strong>space bar</strong> to advance to the next item.
        </p>
        <p>
          Press the <strong>arrow keys</strong> to navigate to the previous or
          next item.
        </p>
      </div>
    </div>
  );
}
