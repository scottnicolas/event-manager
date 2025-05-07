// ✅ EventDetailsPage.tsx: displays details for an individual event like a dashboard (with type-safe setVenue)
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Event } from "../types/Event";
import { Venue } from "../types/Venue";
import { fetchEvents } from "../services/eventService";
import { fetchVenues } from "../services/venueService";
import { fetchHosts } from "../services/hostService";
import { fetchRegistrations } from "../services/registrationService";
import { FiAtSign, FiInfo, FiPhone, FiUser, FiUsers } from "react-icons/fi";
import { User } from "../types/User";
import { fetchUsers } from "../services/userService";
import { Registration } from "../types/Registration";

export const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [attendees, setAttendees] = useState<Registration[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [events, venues, hosts, registrations] = await Promise.all([
          fetchEvents(),
          fetchVenues(),
          fetchHosts(),
          fetchRegistrations(),
        ]);

        const foundEvent = events.find((e) => e.event_id === Number(eventId));

        setEvent(foundEvent || null);

        const host = hosts.find((h) => h.event === Number(eventId));
        const foundVenue = host
          ? venues.find((v) => v.venue_id === host.venue) ?? null
          : null;
        setVenue(foundVenue);

        const usersData = await fetchUsers();
        setUsers(usersData);

        const eventAttendees = registrations.filter(
          (r) => r.event === Number(eventId)
        );
        setAttendees(eventAttendees);
      } catch (err) {
        console.error("Error loading event details:", err);
        setEvent(null);
      }
    };

    loadData();
  }, [eventId]);

  if (event === null) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="pb-2 p-4 lg:mx-28">
      <h1 className="text-4xl font-bold mb-2">{event.event_name}</h1>
      <p className="text-stone-500 mb-4">
        Category: {event.event_category || "N/A"}
      </p>

      {/* info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Details */}
        <div>
          <div className="m-2 flex items-center">
            <FiInfo />
            <h2 className="text-xl pl-2 font-bold">Details</h2>
          </div>
          <div className="border border-stone-200 p-4 rounded-lg">
            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(event.start_date).toLocaleString()}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {event.end_date
                ? new Date(event.end_date).toLocaleString()
                : "N/A"}
            </p>
            <p>
              <strong>Max Attendees:</strong> {event.max_attendees}
            </p>
            <p>
              <strong>Current Attendees:</strong> {attendees.length}
            </p>
          </div>
        </div>
        {/* Location */}
        <div>
          <h2 className="text-xl m-2 font-bold">📍&nbsp;Location</h2>
          <div className="border border-stone-200 p-4 rounded-lg">
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
      </div>
      {/* Add more panels here for sponsors, tickets, etc. if needed */}

      {/* Attendees */}
      <div>
        <div className="p-2 pt-4 flex items-center">
          <FiUsers />
          <h2 className="text-xl pl-2 font-bold">Attendees</h2>
        </div>
        {attendees.length > 0 ? (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="p-2 border-b border-stone-300 text-stone-400 text-left">
                  <div className="inline-flex items-center">
                    <FiUser />
                    <span className="pl-1">Name</span>
                  </div>
                </th>
                <th className="p-2 text-stone-400 text-left">
                  <div className="inline-flex items-center">
                    <FiAtSign />
                    <span className="pl-1">Email</span>
                  </div>
                </th>
                <th className="p-2 border-b border-stone-300 text-stone-400 text-left">
                  <div className="inline-flex items-center">
                    <FiPhone />
                    <span className="pl-1">Number</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((reg: Registration, i: number) => {
                const user = users.find((u) => u.user_id === reg.user);
                return (
                  <tr key={i}>
                    <td className="border-b border-r border-stone-300 p-2">
                      {user
                        ? `${user.first_name} ${user.last_name}`
                        : "Unknown"}
                    </td>
                    <td className="border-t border-b border-stone-300 p-2">
                      {user?.email || "-"}
                    </td>
                    <td className="border-l border-b border-stone-300 p-3 flex gap-2">
                      {user?.phone_number || "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No users have registered for this event.</p>
        )}
      </div>
    </div>
  );
};
