import { FiSettings, FiTrash2 } from "react-icons/fi";
import { AccountToggle } from "./AccountToggle";
import { RouteSelect } from "./RouteSelect";

export const Sidebar = () => {
  return (
    <div>
      <div className="sticky top-4 h-[calc(100vh-32px-48px)]">
        <AccountToggle />
        <RouteSelect />

        <div className="border-t mt-4 pt-4 border-stone-300">
          <button className="space-y-1 w-full text-left">
            <div className="hover:bg-stone-200 flex items-center justify-start gap-2 w-full rounded-lg px-2 py-1 text-sm relative transition-all duration-300 bg-transparent text-stone-600 ">
              <FiSettings />
              Settings
            </div>
            <div className="hover:bg-stone-200 flex items-center justify-start gap-2 w-full rounded-lg px-2 py-1 text-sm relative transition-all duration-300 bg-transparent text-stone-600 ">
              <FiTrash2 />
              Trash
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
