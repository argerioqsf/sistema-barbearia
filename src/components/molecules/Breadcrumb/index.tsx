"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

type TBreadCrumbProps = {
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

const Breadcrumb = ({
  listClasses,
  activeClasses,
  capitalizeLinks = true,
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path, index) => path);
  function renderItems(link: string, index: number) {
    let href = `/${pathNames.slice(0, index + 1).join("/")}`;
    let itemClasses =
      paths === href ? `${listClasses} ${activeClasses}` : listClasses;
    let itemLink = capitalizeLinks
      ? link[0].toUpperCase() + link.slice(1, link.length)
      : link;

    return (
      <li className={twMerge(itemClasses)}>
        <div className="flex items-center">
          {pathNames.length === index + 1 ? (
            <span className="ms-1 text-sm font-medium text-black md:ms-2 dark:text-black">
              {itemLink}
            </span>
          ) : (
            <a
              href={href}
              className="ms-1 mr-2 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-black"
            >
              {itemLink}
            </a>
          )}

          {pathNames.length !== index + 1 && (
            <svg
              className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          )}
        </div>
      </li>
    );
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center mr-1">
          <a
            href={`/${pathNames[0]}/dashboard/home`}
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-primary-50"
          >
            <svg
              className="w-3 h-3 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Home
          </a>
        </li>

        <svg
          className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>

        {pathNames.map((link, index) => {
          if (index > 1) {
            return (
              <React.Fragment key={index}>
                {renderItems(link, index)}
              </React.Fragment>
            );
          }
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
