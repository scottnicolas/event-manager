import { Link } from "react-router-dom";

const events = [
  {
    id: 1,
    name: "Music Concert",
    date: "2025-05-15",
    location: "Arena",
    ticketsAvailable: 50,
  },
  {
    id: 2,
    name: "Tech Conference",
    date: "2025-06-10",
    location: "Convention Center",
    ticketsAvailable: 200,
  },
  {
    id: 3,
    name: "Art Expo",
    date: "2025-07-25",
    location: "Gallery",
    ticketsAvailable: 30,
  },
  {
    id: 4,
    name: "Sports Game",
    date: "2025-08-20",
    location: "Stadium",
    ticketsAvailable: 100,
  },
  // Add more events here
];

export const BentoEvents = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white border border-stone-900 shadow-lg rounded-lg p-4 flex flex-col space-y-4"
        >
          <h2 className="text-lg font-semibold text-gray-800">{event.name}</h2>
          <p className="text-sm text-gray-500">{event.date}</p>
          <p className="text-sm text-gray-500">{event.location}</p>
          <p className="text-sm text-gray-600">
            Tickets Available: {event.ticketsAvailable}
          </p>
          <Link key={event.id} to={`/events/${event.id}`}>
            <button className="self-start bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400">
              View Event
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};
