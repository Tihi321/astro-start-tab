import { isEqual } from "lodash-es";
import { createSignal, createEffect } from "solid-js";
import { styled } from "solid-styled-components";
import { FeedList } from "./FeedList";
import { setFeedList } from "./store";
import { getBugList, getTechCrunch, getVergeList } from "./utils";

const Container = styled("div")`
  margin: auto;
`;

const Buttons = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const NewsLinks = styled("div")`
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: center;
  width: 120px;

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
  width: 100%;
  background: var(--dark);
  border-radius: 8px;
  padding: 8px;
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
  flex-direction: column;
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

const NEWS_LIST = {
  BUG: "bug",
  TECHCRUNCH: "techcrunch",
  VERGE: "verge",
};

export const NewsFeed = () => {
  const [selected, setSelected] = createSignal(NEWS_LIST.BUG);
  const [expand, setExpand] = createSignal(false);
  const [fullContent, setFullContent] = createSignal(false);

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
        <NewsFeedButtons>
          <NewsFeedButton
            class={isEqual(selected(), NEWS_LIST.BUG) ? "active" : ""}
            onClick={() => setSelected(NEWS_LIST.BUG)}
          >
            Bug
          </NewsFeedButton>
          <NewsFeedButton
            class={isEqual(selected(), NEWS_LIST.VERGE) ? "active" : ""}
            onClick={() => setSelected(NEWS_LIST.VERGE)}
          >
            Verge
          </NewsFeedButton>
          <NewsFeedButton
            class={isEqual(selected(), NEWS_LIST.TECHCRUNCH) ? "active" : ""}
            onClick={() => setSelected(NEWS_LIST.TECHCRUNCH)}
          >
            Techcrunch
          </NewsFeedButton>
        </NewsFeedButtons>
        <ContentOptions>
          <MoreButton onClick={expandToggle}>{expand() ? "Contract" : "Expand"}</MoreButton>
          <MoreButton onClick={fullContentToggle}>{fullContent() ? "Less" : "More"}</MoreButton>
        </ContentOptions>
        <NewsLinks>
          <NewsLink href="https://app.letsrecast.ai/?ref=null">
            <img src="/images/icons/recast.png" />
            <span>Recast</span>
          </NewsLink>
          <NewsLink href="https://www.perplexity.ai/discover">
            <img src="/images/icons/perplexity.png" />
            <span>Discover</span>
          </NewsLink>
        </NewsLinks>
      </Buttons>
      <Content>
        <FeedList />
      </Content>
    </Container>
  );
};