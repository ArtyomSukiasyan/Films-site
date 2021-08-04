import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ handleChange }) {
  return (
    <header>
      <Disclosure as="nav" className="bg-gray-900 fixed z-50 w-full">
        <div className="max-w-10xl mx-auto px-2 sm:px-2 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/films"
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "px-3 py-2 rounded-md text-sm font-medium"
                    )}
                  >
                    Films
                  </Link>
                  <Link
                    to="/films/favorites"
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "px-3 py-2 rounded-md text-sm font-medium"
                    )}
                  >
                    Favorites
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div as="div" className="ml-3 relative">
                <input
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
                />
                <button
                  className={classNames(
                    "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "px-3 py-2 rounded-md text-sm font-medium",
                    "m-16"
                  )}
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </header>
  );
}
