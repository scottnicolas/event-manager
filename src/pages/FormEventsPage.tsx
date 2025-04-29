import React, { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { EventForm } from "../components/EventForm";
import api from "../api/api";

type EventType = {
  id: string;
  title: string;
  description: string;
  budget: number;
  guests: number;
};

export const FormEventsPage = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventType | undefined>(
    undefined
  );

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events/");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddClick = () => {
    setEditingEvent(undefined);
    setIsModalOpen(true);
  };

  const handleEditClick = (event: EventType) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchEvents(); // refresh events after add/edit
  };

  return (
    <div className="p-4">
      <button
        onClick={handleAddClick}
        className="bg-green-600 text-white p-2 rounded"
      >
        Add New Event
      </button>

      <div className="grid grid-cols-1 gap-4 mt-4">
        {events.map((event) => (
          <div>
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p>{event.description}</p>
            <button
              onClick={() => handleEditClick(event)}
              className="text-blue-600 mt-2"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EventForm initialData={editingEvent} onSuccess={handleSuccess} />
      </Modal>
    </div>
  );
};
