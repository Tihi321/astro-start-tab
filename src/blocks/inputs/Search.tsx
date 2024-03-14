import { styled } from "solid-styled-components";
import { createSignal } from "solid-js";
import { getBingSearch, getDuckDuckGo, getGoogleSearch, getPhindSearchUrl } from "./utils";
import { isEqual } from "lodash-es";

const Container = styled("div")`
  width: 100%;
  display: flex;
  gap: 8px;
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

export const Search = () => {
  const [search, setSearch] = createSignal<string>("");

  const sendSearch = () => {
    const searchEngine = localStorage.getItem("search-engine") || "phind";

    if (isEqual(searchEngine, "phind")) {
      window.location.href = getPhindSearchUrl(search());
    }

    if (isEqual(searchEngine, "google")) {
      window.location.href = getGoogleSearch(search());
    }

    if (isEqual(searchEngine, "bing")) {
      window.location.href = getBingSearch(search());
    }

    if (isEqual(searchEngine, "duckduckgo")) {
      window.location.href = getDuckDuckGo(search());
    }
    setSearch("");
  };
  return (
    <Container>
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
    </Container>
  );
};
