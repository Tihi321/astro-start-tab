import { createStore } from "solid-js/store";

const [feedList, setFeedList] = createStore<
  Array<{ url: string; title: string; content: string; src: string }>
>([]);

export { feedList, setFeedList };
