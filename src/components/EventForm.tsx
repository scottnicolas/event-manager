import React, { useState, useEffect } from "react";
import { Event } from "../types/Event";

interface EventFormProps {
  event?: Event | null;
  onSubmit: (event: Omit<Event, "event_id">) => void;
  onClose: () => void;
}

interface EventFormState {
  event_name: string;
  start_date: string;
  end_date: string;
  event_category: string;
  max_attendees: number;
}

export const EventForm: React.FC<EventFormProps> = ({
  event,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<EventFormState>({
    event_name: "",
    start_date: "",
    end_date: "",
    event_category: "",
    max_attendees: 0,
  });

  useEffect(() => {
    if (event) {
      setFormData({
        event_name: event.event_name,
        start_date: event.start_date,
        end_date: event.end_date ?? "",
        event_category: event.event_category ?? "",
        max_attendees: event.max_attendees,
      });
    }
  }, [event]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "max_attendees" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {event ? "Edit Event" : "Create Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Event Name</label>
            <input
              type="text"
              name="event_name"
              value={formData.event_name}
              onChange={handleChange}
              className="input text-white input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="datetime-local"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="input text-white input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">End Date</label>
            <input
              type="datetime-local"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="input text-white input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Category</label>
            <input
              type="text"
              name="event_category"
              value={formData.event_category}
              onChange={handleChange}
              className="input text-white input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Max Attendees</label>
            <input
              type="number"
              name="max_attendees"
              value={formData.max_attendees}
              onChange={handleChange}
              className="input text-white input-bordered w-full"
              min={1}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
