import { useState } from "react";
import HamburgerModal from "./HamburgerModal";

function HomePage({ setModalOpen, items = [], view, setView, username }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const categoriesMap = items.reduce((groups, item) => {
    const categoryName = item.type || "Other";
    if (!groups[categoryName]) {
      groups[categoryName] = [];
    }
    groups[categoryName].push(item);
    return groups;
  }, {});

  const dynamicCategories = Object.keys(categoriesMap);
  return (
    <>
      <div className="min-h-screen w-full flex flex-col bg-gray-50">
        <nav className="flex items-center w-full px-4 py-6">
          <div className="flex-1">
            <h1
              className="text-2xl font-bold text-green-600 cursor-pointer"
              onClick={() => setView("home")}
            >
              {view === "feed" && username ? `${username} Finds` : "FINDS"}
            </h1>
          </div>
          <div className="flex-1 flex justify-end items-center gap-4">
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-2xl"
            >
              ☰
            </button>
            {menuOpen && <HamburgerModal setMenuOpen={setMenuOpen} />}
            <a href="" className="hidden md:block text-lg font-medium">
              About
            </a>

            <div className="hidden md:block">
              {/* Added flex here so search form and button align perfectly when button shows up */}
              <div className="flex items-center gap-4">
                <form className="max-w-md mx-auto">
                  <label
                    htmlFor="search"
                    className="block mb-2.5 text-sm font-medium text-heading sr-only"
                  >
                    Search
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-body"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2"
                          d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>

                    <input
                      type="search"
                      id="search"
                      className="block w-full p-3 ps-9 bg-neutral-secondary-medium border text-heading text-sm rounded-lg shadow-xs placeholder:text-body outline-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 focus-visible:ring-green-600"
                      required
                    />
                  </div>
                </form>

                {/* === FIXED: This physical button now ONLY appears on the feed page layout! === */}
                {view === "feed" && (
                  <button
                    onClick={() => setModalOpen(true)}
                    className="px-5 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                    style={{ fontFamily: "'OpenRunde', sans-serif" }}
                  >
                    Add Find
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 w-full flex flex-col justify-center items-center text-center">
          {view === "home" && (
            <div className="my-auto py-20 flex flex-col items-center">
              <h1
                className="text-4xl md:text-6xl font-bold"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                Welcome to FINDS.
              </h1>
              <h2
                className="text-lg mt-2 font-medium text-green-600"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                Share the things that matter to you
              </h2>
              <button
                onClick={() => setModalOpen(true)}
                className="mt-6 px-6 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-xs hover:bg-green-700 transition-colors"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                Get Started
              </button>
            </div>
          )}

          {view === "feed" && (
            <div className="w-full space-y-12 text-left px-8 py-6">
              {dynamicCategories.length === 0 ? (
                <p className="text-center text-gray-400 italic py-12">
                  Your feed is empty. Add a find to get started!
                </p>
              ) : (
                dynamicCategories.map((categoryName) => (
                  <div key={categoryName} className="w-full">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {categoryName}
                    </h3>
                    <div className="flex gap-6 overflow-x-auto pb-4">
                      {categoriesMap[categoryName].map((item) => (
                        <div
                          key={item.id}
                          className="flex-none w-72 bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:border-green-500 transition-all"
                        >
                          <h4 className="text-xl font-bold text-gray-800 mb-2 truncate">
                            {item.title}
                          </h4>
                          <p className="text-gray-500 text-sm line-clamp-3">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default HomePage;
