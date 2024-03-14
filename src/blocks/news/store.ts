import { createStore } from "solid-js/store";

const [search, setSearch] = createStore<{ value: string }>({ value: "" });

const [feedList, setFeedList] = createStore<
  Array<{ url: string; title: string; content: string; src: string }>
>([]);

export { feedList, search, setFeedList, setSearch };
