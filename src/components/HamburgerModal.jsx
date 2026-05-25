function HamburgerModal({ setMenuOpen, view, setView }) {
    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-6 animate-fade-in md:hidden">
            {/* Top row container carrying mobile dismiss button */}
            <div className="flex justify-end items-center w-full mb-8">
                <button
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl font-semibold text-gray-500 p-2 cursor-pointer"
                    aria-label="Close menu"
                >
                    ✕
                </button>
            </div>

            {/* 🎯 MOBILE FEEDS TAB TOGGLE LINKS (Triggers view mutations natively) */}
            <div className="flex flex-col gap-y-6 text-center mt-12">
                <button
                    onClick={() => {
                        setView("home");
                        setMenuOpen(false);
                    }}
                    className={`text-2xl font-bold transition-all p-3 rounded-xl cursor-pointer ${view === "home"
                            ? "text-green-600 bg-green-50"
                            : "text-gray-600 hover:text-black"
                        }`}
                    style={{ fontFamily: "'OpenRunde', sans-serif" }}
                >
                    Home
                </button>

                <button
                    onClick={() => {
                        setView("feed");
                        setMenuOpen(false);
                    }}
                    className={`text-2xl font-bold transition-all p-3 rounded-xl cursor-pointer ${view === "feed"
                            ? "text-green-600 bg-green-50"
                            : "text-gray-600 hover:text-black"
                        }`}
                    style={{ fontFamily: "'OpenRunde', sans-serif" }}
                >
                    Feed
                </button>
            </div>
        </div>
    );
}

export default HamburgerModal;