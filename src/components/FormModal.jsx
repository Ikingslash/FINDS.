import { useState, useEffect, useRef } from "react";

function FormModal({ setModalOpen, onAddFind, username }) {
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    title: "",
    type: "Music",
    description: "",
  });

  const modalRef = useRef(null);
  const inputRef = useRef(null);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setModalOpen]);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setModalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      ...formData,
      image: imageUrl.trim() || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60",
    };
    onAddFind(newItem);
    setFormData({ username: "", title: "", type: "Music", description: "" });
    setModalOpen(false);
    setImageUrl("");
  };

  return (
    <>

      <div
        className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50 animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          ref={modalRef}

          className="w-full max-w-md max-h-[80vh] rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden border border-gray-100"
        >


          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
            <h2
              id="modal-title"
              className="text-xl font-bold text-green-600"
              style={{ fontFamily: "'OpenRunde', sans-serif" }}
            >
              Share your Find
            </h2>
            <button
              onClick={() => setModalOpen(false)}
              className="text-2xl font-semibold text-gray-400 hover:text-black transition-colors p-1"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>


          <form className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-left" onSubmit={handleSubmit}>

            {!username && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Username
                </label>
                <input
                  ref={inputRef}
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required={!username}
                  className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-2.5 outline-none text-sm text-gray-800 focus:border-green-600 focus:bg-white transition-all"
                  placeholder="Enter your name..."
                />
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
                Name of Find
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Vintage Camera"
                required
                className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-2.5 outline-none text-sm text-gray-800 focus:border-green-600 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1.5">
                Category
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-2.5 outline-none text-sm text-gray-800 focus:border-green-600 focus:bg-white transition-all cursor-pointer"
              >
                <option>Music</option>
                <option>Movies & TV</option>
                <option>Books</option>
                <option>Art</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="image-url" className="block text-sm font-medium text-gray-700 mb-1.5">
                Paste an Image URL of your Find
              </label>
              <input
                type="url"
                id="image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-2.5 outline-none text-sm text-gray-800 focus:border-green-600 focus:bg-white transition-all"
                placeholder="Paste web link to image..."
              />


              {imageUrl.trim() && (
                <div className="w-full flex flex-col items-center gap-1 mt-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Preview Cover</span>
                  <div className="w-24 h-32 rounded-lg overflow-hidden border border-gray-200 shadow-xs bg-white">
                    <img
                      src={imageUrl}
                      alt="Form Live Preview"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=500";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
                What makes this special?
              </label>
              <textarea
                id="description"

                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Tell people about this find..."
                className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-2.5 outline-none text-sm text-gray-800 focus:border-green-600 focus:bg-white transition-all resize-none"
              ></textarea>
            </div>

            <input type="submit" className="hidden" />
          </form>

          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <button
              type="button"
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              style={{ fontFamily: "'OpenRunde', sans-serif" }}
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"

              onClick={handleSubmit}
              className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 shadow-sm transition-colors"
              style={{ fontFamily: "'OpenRunde', sans-serif" }}
            >
              Submit Find
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default FormModal;