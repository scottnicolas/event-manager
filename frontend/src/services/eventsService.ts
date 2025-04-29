const mockEvents = [
  { id: 1, name: "Spring Festival", date: "2025-05-10" },
  { id: 2, name: "Tech Conference", date: "2025-06-15" },
];

// Later, replace with a real fetch() call
export const fetchEvents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEvents);
    }, 500);
  });
};
