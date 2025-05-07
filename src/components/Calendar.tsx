import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const events = [{ title: "event 1", date: "2025-04-27" }];

export const Calendar = () => {
  return (
    <>
      <div className="lg:px-28">
        <h1 className="font-bold text-4xl py-6">Calendar</h1>
        {/* Calendar */}
        <div className="bg-white lg:px-28 p-3 rounded-lg">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={{ events }}
          />
        </div>
      </div>
    </>
  );
};
