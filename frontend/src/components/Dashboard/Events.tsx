import React from "react";
import { FiArrowUpRight, FiMoreHorizontal } from "react-icons/fi";
import { Link } from "react-router-dom";

const events = [
  {
    event: "UH Hilo Hackathon",
    budget: 450,
    guests: 20,
    date: "08/01/25",
    order: 1,
  },
];

export const Events = () => {
  return (
    <div className="col-span-12 p-3 rounded-lg border border-stone-300 shadow bg-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 text-lg font-bold">Events</h3>
        <button className="text-sm text-violet-500 hover:underline">
          <Link to="/EventsPage">See all</Link>
        </button>
      </div>
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          <TableRow
            event="Tech Conference"
            budget={450}
            guests={200}
            date="08/01/25 - 08/04/25"
            order={1}
          />
          <TableRow
            event="UHH Computer Science Fundraiser"
            budget={450}
            guests={20}
            date="08/15/25"
            order={2}
          />
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Event</th>
        <th className="text-start p-1.5">Budget</th>
        <th className="text-start p-1.5">Guests</th>
        <th className="text-start p-1.5">Date(s)</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  event,
  budget,
  guests,
  date,
  order,
}: {
  event: string;
  budget: number;
  guests: number;
  date: string;
  order: number;
}) => {
  return (
    <tr
      className={
        order % 2 ? "bg-stone-100 text-sm rounded-2xl shadow" : "text-sm"
      }
    >
      <td className="p-1.5">
        <a
          href="#"
          className="text-violet-600 underline flex items-center gap-1"
        >
          {event} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-1.5">${budget}</td>
      <td className="p-1.5">{guests}</td>
      <td className="p-1.5">{date}</td>
      <td className="w-8">
        <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
          <FiMoreHorizontal />
        </button>
      </td>
    </tr>
  );
};
