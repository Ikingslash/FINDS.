import { useState, useEffect, useRef } from "react";

function FormModal({ setModalOpen, onAddFind, username }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      ...formData,
    };
    onAddFind(newItem);

    setFormData({ username: "", title: "", type: "Music", description: "" });
    setModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
        <div
          ref={modalRef}
          className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h2
              className="text-2xl font-bold text-green-600"
              style={{ fontFamily: "'OpenRunde', sans-serif" }}
            >
              Share your Find
            </h2>
            <button
              onClick={() => setModalOpen(false)}
              className="text-2xl font-semibold text-gray-500 hover:text-black"
            >
              ×
            </button>
          </div>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {!username && (
              <div className="mb-4 text-left">
                <label className="block text-sm font-medium text-black mb-2">
                  Username
                </label>
                <input
                  ref={inputRef} // Automatically focuses here on landing page!
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required={!username} // Only required if we don't have a username yet
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-600"
                  placeholder="Enter your name..."
                />
              </div>
            )}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-black"
              >
                Name of Find.
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Vintage Camera"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600"
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="mb-2 block text-sm font-medium text-black"
              >
                Category
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600"
              >
                <option>Music</option>
                <option>Movies & TV</option>
                <option>Books</option>
                <option>Art</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-black"
              >
                What makes this special?
              </label>
              <textarea
                id="description"
                rows="4"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Tell people about this find..."
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600"
              ></textarea>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-5 py-3 font-medium"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                Submit Find
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormModal;
