import React from "react";
import "./App.css";
import "./index.css";
import { useState, useEffect } from "react";
import HomePage from "./components/HomePage.jsx";
import FormModal from "./components/FormModal.jsx";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
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
    if (newItem.username) {
      setUsername(newItem.username);
    }
    setItems((prev) => [newItem, ...prev]);
    setView("feed");
  };

  const deleteFindItem = (idToDelete) => {
    setItems((prev) => prev.filter((item) => item.id !== idToDelete));
  };
  return (
    <>
      <div style={{ fontFamily: "'OpenRunde', sans-serif" }}>
        <HomePage
          setModalOpen={setModalOpen}
          items={items}
          view={view}
          setView={setView}
          username={username}
          onDeleteFind={deleteFindItem}
        />
        {modalOpen && (
          <FormModal
            setModalOpen={setModalOpen}
            onAddFind={addFindItem}
            username={username}
          />
        )}
      </div>
    </>
  );
}

export default App;
