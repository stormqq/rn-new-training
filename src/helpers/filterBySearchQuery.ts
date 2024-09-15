export const filterBySearchQuery = (data: any[], searchQuery: string) => {
  if (!searchQuery) {
    return data;
  }

  return data.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
};
