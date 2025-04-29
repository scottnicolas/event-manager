import React, { useEffect, useState } from "react";
import api from "../api/api";

type EventType = {
  id?: string;
  title: string;
  description: string;
  budget: number;
  guests: number;
};

type EventFormProps = {
  initialData?: EventType;
  onSuccess: () => void;
};

export const EventForm: React.FC<EventFormProps> = ({
  initialData,
  onSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState(0);
  const [guests, setGuests] = useState(0);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setBudget(initialData.budget);
      setGuests(initialData.guests);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        // UPDATE (PUT or PATCH)
        await api.put(`/events/${initialData.id}/`, {
          title,
          description,
          budget,
          guests,
        });
      } else {
        // CREATE (POST)
        await api.post(`/events/`, {
          title,
          description,
          guests,
          budget,
        });
      }
      onSuccess(); // Let parent know we're done
    } catch (error) {
      console.error("Error submitting event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        {loading ? "Saving..." : initialData ? "Update Event" : "Create Event"}
      </button>
    </form>
  );
};
