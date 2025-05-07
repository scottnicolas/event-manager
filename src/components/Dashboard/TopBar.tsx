import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import EventForm from "../EventForm";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

function greeting() {
  const greetings = ["Good Morning", "Good Afternoon", "Good Evening"];
  const currentHour = new Date().getHours();

  let index =
    currentHour >= 12 && currentHour < 17 ? 1 : currentHour >= 17 ? 2 : 0;

  return greetings[index];
}

function emoji() {
  const emojis = ["☕", "🤠", "🌇"];
  const currentHour = new Date().getHours();
  let index =
    currentHour >= 12 && currentHour < 17 ? 1 : currentHour >= 17 ? 2 : 0;

  return emojis[index];
}

export const TopBar = () => {
  const [currentDate] = useState(getDate());
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border-b px-4 mb-2 mt-2 pb-4 border-stone-300">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">{`${greeting()}, John ${emoji()}`}</span>
          <span className="text-xs block text-stone-500">{currentDate}</span>
        </div>

        <div onClick={() => setShowModal(true)} className="group">
          <button className="border hover:shadow hover:bg-stone-100 inline-flex items-center hover:cursor-pointer rounded-lg border-stone-300 p-1.5">
            <FiPlus />
            <span className="pl-1 text-sm">Add New Event</span>
          </button>
        </div>
      </div>

      {showModal && (
        <EventForm
          onClose={() => setShowModal(false)}
          onSubmit={(data) => {
            console.log("New event:", data);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};
