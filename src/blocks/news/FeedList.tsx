import { map } from "lodash-es";
import { createSignal, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import { feedList, search } from "./store";
import { getFilteredSearch } from "./utils";

const Container = styled("div")`
  margin: auto;
  height: 212px;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  border-radius: 8px;
  background: var(--dark);

  &:hover {
    height: 360px;
  }
`;

const Feed = styled("div")`
  width: 100%;
  height: 380px;
  padding: 8px 8px 18px;
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 60px;
  gap: 8px;
  align-items: flex-start;

  a {
    font-size: 14px;
    text-align: center;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  span {
    display: block;
    flex: 1;
    overflow: hidden;
    text-align: center;
  }

  img {
    width: 60px;
    height: 50px;
    margin: 0;
    object-fit: cover;
  }
`;

const ExpandedFeed = styled("div")`
  width: 100%;
  height: 400px;
  padding: 16px 16px 48px;
  font-size: 14px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    margin: 0;
    padding-top: 2px;
    font-size: 14px;
    text-align: center;
  }

  div {
    display: none;
  }

  figure {
    margin: 0;
    padding: 0;

    img {
      width: 100%;
      height: 200px;
      margin: 0;
      object-fit: cover;
    }
  }
`;

export const FeedList = () => {
  const [fullContent, setFullContent] = createSignal(false);
  const [expand, setExpand] = createSignal(false);

  onMount(() => {
    document.addEventListener("feed:expand", () => {
      setExpand(true);
    });
    document.addEventListener("feed:contract", () => {
      setExpand(false);
    });
    document.addEventListener("feed:small", () => {
      setFullContent(false);
    });
    document.addEventListener("feed:full", () => {
      setFullContent(true);
    });
  });

  return (
    <Container>
      {expand() && (
        <ExpandedFeed>
          {map(getFilteredSearch(feedList, search.value, fullContent()), (news) => {
            return (
              <article>
                <h2 class="title">
                  <a href={news.url} target="_blank">
                    {news.title}
                  </a>
                </h2>
                <p innerHTML={news.content}></p>
              </article>
            );
          })}
        </ExpandedFeed>
      )}
      {!expand() && (
        <Feed>
          {map(getFilteredSearch(feedList, search.value, fullContent()), (news) => {
            return (
              <a href={news.url} target="_blank">
                <img src={news.src} alt={news.title} />
                <span>{news.title}</span>
              </a>
            );
          })}
        </Feed>
      )}
    </Container>
  );
};
