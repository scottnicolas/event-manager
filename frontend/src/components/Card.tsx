import React from "react";

interface CardProps {
  title: string;
  description: string;
  date: string;
}

export const Card = ({ title, description, date }: CardProps) => {
  return (
    <>
      <div className="bg-white rounded-lg border border-stone-300 shadow p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-sm text-gray-600">{date}</p>
      </div>
    </>
  );
};
