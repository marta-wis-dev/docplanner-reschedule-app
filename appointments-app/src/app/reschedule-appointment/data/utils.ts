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
