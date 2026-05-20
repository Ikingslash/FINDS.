function HamburgerModal({ setMenuOpen }) {
    return (
        <div className="md:hidden fixed inset-0 bg-white z-50">
            <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-6 text-3xl text-gray-700"
            >
                ✕
            </button>
            <div className="flex flex-col pt-20 px-6 gap-6 text-xl" style={{ fontFamily: "'OpenRunde', sans-serif" }}>

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