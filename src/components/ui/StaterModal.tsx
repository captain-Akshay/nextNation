"use client";
import React, { useEffect, useState } from "react";

export default function StaterModal() {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const carouselModalClosed = localStorage.getItem('modalClosed');
    if (!carouselModalClosed) {
      setShowModal(true);
    }else{
      setShowModal(false);
    }
  }, []);
  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem('modalClosed', 'true');
  };

  return (
    <>
          {showModal && (
        <div
          className="fixed inset-0 z-40"
          onClick={handleCloseModal}
          style={{ backdropFilter: "blur(4px)" }}
        ></div>
      )}
      {showModal && (
        <div id="defaultModal" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center">
        <div className="relative w-full max-w-2xl max-h-full">
      <div className="bg-white dark:bg-gray-800 px-3 md:px-4 py-12 flex flex-col justify-center items-center top-1/2 left-1/2">
        <h1 className="mt-8 md:mt-12 text-3xl lg:text-4xl font-semibold leading-10 text-center text-gray-800  md:w-9/12 lg:w-7/12 dark:text-white">Welcome to the coveted family of URVerse!</h1>
        <p className="mt-10 text-base leading-normal text-center text-gray-600 md:w-9/12 lg:w-7/12 dark:text-white">In this collaborative environment, we foster a community dedicated to the concurrent execution of code alongside insightful contributions from colleagues. Our platform facilitates a professional space where members engage in code execution and discussion in tandem, enhancing the efficiency and depth of our collaborative efforts.</p>
        <div className="mt-12 md:mt-14 w-full flex justify-center">
          <button onClick={handleCloseModal} className="dark:text-white dark:border-white w-full sm:w-auto border border-gray-800 text-base font-medium text-gray-800 py-5 px-14 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-800 hover:text-white dark:hover:text-white dark:hover:bg-gray-700">Continue</button>
        </div>
      </div>
      </div>
    </div>
      )}

    </>
  );
}
