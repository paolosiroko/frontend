"use client";
import { useEffect, useState } from "react";

export default function QueryHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("queryHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("queryHistory");
      if (stored) setHistory(JSON.parse(stored));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-2xl font-semibold text-gray-800 flex justify-between items-center"
      >
        Query History
      </button>
      {isOpen && (
        <div className="mt-4 max-h-64 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-gray-600">No queries yet.</p>
          ) : (
            <ul className="space-y-2">
              {history.map((query, index) => (
                <li key={index} className="text-gray-600 p-3 bg-gray-50 rounded-lg">
                  {query}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}