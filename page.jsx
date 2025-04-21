"use client";

import { useState } from "react";
import { FaBoxOpen, FaBullhorn } from "react-icons/fa";

export default function HomePage() {
  const [lostItems, setLostItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [notification, setNotification] = useState("");

  const handleReportLost = () => {
    if (itemName && itemDesc) {
      const newItem = {
        id: Date.now(),
        name: itemName,
        description: itemDesc,
        found: false,
      };
      setLostItems([newItem, ...lostItems]);
      setItemName("");
      setItemDesc("");
    }
  };

  const handleMarkAsFound = (id) => {
    const updatedItems = lostItems.map((item) =>
      item.id === id ? { ...item, found: true } : item
    );
    setLostItems(updatedItems);
    setNotification("🎉 Someone has marked a lost item as FOUND!");
    setTimeout(() => setNotification(""), 5000);
  };

  return (
    <div className="min-h-screen text-black py-5 px-4 sm:px-6 bg-white">

      {/* Notification */}
      {notification && (
        <div className="max-w-2xl mx-auto bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded-xl mb-6 text-center font-semibold shadow">
          {notification}
        </div>
      )}

      {/* Lost Item Feed */}
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-3xl font-bold mb-4">🎒 Campus Lost & Found</h1>

        {lostItems.length === 0 ? (
          <div className="bg-yellow-50 p-6 rounded-2xl shadow-md border border-yellow-300">
            <p className="text-gray-700">📢 No lost items reported yet. Be the first to post!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {lostItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl shadow-md border ${
                  item.found ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
                }`}
              >
                <h3 className="text-lg font-bold">🧾 {item.name}</h3>
                <p className="text-gray-700">{item.description}</p>
                {!item.found ? (
                  <button
                    onClick={() => handleMarkAsFound(item.id)}
                    className="mt-2 text-sm bg-green-600 text-white py-1 px-3 rounded-xl hover:bg-green-700 transition"
                  >
                    I Found This!
                  </button>
                ) : (
                  <p className="text-green-700 font-medium mt-2">✅ Marked as Found</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Report Lost Item Panel */}
      <main className="max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Report a Lost Item</h2>

          <input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name (e.g. Wallet, Laptop)"
            className="w-full p-3 mb-4 border rounded-xl border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <textarea
            value={itemDesc}
            onChange={(e) => setItemDesc(e.target.value)}
            placeholder="Describe the item and where you lost it..."
            className="w-full p-3 mb-4 border rounded-xl border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
            rows={4}
          />

          <button
            onClick={handleReportLost}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-semibold"
          >
            <FaBullhorn className="inline-block mr-2" /> Post Lost Item
          </button>
        </div>
      </main>
    </div>
  );
}
