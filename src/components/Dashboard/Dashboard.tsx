import { Sidebar } from "../Sidebar/Sidebar";
import { TopBar } from "./TopBar";

export const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh grid gap-4 p-4 grid-cols-[220px_1fr] items-start">
      {/* Sidebar */}
      <div className="sticky top-0 overflow-y-auto">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="bg-white overflow-auto h-full max-h-full rounded-lg shadow">
        <div className="sticky top-0 overflow-y-auto">
          <TopBar />
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
