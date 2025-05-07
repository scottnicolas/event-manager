import { Link, useLocation } from "react-router-dom";
import { FiHome, FiList, FiCalendar } from "react-icons/fi";
import type { IconType } from "react-icons";

const routes = [
  { title: "Dashboard", path: "/", Icon: FiHome },
  { title: "Events", path: "/eventsPage", Icon: FiList },
  { title: "Calendar", path: "/calendarPage", Icon: FiCalendar }, // no path = plain button
];

export const RouteSelect = () => {
  const location = useLocation();

  return (
    <div className="space-y-1">
      {routes.map(({ title, path, Icon }) => {
        const isSelected = path ? location.pathname === path : false; // Only highlight if it has a path

        return path ? (
          <Link key={title} to={path}>
            <Route Icon={Icon} selected={isSelected} title={title} />
          </Link>
        ) : (
          <button key={title} className="w-full text-left">
            <Route Icon={Icon} selected={false} title={title} />
          </button>
        );
      })}
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
}) => {
  return (
    <div
      className={`flex items-center justify-start gap-2 w-full rounded-lg px-2 py-1 my-0.5 text-sm relative transition-all duration-300 ${
        selected
          ? "bg-stone-200 font-medium bg-gradient-to-tr text-stone-900"
          : "hover:bg-stone-200 bg-transparent text-stone-600"
      }`}
    >
      <Icon className="shrink-0" />
      <span>{title}</span>
    </div>
  );
};
