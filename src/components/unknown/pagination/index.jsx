import React from "react";

const Pagination = ({ totalPages, page, onNext, onPrev }) => {
  
  return (
    <div className="mx-auto flex flex-row self-center justify-center items-center gap-5 sm:gap-3 my-5">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          width="2em"
          height="2em"
          fill="currentColor"
          class="zds-icon RC794g X9n9TI DlJ4rT _5Yd-hZ I_qHp3"
          focusable="false"
          aria-hidden="true"
        >
          <path d="M15.84 21.36a.75.75 0 0 1-.53-.22l-7.55-7.55a2.25 2.25 0 0 1 0-3.18l7.55-7.551a.75.75 0 1 1 1.06 1.06l-7.55 7.55a.75.75 0 0 0 0 1.061l7.55 7.55a.75.75 0 0 1-.53 1.28"></path>
        </svg>
      </button>
      <span className="text-base">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          width="2em"
          height="2em"
          fill="currentColor"
          class="zds-icon RC794g X9n9TI DlJ4rT _5Yd-hZ I_qHp3"
          focusable="false"
          aria-hidden="true"
        >
          <path d="M7.63 21.14a.75.75 0 0 1 0-1.06l7.55-7.55a.75.75 0 0 0 0-1.06L7.63 3.92a.75.75 0 1 1 1.06-1.061l7.55 7.55a2.25 2.25 0 0 1 0 3.182l-7.55 7.55a.75.75 0 0 1-1.06 0"></path>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
