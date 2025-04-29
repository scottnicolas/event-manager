import React from "react";
import { Routes, Route } from "react-router-dom";
import { EventsPage } from "./pages/EventsPage";
import { CalendarPage } from "./pages/CalendarPage";
import { Home } from "./pages/Home";
import { AttendeesPage } from "./pages/AttendeesPage";
import { EventDetailsPage } from "./components/EventDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/eventsPage" element={<EventsPage />} />
      <Route path="/calendarPage" element={<CalendarPage />} />
      <Route path="/attendeesPage" element={<AttendeesPage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
    </Routes>
  );
}

export default App;
