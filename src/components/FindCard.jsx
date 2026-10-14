import { useState, useEffect, useRef } from "react";

function FindCard({ item, onDeleteFind, onEditFind }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleEdit = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    onEditFind(item);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    if (confirm("Do you want to delete this find?")) {
      onDeleteFind(item.id);
    }
  };

  return (
    <div className="flex-none w-72 flex flex-col items-center gap-y-2 group cursor-pointer text-center">
      <div className="w-full max-h-96 rounded-xl overflow-hidden relative bg-gray-50 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-auto object-contain group-hover:scale-101 transition-transform duration-300 rounded-xl"
        />

        <div ref={menuRef} className="absolute top-3 right-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((open) => !open);
            }}
            className={`bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold transition-opacity duration-200 cursor-pointer backdrop-blur-xs hover:bg-black/80 ${
              menuOpen ? "opacity-100" : "opacity-100 md:opacity-0 md:group-hover:opacity-100"
            }`}
            title="Options"
          >
            •••
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-10 text-left">
              <button
                onClick={handleEdit}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <h4 className="text-lg font-bold text-gray-900 truncate w-full px-2 mt-1">
        {item.title}
      </h4>
      <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed max-w-[90%]">
        {item.description}
      </p>
    </div>
  );
}

export default FindCard;
