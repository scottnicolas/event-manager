import React from "react";
import { Routes, Route } from "react-router-dom";
import { EventsPage } from "./pages/EventsPage";
import { CalendarPage } from "./pages/CalendarPage";
import { Home } from "./pages/Home";
import { AttendeesPage } from "./pages/AttendeesPage";
import { EventDetails } from "./components/EventDetailsPage";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { EventList } from "./components/EventList";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard>
            <Home />
          </Dashboard>
        }
      />
      <Route
        path="/eventsPage"
        element={
          <Dashboard>
            <EventList />
          </Dashboard>
        }
      />
      <Route path="/calendarPage" element={<CalendarPage />} />
      <Route path="/attendeesPage" element={<AttendeesPage />} />
      <Route
        path="/events/:id"
        element={
          <Dashboard>
            <EventDetails />
          </Dashboard>
        }
      />
    </Routes>
  );
}

export default App;
