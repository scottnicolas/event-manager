import React from "react";
import { Events } from "../components/Dashboard/Events";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { DemoEventsPage } from "./DemoEventsPage";
import { BentoEvents } from "../components/BentoEvents";

export const EventsPage = () => {
  return (
    <Dashboard>
      <Events />
      <DemoEventsPage />
      <BentoEvents />
    </Dashboard>
  );
};
