import { useState, useEffect, useRef } from "react";

function AddFindModal({ setModalOpen, onAddFind, onUpdateFind, editingItem, username }) {
  const isEditing = Boolean(editingItem);
  const [imageUrl, setImageUrl] = useState(editingItem?.image || "");
  const [formData, setFormData] = useState({
    username: editingItem?.username || "",
    title: editingItem?.title || "",
    type: editingItem?.type || "Music",
    description: editingItem?.description || "",
  });

  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

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

  // Handle Image Selection from Device File Explorer
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
    }
  };

  // Universal Clipboard Item Processor
  const processClipboardItems = (items) => {
    if (!items) return false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const objectUrl = URL.createObjectURL(blob);
          setImageUrl(objectUrl);
          return true;
        }
      }
    }
    return false;
  };

  // Handle Global Image Paste (Ctrl+V / Mobile Clipboard Paste)
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (processClipboardItems(items)) {
        e.preventDefault();
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  // Explicit Mobile Paste Button Handler using Clipboard API
  const handleMobilePasteClick = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.read) {
        const clipboardItems = await navigator.clipboard.read();
        for (const clipboardItem of clipboardItems) {
          const imageType = clipboardItem.types.find(type => type.startsWith("image/"));
          if (imageType) {
            const blob = await clipboardItem.getType(imageType);
            const objectUrl = URL.createObjectURL(blob);
            setImageUrl(objectUrl);
            return;
          }
        }
        alert("No image found on your clipboard. Please copy an image first!");
      } else {
        alert("Please long-press and paste your image directly into the modal.");
      }
    } catch (err) {
      alert("Please long-press the upload box to paste your copied image.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const needsUsername = !username && !isEditing;
    const validUsername = !needsUsername || formData.username.trim().length > 0;
    const validTitle = formData.title.trim().length > 0;

    if (!validUsername || !validTitle) {
      return;
    }

    const payload = {
      ...formData,
      username: isEditing
        ? editingItem.username
        : needsUsername
          ? formData.username.trim()
          : username,
      title: formData.title.trim(),
      image: imageUrl.trim() || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60",
    };

    if (isEditing) {
      onUpdateFind({ ...editingItem, ...payload });
    } else {
      onAddFind({ id: Date.now(), ...payload });
    }

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
          className="w-full max-w-md max-h-[85vh] rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden border border-gray-100"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
            <h2
              id="modal-title"
              className="text-xl font-bold text-green-600"
              style={{ fontFamily: "'OpenRunde', sans-serif" }}
            >
              {isEditing ? "Edit your Find" : "Share your Find"}
            </h2>
            <button
              onClick={() => setModalOpen(false)}
              className="text-2xl font-semibold text-gray-400 hover:text-black transition-colors p-1"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <form id="find-form" className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-left" onSubmit={handleSubmit}>

            {!username && !isEditing && (
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

            {/* Responsive Image Upload & Paste Section */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                {/* Mobile paste button visible only on smaller screens */}
                <button
                  type="button"
                  onClick={handleMobilePasteClick}
                  className="md:hidden text-xs font-bold text-green-600 hover:text-green-700 bg-green-50 px-2 py-1 rounded-md transition-colors"
                >
                  📋 Paste Image
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-green-50/30 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all"
              >
                {imageUrl ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-28 rounded-lg overflow-hidden border border-gray-200 shadow-xs bg-white">
                      <img
                        src={imageUrl}
                        alt="Uploaded Preview"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <span className="text-xs font-semibold text-green-600">Click or Paste to change image</span>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'OpenRunde', sans-serif" }}>
                      Tap to upload from device
                    </p>
                    {/* Responsive text: Ctrl+V for desktop, tap/paste note for mobile */}
                    <p className="text-xs text-gray-400 mt-0.5">
                      <span className="hidden md:inline">or press <span className="font-bold text-gray-600">Ctrl+V</span> to paste screenshot</span>
                      <span className="md:hidden">or long-press to paste copied image</span>
                    </p>
                  </div>
                )}
              </div>
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
              type="submit"
              form="find-form"
              className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 shadow-sm transition-colors"
              style={{ fontFamily: "'OpenRunde', sans-serif" }}
            >
              {isEditing ? "Save Changes" : "Submit Find"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default AddFindModal;