import { useState } from "react";
import HamburgerModal from "./HamburgerModal";

function HomePage({ setModalOpen, items = [], view, setView, username }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Grouping items dynamically by their category type
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
    <div>
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-r from-[#EAF7EE] via-white to-[#F4F9F5]">
        <nav className="flex items-center w-full px-4 py-6 ">
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
              className="md:hidden text-2xl cursor-pointer"
            >
              ☰
            </button>

            {menuOpen && (
              <HamburgerModal
                setMenuOpen={setMenuOpen}
                view={view}
                setView={setView}
              />
            )}


            <div className="hidden md:flex items-center gap-x-6 mr-2">
              <button
                onClick={() => setView("home")}
                className={`text-base font-semibold transition-colors cursor-pointer ${view === "home"
                  ? "text-green-600 border-b-2 border-green-600 pb-0.5"
                  : "text-gray-400 hover:text-gray-900"
                  }`}
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                Home
              </button>
              <button
                onClick={() => setView("feed")}
                className={`text-base font-semibold transition-colors cursor-pointer ${view === "feed"
                  ? "text-green-600 border-b-2 border-green-600 pb-0.5"
                  : "text-gray-400 hover:text-gray-900"
                  }`}
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                Feed
              </button>
            </div>


            {view === "feed" && (
              <button
                onClick={() => setModalOpen(true)}
                className="hidden md:block px-5 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                Add Find
              </button>
            )}
          </div>
        </nav>

        < main className="flex-1 w-full flex flex-col justify-start" >
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
                className="mt-6 px-6 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-xs hover:bg-green-700 transition-colors cursor-pointer"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                Get Started
              </button>
            </div>
          )
          }

          {
            view === "feed" && (
              <>

                <div className="w-full flex flex-col gap-y-12 text-left px-8 py-4">
                  {dynamicCategories.length === 0 ? (
                    <p className="text-center text-gray-400 italic py-12">
                      Your feed is empty. Add a find to get started!
                    </p>
                  ) : (
                    dynamicCategories.map((categoryName) => (
                      <div key={categoryName} className="w-full">
                        <h3 className="text-3xl font-bold text-gray-900 mb-6">
                          {categoryName}
                        </h3>

                        <div className="flex gap-x-6 overflow-x-auto pb-4 scrollbar-none">
                          {categoriesMap[categoryName].map((item) => (

                            <div
                              key={item.id}
                              className="flex-none w-72 flex flex-col items-center gap-y-2 group cursor-pointer text-center"
                            >
                              <div className="w-full max-h-96 rounded-xl overflow-hidden relative bg-gray-50 flex items-center justify-center">
                                <img
                                  src={item.image || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60"}
                                  alt={item.title}
                                  className="w-full h-auto object-contain group-hover:scale-101 transition-transform duration-300 rounded-xl"
                                  loading="lazy"
                                />
                              </div>

                              <h4 className="text-lg font-bold text-gray-900 truncate w-full px-2 mt-1">
                                {item.title}
                              </h4>

                              <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed max-w-[90%]">
                                {item.description}
                              </p>
                            </div>

                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="md:hidden fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="px-5 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-xs hover:bg-green-700 pointer-events-auto cursor-pointer"
                  >
                    <div className="text-2xl">+</div>
                  </button>
                </div>
              </>
            )
          }
        </main >
      </div >
    </div >
  );
}

export default HomePage;