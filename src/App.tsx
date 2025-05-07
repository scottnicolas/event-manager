import { Routes, Route } from "react-router-dom";
import { CalendarPage } from "./pages/CalendarPage";
import { Home } from "./pages/Home";
import { AttendeesPage } from "./pages/AttendeesPage";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { EventList } from "./components/EventList";
import { EventDetailsPage } from "./pages/EventDetailsPage";

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
        path="/events/:eventId"
        element={
          <Dashboard>
            <EventDetailsPage />
          </Dashboard>
        }
      />
    </Routes>
  );
}

export default App;
