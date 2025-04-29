import React from "react";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { Attendees } from "../components/Attendees/Attendees";

export const AttendeesPage = () => {
  return (
    <Dashboard>
      <Attendees />
    </Dashboard>
  );
};
