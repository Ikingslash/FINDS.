import HamburgerModal from "./HamburgerModal";
import { HEADING_STROKE } from "../constants";

function Navbar({ setModalOpen, view, setView, username, menuOpen, setMenuOpen }) {
  return (
    <nav className="flex items-center w-full px-4 py-6">
      <div className="flex-1">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => setView("home")}
          style={{ fontFamily: "'OpenRunde', sans-serif" }}
        >
          {view === "feed" && username ? (
            <>
              <span style={{ color: "#16a34a" }}>{username}</span>{" "}
              <span
                style={{
                  color: "#FFFFFF",
                  WebkitTextStroke: HEADING_STROKE,
                  paintOrder: "stroke fill",
                }}
              >
                Finds
              </span>
            </>
          ) : (
            <span
              style={{
                color: "#FFFFFF",
                WebkitTextStroke: HEADING_STROKE,
                paintOrder: "stroke fill",
              }}
            >
              FINDS
            </span>
          )}
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
  );
}

export default Navbar;