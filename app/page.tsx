"use client";
import { useState } from "react";
import QueryForm from "./components/QueryForm";
import ResponseDisplay from "./components/ResponseDisplay";
import QueryHistory from "./components/QueryHistory";

export default function Home() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (question: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://travel-assistant-backend.onrender.com/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Something went wrong");
      setResponse(data);
    } catch (err: unknown) {
      // Type assertion or check to safely access err.message
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-8 bg-gradient-to-r from-primary to-primary-dark text-white text-center">
        <div className="container">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Travel Assistant
          </h1>
          <p className="mt-2 text-lg opacity-80">
            Get instant travel advice powered by AI
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12">
        <div className="container space-y-8">
          {/* Query Form */}
          <QueryForm onSubmit={handleSubmit} loading={loading} />

          {/* Error Message */}
          {error && (
            <div className="alert">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          )}

          {/* Response Display */}
          {response && <ResponseDisplay response={response} />}

          {/* Query History */}
          <QueryHistory />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-secondary">
        <p>© 2025 Travel Assistant. All rights reserved.</p>
      </footer>
    </div>
  );
}