// ✅ Added null/undefined checks for event.end_date and event.start_date in EventForm.tsx
import React, { useEffect, useState } from "react";
import { Event } from "../types/Event";
import { fetchVenues } from "../services/venueService";
import { fetchHosts, createHost, updateHost } from "../services/hostService";
import {
  fetchSponsors,
  createSponsor,
  deleteSponsor,
} from "../services/sponsorService";
import { createEvent, updateEvent } from "../services/eventService";

type Props = {
  event: Event | null;
  onClose: () => void;
};

const EventForm: React.FC<Props> = ({ event, onClose }) => {
  const [name, setName] = useState(event ? event.event_name : "");
  const [startDate, setStartDate] = useState(
    event && event.start_date ? event.start_date.slice(0, 10) : ""
  );
  const [endDate, setEndDate] = useState(
    event && event.end_date ? event.end_date.slice(0, 10) : ""
  );
  const [venueId, setVenueId] = useState<number | null>(null);
  const [sponsorSelections, setSponsorSelections] = useState<
    { sponsor_id: number; selected: boolean }[]
  >([]);

  const [venues, setVenues] = useState<any[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);

  useEffect(() => {
    fetchVenues().then(setVenues);
    fetchSponsors().then((fetched) => {
      const initialSelections = fetched.map((s) => ({
        sponsor_id: s.sponsor_id,
        selected: false,
      }));
      setSponsors(fetched);
      setSponsorSelections(initialSelections);
    });
    if (event) {
      fetchHosts().then((hosts) => {
        const host = hosts.find((h) => h.event === event.event_id);
        if (host) setVenueId(host.venue);
      });
    }
  }, [event]);

  const toggleSponsor = (id: number) => {
    setSponsorSelections((prev) =>
      prev.map((s) =>
        s.sponsor_id === id ? { ...s, selected: !s.selected } : s
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let savedEvent = event;
    if (event) {
      savedEvent = await updateEvent(event.event_id, {
        ...event,
        event_name: name,
        start_date: startDate,
        end_date: endDate,
      });
    } else {
      savedEvent = await createEvent({
        event_name: name,
        start_date: startDate,
        end_date: endDate,
      });
    }

    if (venueId !== null) {
      const existingHost = (await fetchHosts()).find(
        (h) => h.event === savedEvent.event_id
      );
      if (existingHost) {
        await updateHost(existingHost.event, {
          event: savedEvent.event_id,
          venue: venueId,
        });
      } else {
        await createHost({ event: savedEvent.event_id, venue: venueId });
      }
    }

    const selectedSponsors = sponsorSelections
      .filter((s) => s.selected)
      .map((s) => s.sponsor_id);
    const currentSponsors = (await fetchSponsors()).filter((s) =>
      selectedSponsors.includes(s.sponsor_id)
    );

    for (const sponsor of sponsors) {
      if (
        selectedSponsors.includes(sponsor.sponsor_id) &&
        !currentSponsors.some((cs) => cs.sponsor_id === sponsor.sponsor_id)
      ) {
        await createSponsor({ sponsor_id: sponsor.sponsor_id });
      } else if (
        !selectedSponsors.includes(sponsor.sponsor_id) &&
        currentSponsors.some((cs) => cs.sponsor_id === sponsor.sponsor_id)
      ) {
        await deleteSponsor(sponsor.sponsor_id);
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[450px] relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {event ? "Edit Event" : "Add Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Venue</label>
            <select
              value={venueId ?? ""}
              onChange={(e) => setVenueId(Number(e.target.value))}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select a venue</option>
              {venues.map((v) => (
                <option
                  key={v.venue_id}
                  value={v.venue_id}
                >{`Venue ${v.venue_id}`}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Sponsors</label>
            <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto border rounded p-2">
              {sponsorSelections.map((s) => (
                <label
                  key={s.sponsor_id}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={s.selected}
                    onChange={() => toggleSponsor(s.sponsor_id)}
                  />
                  {`Sponsor ${s.sponsor_id}`}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
