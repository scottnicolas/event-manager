// ✅ Updated Home.tsx to match new services and types
import React, { useEffect, useState } from "react";
import { fetchEvents } from "../services/eventService";
import { fetchUsers } from "../services/userService";
import { fetchVenues } from "../services/venueService";
import { Event } from "../types/Event";

export const Home: React.FC = () => {
  const [eventCount, setEventCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [venueCount, setVenueCount] = useState<number>(0);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents().then((events) => {
      setEventCount(events.length);
      const upcoming = events
        .filter((e) => new Date(e.start_date) > new Date())
        .sort(
          (a, b) =>
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
      setUpcomingEvents(upcoming);
    });

    fetchUsers().then((users) => setUserCount(users.length));
    fetchVenues().then((venues) => setVenueCount(venues.length));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to the Event Management Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-lg font-semibold">Total Events</p>
          <p className="text-3xl font-bold">{eventCount}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-lg font-semibold">Registered Users</p>
          <p className="text-3xl font-bold">{userCount}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-lg font-semibold">Venues</p>
          <p className="text-3xl font-bold">{venueCount}</p>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">Upcoming Events</h2>
        {upcomingEvents.length === 0 ? (
          <p className="text-gray-500">No upcoming events.</p>
        ) : (
          <ul className="space-y-1">
            {upcomingEvents.map((event) => (
              <li
                key={event.event_id}
                className="flex justify-between items-center border-b py-1"
              >
                <span>{event.event_name}</span>
                <span className="text-sm text-gray-500">
                  {new Date(event.start_date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
