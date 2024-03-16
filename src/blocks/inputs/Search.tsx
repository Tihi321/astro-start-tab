import { styled } from "solid-styled-components";
import { createSignal, onMount } from "solid-js";
import {
  getBingSearch,
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

const sendTextSearch = (search: string) => {
  const searchEngine = localStorage.getItem("text-search-engine") || "phind";

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
  const [searchType, setSearchType] = createSignal<string>("text");
  const [search, setSearch] = createSignal<string>("");

  onMount(() => {
    setSearchType(localStorage.getItem("search-type") || "text");
  });

  const sendSearch = () => {
    if (searchType() === "text") {
      sendTextSearch(search());
    }
    if (searchType() === "video") {
      sendVideoSearch(search());
    }
    if (searchType() === "music") {
      sendMusicSearch(search());
    }
    setSearch("");
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
          class={searchType() === "text" ? "active" : ""}
          onClick={() => {
            localStorage.setItem("search-type", "text");
            setSearchType("text");
          }}
        >
          Text
        </SearchTypeButton>
        <SearchTypeButton
          class={searchType() === "video" ? "active" : ""}
          onClick={() => {
            localStorage.setItem("search-type", "video");
            setSearchType("video");
          }}
        >
          Video
        </SearchTypeButton>
        <SearchTypeButton
          class={searchType() === "music" ? "active" : ""}
          onClick={() => {
            localStorage.setItem("search-type", "music");
            setSearchType("music");
          }}
        >
          Music
        </SearchTypeButton>
      </SearchTypeButtons>
    </Container>
  );
};
