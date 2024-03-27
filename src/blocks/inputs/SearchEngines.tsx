import { styled } from "solid-styled-components";
import { createSignal, onMount } from "solid-js";

const Container = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
`;

const Select = styled("select")`
  padding: 8px;
  max-width: 250px;
  width: 100%;
`;

const Option = styled("option")`
  padding: 8px;
`;

export const SearchEngines = () => {
  const [selectedAISearchEngine, setSelectedAISearchEngine] = createSignal<string>("");
  const [selectedTextSearchEngine, setSelectedTextSearchEngine] = createSignal<string>("");
  const [selectedVideoSearchEngine, setSelectedVideoSearchEngine] = createSignal<string>("");
  const [selectedMusicSearchEngine, setSelectedMusicSearchEngine] = createSignal<string>("");

  onMount(() => {
    setSelectedAISearchEngine(localStorage.getItem("ai-search-engine") || "phind");
    setSelectedTextSearchEngine(localStorage.getItem("text-search-engine") || "google");
    setSelectedVideoSearchEngine(localStorage.getItem("video-search-engine") || "youtube");
    setSelectedMusicSearchEngine(localStorage.getItem("music-search-engine") || "soundcloud");
  });

  return (
    <Container>
      <Select
        onChange={(event) => {
          setSelectedAISearchEngine(event.currentTarget.value);
          localStorage.setItem("ai-search-engine", event.currentTarget.value);
        }}
        value={selectedAISearchEngine()}
      >
        <Option value="phind">Phind</Option>
        <Option value="copilot">Copilot</Option>
      </Select>
      <Select
        onChange={(event) => {
          setSelectedTextSearchEngine(event.currentTarget.value);
          localStorage.setItem("text-search-engine", event.currentTarget.value);
        }}
        value={selectedTextSearchEngine()}
      >
        <Option value="google">Google</Option>
        <Option value="bing">Bing</Option>
        <Option value="duckduckgo">DuckDuckGo</Option>
      </Select>
      <Select
        onChange={(event) => {
          setSelectedVideoSearchEngine(event.currentTarget.value);
          localStorage.setItem("video-search-engine", event.currentTarget.value);
        }}
        value={selectedVideoSearchEngine()}
      >
        <Option value="youtube">Youtube</Option>
        <Option value="skillshare">Skillshare</Option>
        <Option value="udemy">Udemy</Option>
        <Option value="zenva">Zenva</Option>
        <Option value="gamedev">GameDev</Option>
      </Select>
      <Select
        onChange={(event) => {
          setSelectedMusicSearchEngine(event.currentTarget.value);
          localStorage.setItem("music-search-engine", event.currentTarget.value);
        }}
        value={selectedMusicSearchEngine()}
      >
        <Option value="soundcloud">SoundCloud</Option>
        <Option value="spotify">Spotify</Option>
        <Option value="youtubemusic">Youtube Music</Option>
        <Option value="pixabay">Pixabay</Option>
        <Option value="chosic">Chosic</Option>
      </Select>
    </Container>
  );
};
