import React from "react";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { DemoEventsPage } from "./DemoEventsPage";
import { Events } from "../components/Dashboard/Events";

export const Home = () => {
  return (
    <Dashboard>
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <DemoEventsPage />
      <Events />
    </Dashboard>
  );
};
