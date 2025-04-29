import React from "react";

export const StatCards = () => {
  return (
    <>
      <Card title="Budget" value="$900" period="From Jan 1st - Jul 31st" />
      <Card title="Guests" value="40" period="From Jan 1st - Jul 31st" />
      <Card
        title="Trailing Year"
        value="$278,054.24"
        period="Previous 365 days"
      />
    </>
  );
};

const Card = ({
  title,
  value,
  period,
}: {
  title: string;
  value: string;
  period: string;
}) => {
  return (
    <div className="p-4 md:col-span-4 col-span-12 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};
