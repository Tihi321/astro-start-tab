import { get, isEqual, map } from "lodash-es";
import { createSignal, createEffect, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import { FeedList } from "./FeedList";
import { setFeedList, search, setSearch } from "./store";
import { getBugList, getTechCrunch, getVergeList } from "./utils";
import { getSearchPresets, removeSearchPreset, setSearchPreset } from "../inputs/utils";

const Container = styled("div")`
  width: 100%;
`;

const Buttons = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const NewsLinks = styled("div")`
  display: flex;
  gap: 4px;
  flex-direction: row;
  align-items: end;

  img {
    width: 30px;
    height: 30px;
  }

  span {
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
`;

const NewsLink = styled("a")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 150px;
  background: var(--dark);
  border-radius: 8px;
  padding: 8px;
`;

const FeedOptions = styled("div")`
  display: flex;
  gap: 4px;
  flex-direction: column;
  flex: 1;
`;

const SearchInput = styled("input")`
  outline: none;
  padding: 4px;
  border: 1px solid var(--light);
  border-radius: 4px;
  background: var(--dark);
  color: var(--text);
  width: 200px;
  height: 30px;

  &::placeholder {
    color: var(--text);
  }
`;

const NewsFeedButtons = styled("div")`
  display: flex;
  gap: 8px;
  flex-direction: row;
  align-items: flex-end;
  flex-wrap: wrap;
  flex: 1;
`;

const NewsFeedButton = styled("button")`
  display: block;
  padding: 8px 16px;
  background: var(--primary);
  color: var(--light);
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  background: var(--dark);
  border-radius: 8px;
  padding: 8px;
  border: none;

  &.active {
    color: var(--link-color);
  }
`;

const ContentOptions = styled("div")`
  display: flex;
  gap: 4px;
  flex-direction: row;
  width: 80px;
  height: auto;
`;

const MoreButton = styled("button")`
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
`;

const Content = styled("div")`
  margin-top: 16px;
`;

const SearchPresetInput = styled("input")`
  outline: none;
  padding: 4px;
  border: 1px solid var(--light);
  border-radius: 4px;
  background: var(--dark);
  color: var(--text);
  width: 80px;
  height: 30px;

  &::placeholder {
    color: var(--text);
  }
`;

const SearchPresets = styled("div")`
  display: flex;
  gap: 4px;
  flex-direction: row;
`;

const SearchPreset = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;

  &:hover {
    .remove {
      opacity: 1;
    }
  }
`;

const SearchPresetButton = styled("button")`
  border: 1px solid var(--light);
  background: var(--dark);
  color: var(--text);
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  min-width: 60px;
  text-align: center;
`;

const RemovePresetButton = styled("button")`
  cursor: pointer;
  width: 10px;
  height: 100%;
  border: none;
  padding: 0;
  background: var(--link-hover);
  opacity: 0;
  transition: opacity 0.3s;
`;

const NEWS_LIST = {
  BUG: "bug",
  TECHCRUNCH: "techcrunch",
  VERGE: "verge",
};

export const NewsFeed = () => {
  const [selected, setSelected] = createSignal(NEWS_LIST.BUG);
  const [expand, setExpand] = createSignal(false);
  const [searchPreset, saveSearchPreset] = createSignal("");
  const [searchPresets, saveSearchPresets] = createSignal({});
  const [fullContent, setFullContent] = createSignal(false);

  onMount(() => {
    const presets = getSearchPresets();
    saveSearchPresets(presets);
  });

  const expandToggle = () => {
    const expanded = !expand();
    setExpand(expanded);

    if (expanded) {
      document.dispatchEvent(new CustomEvent("feed:expand"));
    } else {
      document.dispatchEvent(new CustomEvent("feed:contract"));
    }
  };

  const fullContentToggle = () => {
    const full = !fullContent();
    setFullContent(full);

    if (!full) {
      document.dispatchEvent(new CustomEvent("feed:small"));
    } else {
      document.dispatchEvent(new CustomEvent("feed:full"));
    }
  };

  createEffect(() => {
    if (isEqual(selected(), NEWS_LIST.VERGE)) {
      getVergeList().then((list) => {
        setFeedList(list);
      });
    }
    if (isEqual(selected(), NEWS_LIST.BUG)) {
      getBugList().then((list) => {
        setFeedList(list);
      });
    }
    if (isEqual(selected(), NEWS_LIST.TECHCRUNCH)) {
      getTechCrunch().then((list) => {
        setFeedList(list);
      });
    }
  });

  return (
    <Container>
      <Buttons>
        <FeedOptions>
          <NewsFeedButtons>
            <NewsFeedButton
              class={isEqual(selected(), NEWS_LIST.BUG) ? "active" : ""}
              onClick={() => setSelected(NEWS_LIST.BUG)}
            >
              Bug
            </NewsFeedButton>
            <NewsFeedButton
              class={isEqual(selected(), NEWS_LIST.TECHCRUNCH) ? "active" : ""}
              onClick={() => setSelected(NEWS_LIST.TECHCRUNCH)}
            >
              Techcrunch
            </NewsFeedButton>
            <NewsFeedButton
              class={isEqual(selected(), NEWS_LIST.VERGE) ? "active" : ""}
              onClick={() => setSelected(NEWS_LIST.VERGE)}
            >
              Verge
            </NewsFeedButton>
          </NewsFeedButtons>
          <ContentOptions>
            <SearchInput
              value={search.value}
              onInput={(e: any) => setSearch({ value: e.target.value })}
              placeholder="Search"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setSearch({ value: "" });
                }
              }}
            />
            <SearchPresetInput
              value={searchPreset()}
              onInput={(event: any) => saveSearchPreset(event.target.value)}
              onKeyDown={(event: any) => {
                if (event.key === "Enter") {
                  const name = searchPreset();
                  const preset = search.value;
                  const presets = setSearchPreset(name, preset);
                  saveSearchPresets(presets);
                  saveSearchPreset("");
                }
              }}
              placeholder="Name"
            />
            <MoreButton onClick={expandToggle}>{expand() ? "Contract" : "Expand"}</MoreButton>
            <MoreButton onClick={fullContentToggle}>{fullContent() ? "Less" : "More"}</MoreButton>
          </ContentOptions>
        </FeedOptions>
        <NewsLinks>
          <NewsLink href="https://www.perplexity.ai/discover">
            <img src="/images/icons/perplexity.png" />
            <span>Discover</span>
          </NewsLink>
          <NewsLink href="https://app.letsrecast.ai/?ref=null">
            <img src="/images/icons/recast.png" />
            <span>Recast</span>
          </NewsLink>
        </NewsLinks>
      </Buttons>
      <SearchPresets>
        {map(Object.keys(searchPresets()), (name: string) => {
          return (
            <SearchPreset>
              <SearchPresetButton
                onClick={() => {
                  setSearch({ value: get(searchPresets(), [name], "") });
                }}
              >
                {name}
              </SearchPresetButton>
              <RemovePresetButton
                class="remove"
                onClick={() => {
                  const updatedPresets = removeSearchPreset(name);
                  saveSearchPresets(updatedPresets);
                }}
              >
                -
              </RemovePresetButton>
            </SearchPreset>
          );
        })}
      </SearchPresets>
      <Content>
        <FeedList />
      </Content>
    </Container>
  );
};
