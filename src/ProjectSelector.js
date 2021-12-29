import { Menu, Transition } from "@headlessui/react";
import React, { forwardRef, Fragment, useRef, useState } from "react";

const projects = [
  { id: "1", title: "Some random project" },
  { id: "2", title: "Another random project" },
  { id: "3", title: "3" },
  { id: "4", title: "4" },
  { id: "5", title: "5" },
  { id: "6", title: "6" },
  { id: "7", title: "7" },
  { id: "8", title: "8" },
];

export const ProjectSelector = forwardRef(({}, ref) => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  let _projects = projects;

  if (searchQuery) {
    _projects = projects.filter((p) => p.title.includes(searchQuery));
  }

  return (
    <Menu
      as="div"
      className="relative inline-block text-left outline-none"
      onFocus={() => {
        inputRef.current?.focus();
      }}
    >
      <div>
        <Menu.Button ref={ref} as="div">
          <button className="px-3 py-1 outline-none text-white bg-neutral-800">
            Select project
          </button>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className="absolute right-0 mt-2 origin-top-right bg-white divide-y rounded-md shadow-lg outline-none w-96 dark:bg-neutral-800 dark:divide-neutral-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="p-1">
            <input
              type="text"
              placeholder="Search Projects"
              className="px-3 py-2 outline-none bg-transparent text-white"
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              ref={inputRef}
            />
          </div>
          <div className="p-1 overflow-y-auto max-h-96">
            {_projects.map((p) => {
              return (
                <Menu.Item key={p.id} as="li">
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-gray-100 dark:bg-gray-800"
                          : "text-gray-800 dark:text-gray-50"
                      } group flex rounded-md items-center w-full px-3 py-2 text-left font-medium`}
                      onClick={() => {
                        console.warn("Selected", p.id);
                      }}
                    >
                      <div className="ml-4">{p.title}</div>
                    </button>
                  )}
                </Menu.Item>
              );
            })}

            {!_projects.length && (
              <p className="p-3 text-center dark:text-gray-500">No results</p>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
});
