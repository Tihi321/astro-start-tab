import { styled } from "solid-styled-components";
import { createSignal } from "solid-js";
import {
  getBingSearch,
  getChatGptSearchUrl,
  getChosicSearch,
  getClaudeSearchUrl,
  getCopilotSearchUrl,
  getDuckDuckGo,
  getGameDevSearch,
  getGoogleSearch,
  getMixtralSearchUrl,
  getMorphicSearchUrl,
  getPerplexitySearchUrl,
  getPhindSearchUrl,
  getGrokSearchUrl,
  getPixabaySearch,
  getSkillShareSearch,
  getSoundCloudSearch,
  getSpotifySearch,
  getUdemySearch,
  getYoucomSearchUrl,
  getYoutubeMusicSearch,
  getYoutubeSearch,
  getZenvaSearch,
  getBraveSearch,
} from "./utils";

const Container = styled("div")<{ focus: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  margin: 48px 0;
  opacity: ${(props) => (props.focus ? 0.9 : 0.6)};
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
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

  &:focus {
    outline: none;
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

const openLink = (url: string, openOutside = false) => {
  if (openOutside) {
    window.open(url, "_blank");
  } else {
    window.location.href = url;
  }
};

const sendAiSearch = (search: string, openOutside = false) => {
  const searchEngine = localStorage.getItem("ai-search-engine") || "phind";

  switch (searchEngine) {
    case "perplexity":
      openLink(getPerplexitySearchUrl(search), openOutside);
      break;
    case "chatgpt":
      openLink(getChatGptSearchUrl(search), openOutside);
      break;
    case "mixtral":
      openLink(getMixtralSearchUrl(search), openOutside);
      break;
    case "grok":
      openLink(getGrokSearchUrl(search), openOutside);
      break;
    case "phind":
      openLink(getPhindSearchUrl(search), openOutside);
      break;
    case "copilot":
      openLink(getCopilotSearchUrl(search), openOutside);
      break;
    case "claude":
      openLink(getClaudeSearchUrl(search), openOutside);
      break;
    case "morphic":
      openLink(getMorphicSearchUrl(search), openOutside);
      break;
    case "youcom":
      openLink(getYoucomSearchUrl(search), openOutside);
      break;
    default:
  }
};

const sendTextSearch = (search: string, openOutside = false) => {
  const searchEngine = localStorage.getItem("text-search-engine") || "google";

  switch (searchEngine) {
    case "google":
      openLink(getGoogleSearch(search), openOutside);
      break;
    case "brave":
      openLink(getBraveSearch(search), openOutside);
      break;
    case "bing":
      openLink(getBingSearch(search), openOutside);
      break;
    case "duckduckgo":
      openLink(getDuckDuckGo(search), openOutside);
      break;
    default:
  }
};

const sendVideoSearch = (search: string, openOutside = false) => {
  const searchEngine = localStorage.getItem("video-search-engine") || "youtube";

  switch (searchEngine) {
    case "youtube":
      openLink(getYoutubeSearch(search), openOutside);
      break;
    case "skillshare":
      openLink(getSkillShareSearch(search), openOutside);
      break;
    case "udemy":
      openLink(getUdemySearch(search), openOutside);
      break;
    case "zenva":
      openLink(getZenvaSearch(search), openOutside);
      break;
    case "gamedev":
      openLink(getGameDevSearch(search), openOutside);
      break;
    default:
  }
};

const sendMusicSearch = (search: string, openOutside = false) => {
  const searchEngine = localStorage.getItem("music-search-engine") || "soundcloud";

  switch (searchEngine) {
    case "soundcloud":
      openLink(getSoundCloudSearch(search), openOutside);
      break;
    case "spotify":
      openLink(getSpotifySearch(search), openOutside);
      break;
    case "pixabay":
      openLink(getPixabaySearch(search), openOutside);
      break;
    case "chosic":
      openLink(getChosicSearch(search), openOutside);
      break;
    case "youtubemusic":
      openLink(getYoutubeMusicSearch(search), openOutside);
      break;
    default:
  }
};

export const Search = () => {
  const [searchType, setSearchType] = createSignal<string>("ai");
  const [search, setSearch] = createSignal<string>("");
  const [searchFocus, setSearchFocus] = createSignal<boolean>(false);

  const sendSearch = (openOutside = false) => {
    if (searchType() === "ai") {
      sendAiSearch(search(), openOutside);
    }
    if (searchType() === "text") {
      sendTextSearch(search(), openOutside);
    }
    if (searchType() === "video") {
      sendVideoSearch(search(), openOutside);
    }
    if (searchType() === "music") {
      sendMusicSearch(search(), openOutside);
    }
  };
  return (
    <Container focus={searchFocus()}>
      <SearchContainer>
        <Input
          onInput={(e) => {
            setSearch(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendSearch(false);
            }
          }}
          type="text"
          placeholder="Search"
          value={search()}
          onFocus={(e) => {
            setSearchFocus(true);
          }}
          onBlur={(e) => {
            setSearchFocus(false);
          }}
        />
        <Submit
          onMouseDown={(e) => {
            if (e.button === 1) {
              sendSearch(true);
            }

            if (e.button === 0) {
              sendSearch(false);
            }
          }}
        >
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
