// ✅ Example integration: using CRUD services in EventList to delete an event and refresh list
import React, { useEffect, useState } from "react";
import { Event } from "../types/Event";
import { fetchEvents, deleteEvent } from "../services/eventService";
import { Link } from "react-router-dom";
import { FiCalendar, FiEdit, FiList } from "react-icons/fi";

export const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const loadEvents = async () => {
    setLoading(true);
    const data = await fetchEvents();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
      await loadEvents();
    }
  };

  return (
    <div className="pb-2 lg:px-28">
      <h1 className="text-4xl font-bold py-6">Events</h1>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="p-2 border-b border-stone-300 text-stone-400 text-left">
                <div className="inline-flex items-center">
                  <FiList />
                  <span className="pl-1">Event</span>
                </div>
              </th>
              <th className="p-2 text-stone-400 text-left">
                <div className="inline-flex items-center">
                  <FiCalendar />
                  <span className="pl-1">Start Date</span>
                </div>
              </th>
              <th className="p-2 border-b border-stone-300 text-stone-400 text-left">
                <div className="inline-flex items-center">
                  <FiEdit />
                  <span className="pl-1">Actions</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.event_id}>
                <td className=" border-b border-r border-stone-300 p-2">
                  {event.event_name}
                </td>
                <td className="border-t border-b border-stone-300 p-2">
                  {new Date(event.start_date).toLocaleDateString()}
                </td>
                <td className="border-l border-b border-stone-300 p-2 flex gap-2">
                  <Link
                    to={`/events/${event.event_id}`}
                    className="text-blue-600 underline"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(event.event_id)}
                    className="text-red-600 underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventList;

// ✅ Now EventList uses fetchEvents + deleteEvent from services, deletes with confirmation and reloads
