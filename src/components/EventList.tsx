// ✅ Updated EventList.tsx to use daisyUI 'table with border and background' template
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Event } from "../types/Event";
import { fetchEvents, deleteEvent } from "../services/eventService";
import { fetchHosts } from "../services/hostService";
import { fetchVenues } from "../services/venueService";
import EventForm from "./EventForm";

export const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [hosts, setHosts] = useState<any[]>([]);
  const [venues, setVenues] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadEvents = async () => {
    const data = await fetchEvents();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
    fetchHosts().then(setHosts);
    fetchVenues().then(setVenues);
  }, []);

  const getVenueDisplay = (eventId: number) => {
    const host = hosts.find((h) => h.event_id === eventId);
    const venue = host
      ? venues.find((v) => v.venue_id === host.venue_id)
      : null;
    return venue ? `Venue ${venue.venue_id}` : "-";
  };

  const getHostDisplay = (eventId: number) => {
    const host = hosts.find((h) => h.event_id === eventId);
    return host ? `Host for Venue ${host.venue_id}` : "-";
  };

  const handleDelete = async (id: number) => {
    await deleteEvent(id);
    loadEvents();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <button
          onClick={() => {
            setSelectedEvent(null);
            setShowForm(true);
          }}
          className="btn btn-primary"
        >
          + Add Event
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table bg-white border table-bordered rounded-lg table-base-100 w-full">
          <thead className="bg-base-200 rounded-lg">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>Venue</th>
              <th>Host</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.event_id}>
                <td>{event.event_id}</td>
                <td>
                  <Link
                    to={`/events/${event.event_id}`}
                    className="btn btn-sm btn-ghost text-primary"
                  >
                    {event.event_name}
                  </Link>
                </td>
                <td>{new Date(event.start_date).toLocaleDateString()}</td>
                <td>{getVenueDisplay(event.event_id)}</td>
                <td>{getHostDisplay(event.event_id)}</td>
                <td className="space-x-1">
                  <Link
                    to={`/events/${event.event_id}`}
                    className="btn btn-sm btn-ghost text-primary"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowForm(true);
                    }}
                    className="btn btn-sm btn-warning text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.event_id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <EventForm
          event={selectedEvent}
          onClose={() => {
            setShowForm(false);
            loadEvents();
          }}
        />
      )}
    </div>
  );
};

export default EventList;
