import { useEffect, useState } from "react";
import { fetchEvents } from "../services/eventService";
import { Event } from "../types/Event";
import { Link } from "react-router-dom";

export const DemoEventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error loading events:", error);
      });
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        {events.length === 0 ? (
          <p>Loading events...</p>
        ) : (
          events.map((event) => (
            <Link key={event.event_id} to={`/events/${event.event_id}`}>
              <div className="bg-white rounded-lg border border-stone-300 shadow p-4">
                <h3 className="text-lg font-bold">{event.event_name}</h3>
                <p className="text-sm text-gray-600">{event.start_date}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};
