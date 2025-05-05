// ✅ EventDetailsPage.tsx: displays details for an individual event like a dashboard (with type-safe setVenue)
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Event } from "../types/Event";
import { Venue } from "../types/Venue";
import { Host } from "../types/Host";
import { Registration } from "../types/Registration";
import { fetchEvents } from "../services/eventService";
import { fetchVenues } from "../services/venueService";
import { fetchHosts } from "../services/hostService";
import { fetchRegistrations } from "../services/registrationService";

export const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [attendees, setAttendees] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      const [events, venues, hosts, registrations] = await Promise.all([
        fetchEvents(),
        fetchVenues(),
        fetchHosts(),
        fetchRegistrations(),
      ]);

      const foundEvent =
        events.find((e) => e.event_id === Number(eventId)) ?? null;
      setEvent(foundEvent);

      const host = hosts.find((h) => h.event === Number(eventId));
      const foundVenue = host
        ? venues.find((v) => v.venue_id === host.venue) ?? null
        : null;
      setVenue(foundVenue);

      const attendeeCount = registrations.filter(
        (r) => r.event === Number(eventId)
      ).length;
      setAttendees(attendeeCount);
    };

    loadData();
  }, [eventId]);

  if (!event) {
    return <div className="p-4">Event not found.</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4">
        <Link to="/events" className="text-violet-600 underline">
          ← Back to Events
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-2">{event.event_name}</h1>
      <p className="text-stone-600 mb-4">
        Category: {event.event_category || "N/A"}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-lg shadow">
          <h2 className="font-semibold text-lg mb-2">Details</h2>
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(event.start_date).toLocaleString()}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {event.end_date ? new Date(event.end_date).toLocaleString() : "N/A"}
          </p>
          <p>
            <strong>Max Attendees:</strong> {event.max_attendees}
          </p>
          <p>
            <strong>Current Attendees:</strong> {attendees}
          </p>
        </div>
        <div className="border p-4 rounded-lg shadow">
          <h2 className="font-semibold text-lg mb-2">Venue</h2>
          {venue ? (
            <>
              <p>{venue.street}</p>
              <p>
                {venue.city}, {venue.state} {venue.zip_code}
              </p>
              <p>Phone: {venue.phone_number}</p>
            </>
          ) : (
            <p>No venue assigned.</p>
          )}
        </div>
      </div>
      {/* Add more panels here for sponsors, tickets, etc. if needed */}
    </div>
  );
};

export default EventDetailsPage;
