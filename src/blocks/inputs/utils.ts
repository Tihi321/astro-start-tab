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

export const getPerplexitySearchUrl = (search: string) => {
  return search
    ? `https://www.perplexity.ai/search?q=${encodeURIComponent(search)}&copilot=false&s=d`
    : `https://www.perplexity.ai`;
};

export const getChatGptSearchUrl = (search: string) => {
  return search
    ? `https://chatgpt.com/?q=${encodeURIComponent(search)}&hints=search&ref=ext`
    : `https://chatgpt.com`;
};

export const getClaudeSearchUrl = (search: string) => {
  return search ? `https://claude.ai/new?q=${encodeURIComponent(search)}` : `https://claude.ai`;
};

export const getMixtralSearchUrl = (search: string) => {
  return search
    ? `https://chat.mistral.ai/chat?q=${encodeURIComponent(search)}`
    : `https://chat.mistral.ai`;
};

export const getMorphicSearchUrl = (search: string) => {
  return search
    ? `https://www.morphic.sh/search?q=${encodeURIComponent(search)}`
    : `https://www.morphic.sh`;
};

export const getYoucomSearchUrl = (search: string) => {
  return search
    ? `https://you.com/search?q=${encodeURIComponent(
        search
      )}&fromSearchBar=true&tbm=youchat&chatMode=default`
    : `https://you.com`;
};

export const getPhindSearchUrl = (search: string) => {
  return search
    ? `https://www.phind.com/search?q=${encodeURIComponent(search)}&ignoreSearchResults=false`
    : `https://www.phind.com`;
};

export const getCopilotSearchUrl = (search: string) => {
  return search
    ? `https://www.bing.com/search?showconv=1&sendquery=1&q=${encodeURIComponent(search)}`
    : `https://copilot.microsoft.com/`;
};

export const getYoutubeSearch = (search: string) => {
  return search
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(search)}`
    : `https://www.youtube.com`;
};

export const getSkillShareSearch = (search: string) => {
  return search
    ? `https://www.skillshare.com/en/search?query=${encodeURIComponent(search)}`
    : `https://www.skillshare.com`;
};

export const getUdemySearch = (search: string) => {
  return search
    ? `https://www.udemy.com/courses/search/?src=ukw&q=${encodeURIComponent(search)}`
    : `https://www.udemy.com`;
};

export const getZenvaSearch = (search: string) => {
  return search
    ? `https://academy.zenva.com/search/?s=${encodeURIComponent(search)}`
    : `https://www.udemy.com`;
};

export const getGameDevSearch = (search: string) => {
  return search
    ? `https://www.gamedev.tv/courses/?query=${encodeURIComponent(search)}`
    : `https://www.gamedev.tv`;
};

export const getSoundCloudSearch = (search: string) => {
  return search
    ? `https://soundcloud.com/search?q=${encodeURIComponent(search)}`
    : `https://www.soundcloud.com`;
};

export const getSpotifySearch = (search: string) => {
  return search
    ? `https://open.spotify.com/search/${encodeURIComponent(search)}`
    : `https://www.spotify.com`;
};

export const getPixabaySearch = (search: string) => {
  return search
    ? `https://pixabay.com/music/search/${encodeURIComponent(search)}`
    : `https://www.pixabay.com/music`;
};

export const getChosicSearch = (search: string) => {
  return search
    ? `https://www.chosic.com/free-music/all/?keyword=${encodeURIComponent(search)}`
    : `https://www.chosic.com/free-music/all/`;
};

export const getYoutubeMusicSearch = (search: string) => {
  return search
    ? `https://music.youtube.com/search?q=${encodeURIComponent(search)}`
    : `https://music.youtube.com`;
};
