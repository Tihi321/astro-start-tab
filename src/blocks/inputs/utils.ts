export const getSearchPresets = () => {
  return JSON.parse(localStorage.getItem("searchpresets") || "{}");
};

export const setSearchPreset = (name: string, search: string) => {
  const searchPresets = getSearchPresets();
  const updatedPresets = { ...searchPresets, [name]: search };
  localStorage.setItem("searchpresets", JSON.stringify(updatedPresets));

  return updatedPresets;
};

export const removeSearchPreset = (name: string) => {
  const searchPresets = getSearchPresets();
  delete searchPresets[name];
  localStorage.setItem("searchpresets", JSON.stringify(searchPresets));

  return searchPresets;
};

export const getPhindSearchUrl = (search: string) => {
  return search
    ? `https://www.phind.com/search?q=${encodeURIComponent(search)}&ignoreSearchResults=false`
    : `https://www.phind.com`;
};

export const getGoogleSearch = (search: string) => {
  return search
    ? `https://www.google.com/search?q=${encodeURIComponent(search)}&oq=${encodeURIComponent(
        search
      )}`
    : `https://www.google.com`;
};

export const getBingSearch = (search: string) => {
  return search
    ? `https://www.bing.com/search?q=${encodeURIComponent(search)}`
    : `https://www.bing.com`;
};

export const getDuckDuckGo = (search: string) => {
  return search
    ? `https://duckduckgo.com/?va=e&t=ho&q=${encodeURIComponent(search)}`
    : `https://www.duckduckgo.com`;
};
