// ✅ EventDetails.tsx updated: no event_id in Sponsor; filtering logic removed
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventById } from "../services/eventService";
import { fetchHosts } from "../services/hostService";
import { fetchVenues } from "../services/venueService";
import { fetchSponsors } from "../services/sponsorService";

export const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [host, setHost] = useState<any>(null);
  const [venue, setVenue] = useState<any>(null);
  const [sponsors, setSponsors] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    const eventId = Number(id);
    fetchEventById(eventId).then(setEvent);
    fetchHosts().then((hosts) => {
      const h = hosts.find((h) => h.event === eventId);
      setHost(h);
      if (h) {
        fetchVenues().then((venues) => {
          const v = venues.find((v) => v.venue_id === h.venue);
          setVenue(v);
        });
      }
    });
    fetchSponsors().then(setSponsors); // no filtering since Sponsor lacks event_id
  }, [id]);

  if (!event) return <p className="p-4">Loading event details...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{event.event_name}</h1>
      <div className="bg-white shadow rounded p-4 space-y-2">
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(event.start_date).toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {event.end_date ? new Date(event.end_date).toLocaleDateString() : "-"}
        </p>
        <p>
          <strong>Venue:</strong> {venue ? `Venue ${venue.venue_id}` : "-"}
        </p>
        <p>
          <strong>Host:</strong>{" "}
          {host ? `Host for Venue ${host.venue_id}` : "-"}
        </p>
        <p>
          <strong>Sponsors:</strong>{" "}
          {sponsors.length > 0
            ? sponsors.map((s) => `Sponsor ${s.sponsor_id}`).join(", ")
            : "-"}
        </p>
      </div>
    </div>
  );
};

export default EventDetails;
