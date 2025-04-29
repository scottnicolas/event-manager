import React, { useEffect, useState } from "react";
import { fetchEvents } from "../api/events";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
}

export const DemoEventsPage = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Tech Conference",
      description: "This is event one.",
      date: "04/28/2025",
    },
    {
      id: 2,
      title: "UHH Computer Science Fundraiser",
      description: "This is event two.",
      date: "04/28/2025",
    },
    {
      id: 3,
      title: "UHH Hackathon",
      description: "This is event three.",
      date: "04/29/2025",
    },
  ]);

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
            <Link key={event.id} to={`/events/${event.id}`}>
              <Card
                key={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
              />
            </Link>
          ))
        )}
      </div>
    </>
  );
};
