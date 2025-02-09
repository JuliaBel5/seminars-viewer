import { useState, useEffect } from "react";
import { Seminar } from "../types/seminarType";
import { toast } from "react-toastify";
import { ErrorMessages, FormConstants } from "../utils/constants";

const API_URL = "http://localhost:3001/seminars"; // в реальном проекте хранила бы в .env. файле

export function useSeminars() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSeminars() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(ErrorMessages.uploadError);
        }
        const data: Seminar[] = await response.json();
        setSeminars(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchSeminars();
  }, []);

  async function deleteSeminar(id: string) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(ErrorMessages.deleteError);
      }
      setSeminars((prev) => prev.filter((seminar) => seminar.id !== id));
      toast.success(FormConstants.deleteSuccess);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function updateSeminar(updatedSeminar: Seminar) {
    try {
      const response = await fetch(`${API_URL}/${updatedSeminar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSeminar),
      });

      if (!response.ok) {
        throw new Error(ErrorMessages.refreshError);
      }

      setSeminars((prev) =>
        prev.map((seminar) =>
          seminar.id === updatedSeminar.id ? updatedSeminar : seminar
        )
      );
      toast.success(FormConstants.confirmEditMessage);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return { seminars, loading, error, deleteSeminar, updateSeminar };
}
