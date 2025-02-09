"use client"; // Ensures this runs in the browser

import { useState } from "react";

export default function RunWay() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const runn = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/runway", { method: "POST" });
      const data = await response.json();

      if (data.success) {
        setMessage("Admin created successfully!");
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (error) {
      setMessage("Request failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={runn} disabled={loading}>
        {loading ? "Running..." : "Run"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
