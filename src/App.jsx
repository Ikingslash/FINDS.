import React from "react";
import "./App.css";
import "./index.css";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage.jsx";
import AddFindModal from "./components/AddFindModal.jsx";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [view, setView] = useState("home");
  const [username, setUsername] = useState("");
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addFindItem = (newItem) => {
    if (!newItem || !newItem.title || !newItem.title.trim()) {
      return;
    }
    if (newItem.username) {
      setUsername(newItem.username);
    }
    setItems((prev) => [newItem, ...prev]);
    setView("feed");
  };

  const deleteFindItem = (idToDelete) => {
    setItems((prev) => prev.filter((item) => item.id !== idToDelete));
  };

  const updateFindItem = (updatedItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const openAddModal = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  return (
    <>
      <div style={{ fontFamily: "'OpenRunde', sans-serif" }}>
        <HomePage
          setModalOpen={openAddModal}
          items={items}
          view={view}
          setView={setView}
          username={username}
          onDeleteFind={deleteFindItem}
          onEditFind={openEditModal}
        />
        {modalOpen && (
          <AddFindModal
            setModalOpen={setModalOpen}
            onAddFind={addFindItem}
            onUpdateFind={updateFindItem}
            editingItem={editingItem}
            username={username}
          />
        )}
      </div>
    </>
  );
}

export default App;
