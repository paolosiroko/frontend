import { useEffect, useState } from "react";

interface QueryFormProps {
  onSubmit: (question: string) => void;
  loading: boolean;
}

export default function QueryForm({ onSubmit, loading }: QueryFormProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      // Save to localStorage for QueryHistory
      const history = JSON.parse(localStorage.getItem("queryHistory") || "[]");
      localStorage.setItem("queryHistory", JSON.stringify([...history, question]));
      onSubmit(question);
      setQuestion("");
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="question" className="block text-lg font-semibold text-gray-800">
          Ask Your Travel Question
        </label>
        <textarea
          id="question"
          className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-y"
          rows={5}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="E.g., What documents do I need to travel from Kenya to Ireland?"
          disabled={loading}
        />
        <button
          type="submit"
          className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading && <span className="spinner"></span>}
          {loading ? "Processing..." : "Ask Now"}
        </button>
      </form>
    </div>
  );
}