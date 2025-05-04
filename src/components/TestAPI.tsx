// src/components/VenueList.tsx
import React, { useEffect, useState } from "react";
import { fetchVenues } from "../services/venueService";
import { Venue } from "../types/Venue";

const VenueList = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVenues = async () => {
      try {
        const data = await fetchVenues();
        setVenues(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load venues");
      } finally {
        setLoading(false);
      }
    };

    loadVenues();
  }, []);

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Venues</h2>
      <ul>
        {venues.map((venue) => (
          <li key={venue.venue_id}>
            {venue.street}, {venue.city}, {venue.state} ({venue.zip_code}) —{" "}
            {venue.phone_number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VenueList;
