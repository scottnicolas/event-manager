import React from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "./Card";
import { Dashboard } from "./Dashboard/Dashboard";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  budget: number;
  guests: number;
}

export const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  // Hardcoded events (replace with fetched data)
  const events: Event[] = [
    {
      id: 1,
      title: "Tech Conference",
      description: "This is event one.",
      date: "04/28/2025",
      budget: 450,
      guests: 35,
    },
    {
      id: 2,
      title: "UHH Computer Science Fundraiser",
      description: "This is event two.",
      date: "04/28/2025",
      budget: 200,
      guests: 50,
    },
    {
      id: 3,
      title: "UHH Hackathon",
      description: "This is event three.",
      date: "04/29/2025",
      budget: 200,
      guests: 75,
    },
  ];

  const event = events.find((event) => event.id === parseInt(id || "0"));

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <>
      <Dashboard>
        <div className="py-0">
          <Link to="/eventsPage" className="text-blue-500">
            Back to Events
          </Link>

          {/* grid container */}
          <div className="grid md:grid-cols-4 grid-cols-2 h-full w-full gap-2">
            {/* Main display */}
            <div className="p-2 overflow-x-clip text-wrap col-span-2 row-span-2 md:col-span-1 border border-stone-900 bg-orange-300 rounded-lg shadow">
              <h1 className="font-bold text-center object-center text-2xl lg:text-3xl">
                {event.title}
              </h1>
            </div>

            {/* Overview */}
            <div className=" bg-blue-300 border border-stone-900 p-3 col-span-3 row-span-1 rounded-lg shadow">
              <div className="grid grid-cols-4">
                <div>
                  <p className="font-bold">Budget</p>
                  <p className="text-xl pt-4 text-stone-900">{`$${event.budget}`}</p>
                </div>
                <div>
                  <p className="font-bold">Guests</p>
                  <p className="text-xl pt-4 text-stone-900">{`${event.guests}`}</p>
                </div>
                <p className="font-bold">Time</p>
                <div>
                  <p className="font-bold">Date</p>
                  <p className="text-xl pt-4 text-stone-900">{`${event.date}`}</p>
                </div>
              </div>
            </div>

            {/* Attendees */}
            <div className="bg-teal-300 border col-span-3 border-stone-900 shadow rounded-lg p-3">
              <h1 className="font-bold text-lg">Attendees</h1>
              <thead>hello</thead>
              <tbody>hello</tbody>
              <tr>hello</tr>
            </div>

            {/* Add more details here as needed */}
            <div className="bg-cyan-300 border border-stone-900 p-3 rounded-lg shadow">
              <p className="py-0">
                <strong className="text-lg font-bold">Details</strong>{" "}
                Additional details for the event can go here.
              </p>
            </div>

            {/* Location/Venue */}
            <div></div>
          </div>
        </div>
      </Dashboard>
    </>
  );
};
