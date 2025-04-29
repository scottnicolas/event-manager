import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

function greeting() {
  const greetings = ["Good Morning", "Good Afternoon", "Good Evening"];
  const currentHour = new Date().getHours();

  let index =
    currentHour >= 12 && currentHour < 17 ? 1 : currentHour >= 17 ? 2 : 0;

  return greetings[index];
}

export const TopBar = () => {
  const [currentDate, setCurrentDate] = useState(getDate());

  return (
    <div className="border-b px-4 mb-2 mt-2 pb-4 border-stone-300">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">{`${greeting()}, John!`}</span>
          <span className="text-xs block text-stone-500">{currentDate}</span>
        </div>

        <button className="flex text-sm items-center gap-2 rounded-lg bg-white border border-stone-300 transition-colors hover:bg-cyan-100 hover:text-cyan-700 px-3 py-1.5">
          <FiCalendar />
          <span>Prev 6 Months</span>
        </button>
      </div>
    </div>
  );
};
