// ✅ Updated Home.tsx to match new services and types
import React, { useEffect, useState } from "react";
import { fetchEvents } from "../services/eventService";
import { fetchUsers } from "../services/userService";
import { fetchVenues } from "../services/venueService";
import { Event } from "../types/Event";
import { FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";

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
    <div className="pb-2 lg:mx-48">
      <div className="m-2 mb-4">
        <h1 className="text-xl font-bold">
          👋&nbsp;&nbsp;Welcome to your Event Management Dashboard!
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border border-stone-200 shadow-accent rounded-lg p-4 text-center">
          <p className="text-lg">Total Events</p>
          <p className="text-3xl font-semibold">{eventCount}</p>
        </div>
        <div className="border border-stone-200 rounded-lg p-4 text-center">
          <p className="text-lg">Registered Users</p>
          <p className="text-3xl font-semibold">{userCount}</p>
        </div>
        <div className="border border-stone-200 rounded-lg p-4 text-center">
          <p className="text-lg">Venues</p>
          <p className="text-3xl font-semibold">{venueCount}</p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="m-2 flex items-center">
        <FiCalendar />
        <h2 className="text-xl pl-2 font-bold">Upcoming Events</h2>
      </div>

      <div className="border border-stone-200 rounded-lg p-6 lg:px-12">
        {upcomingEvents.length === 0 ? (
          <p className="text-gray-500">No upcoming events.</p>
        ) : (
          <ul className="space-y-1">
            {upcomingEvents.map((event) => (
              <li
                key={event.event_id}
                className="grid grid-cols-3 lg:grid-cols-7 items-top py-1"
              >
                <span className="text-xs col-span-1 text-gray-500">
                  {new Date(event.start_date)
                    .toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                    .replace(",", "")}
                </span>

                <Link
                  to={`/events/${event.event_id}`}
                  className="hover:bg-stone-100 hover:cursor-pointer inline-flex items-center col-span-2 lg:col-span-6 rounded-md text-left px-1 py-1 ml-6"
                >
                  <div className="w-1 h-full mr-3 bg-blue-400 rounded-lg"></div>
                  <span>{event.event_name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
