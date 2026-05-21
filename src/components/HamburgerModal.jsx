function HamburgerModal({ setMenuOpen }) {
    return (
        <div className="md:hidden fixed inset-0 bg-white z-50">
            <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-6 text-3xl text-gray-700 "
            >
                ✕
            </button>
            <div className="flex flex-col pt-20 px-6 gap-6 text-xl" style={{ fontFamily: "'OpenRunde', sans-serif" }}>
                <form className="w-full">
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

                <div className="py-3 hover:bg-gray-50 cursor-pointer text-gray-700">
                    Home
                </div>

                <div className="py-3 hover:bg-gray-50 cursor-pointer text-gray-700">
                    About
                </div>

            </div>
        </div>
    );
}

export default HamburgerModal;