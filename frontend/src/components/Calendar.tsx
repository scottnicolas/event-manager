import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const events = [{ title: "event 1", date: "2025-04-27" }];

export const Calendar = () => {
  return (
    <>
      <h1 className="font-bold text-2xl pb-2">Calendar</h1>
      {/* Calendar */}
      <div className="bg-white p-3 rounded-lg border border-stone-300 shadow">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={{ events }}
        />
      </div>
    </>
  );
};
