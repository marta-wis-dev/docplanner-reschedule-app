export const mergeMaps = (map1: Map<string, any>, map2: Map<string, any>) => {
  const combinedMap = new Map(map1);

  map2.forEach((value, key) => {
    if (!combinedMap.has(key)) {
      combinedMap.set(key, value); // Only add if key doesn't exist
    }
  });

  return combinedMap;
};
