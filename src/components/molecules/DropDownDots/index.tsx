"use client";

import { IconSvgProps, ListActionsProps } from "@/types/general";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

type DropDownDotsProps = {
  listActions: Array<ListActionsProps>;
  className?: string;
};

const DropDownDots = ({ listActions, className }: DropDownDotsProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className={className}>
      <button
        id="dropdownMenuIconButton"
        onClick={() => setShow(!show)}
        data-dropdown-toggle="dropdownDots"
        className="inline-flex rounded-full items-center p-2 text-sm font-medium text-center text-gray-900 bg-white hover:bg-secondary-50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-secondary-50 dark:hover:bg-prim dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>

      <div
        id="dropdownDots"
        className={twMerge(
          !show && "hidden",
          "absolute top-6 right-16",
          "z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-secondary-50 dark:divide-gray-600"
        )}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconButton"
        >
          {listActions.map((action) => (
            <li key={action.id}>
              <a
                href={action.href}
                className="block px-4 py-2 hover:bg-white dark:hover:bg-white dark:hover:text-secondary-50"
              >
                {action.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDownDots;
