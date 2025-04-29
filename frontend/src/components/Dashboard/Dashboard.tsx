import { Sidebar } from "../Sidebar/Sidebar";
import { TopBar } from "./TopBar";

export const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen grid gap-4 p-4 grid-cols-[220px_1fr] items-start">
      {/* Sidebar */}
      <div className="sticky top-0 overflow-y-auto">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="bg-stone-100 border border-stone-300 rounded-lg shadow overflow-hidden">
        <TopBar />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
