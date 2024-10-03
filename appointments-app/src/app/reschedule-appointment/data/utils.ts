import { AvailabilitySlot } from '../model/appointment';

export const mergeMaps = (
  map1: Map<string, AvailabilitySlot[]>,
  map2: Map<string, AvailabilitySlot[]>
) => {
  const combinedMap = new Map(map1);

  map2.forEach((value, key) => {
    if (!combinedMap.has(key)) {
      combinedMap.set(key, value); // Only add if key doesn't exist
    }
  });

  return combinedMap;
};

export const getPreviousMonday = (date: Date) => {
  const day = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const diff = day === 1 ? 0 : day === 0 ? 6 : day - 1; // Calculate the difference from Monday
  const previousMonday = new Date(date); // Create a copy of the date
  previousMonday.setDate(date.getDate() - diff); // Adjust the date to the previous Monday
  return previousMonday;
};
