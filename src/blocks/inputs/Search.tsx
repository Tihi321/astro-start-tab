import { styled } from "solid-styled-components";
import { createSignal } from "solid-js";
import {
  getBingSearch,
  getCopilotSearchUrl,
  getDuckDuckGo,
  getGameDevSearch,
  getGoogleSearch,
  getPhindSearchUrl,
  getPixabaySearch,
  getSkillShareSearch,
  getSoundCloudSearch,
  getSpotifySearch,
  getUdemySearch,
  getYoutubeMusicSearch,
  getYoutubeSearch,
  getZenvaSearch,
} from "./utils";

const Container = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SearchContainer = styled("div")`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const SearchTypeButtons = styled("div")`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const SearchTypeButton = styled("button")`
  display: block;
  background: var(--primary);
  color: var(--light);
  cursor: pointer;
  font-size: 12px;
  background: var(--dark);
  border-radius: 8px;
  padding: 8px;
  border: none;
  flex: 1;

  &.active {
    color: var(--link-color);
  }
`;

const Input = styled("input")`
  flex: 1;
  padding: 8px;
  border: 1px solid var(--light);
  border-radius: 4px;
  background: var(--dark);
  color: var(--text);
  &::placeholder {
    color: var(--text);
  }
`;

const Submit = styled("button")`
  padding: 8px;
  border: 1px solid var(--light);
  border-radius: 4px;
  cursor: pointer;
  color: var(--text);
  background: var(--dark);

  img {
    width: 24px;
    height: 24px;
  }
`;

const sendAiSearch = (search: string) => {
  const searchEngine = localStorage.getItem("ai-search-engine") || "phind";

  switch (searchEngine) {
    case "phind":
      window.location.href = getPhindSearchUrl(search);
      break;
    case "copilot":
      window.location.href = getCopilotSearchUrl(search);
      break;
    default:
  }
};

const sendTextSearch = (search: string) => {
  const searchEngine = localStorage.getItem("text-search-engine") || "google";

  switch (searchEngine) {
    case "phind":
      window.location.href = getPhindSearchUrl(search);
      break;
    case "google":
      window.location.href = getGoogleSearch(search);
      break;
    case "bing":
      window.location.href = getBingSearch(search);
      break;
    case "duckduckgo":
      window.location.href = getDuckDuckGo(search);
      break;
    default:
  }
};

const sendVideoSearch = (search: string) => {
  const searchEngine = localStorage.getItem("video-search-engine") || "youtube";

  switch (searchEngine) {
    case "youtube":
      window.location.href = getYoutubeSearch(search);
      break;
    case "skillshare":
      window.location.href = getSkillShareSearch(search);
      break;
    case "udemy":
      window.location.href = getUdemySearch(search);
      break;
    case "zenva":
      window.location.href = getZenvaSearch(search);
      break;
    case "gamedev":
      window.location.href = getGameDevSearch(search);
      break;
    default:
  }
};

const sendMusicSearch = (search: string) => {
  const searchEngine = localStorage.getItem("music-search-engine") || "soundcloud";

  switch (searchEngine) {
    case "soundcloud":
      window.location.href = getSoundCloudSearch(search);
      break;
    case "spotify":
      window.location.href = getSpotifySearch(search);
      break;
    case "pixabay":
      window.location.href = getPixabaySearch(search);
      break;
    case "youtubemusic":
      window.location.href = getYoutubeMusicSearch(search);
      break;
    default:
  }
};

export const Search = () => {
  const [searchType, setSearchType] = createSignal<string>("ai");
  const [search, setSearch] = createSignal<string>("");

  const sendSearch = () => {
    if (searchType() === "ai") {
      sendAiSearch(search());
    }
    if (searchType() === "text") {
      sendTextSearch(search());
    }
    if (searchType() === "video") {
      sendVideoSearch(search());
    }
    if (searchType() === "music") {
      sendMusicSearch(search());
    }
  };
  return (
    <Container>
      <SearchContainer>
        <Input
          onInput={(e) => {
            setSearch(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendSearch();
            }
          }}
          type="text"
          placeholder="Search"
          value={search()}
        />
        <Submit onClick={sendSearch}>
          <img src="/images/icons/magnifier.png" />
        </Submit>
      </SearchContainer>
      <SearchTypeButtons>
        <SearchTypeButton
          class={searchType() === "ai" ? "active" : ""}
          onClick={() => {
            setSearchType("ai");
          }}
        >
          Ai
        </SearchTypeButton>
        <SearchTypeButton
          class={searchType() === "text" ? "active" : ""}
          onClick={() => {
            setSearchType("text");
          }}
        >
          Text
        </SearchTypeButton>
        <SearchTypeButton
          class={searchType() === "video" ? "active" : ""}
          onClick={() => {
            setSearchType("video");
          }}
        >
          Video
        </SearchTypeButton>
        <SearchTypeButton
          class={searchType() === "music" ? "active" : ""}
          onClick={() => {
            setSearchType("music");
          }}
        >
          Music
        </SearchTypeButton>
      </SearchTypeButtons>
    </Container>
  );
};
