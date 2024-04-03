import { createStore } from "solid-js/store";

const [mutedSongs, setMutedSongs] = createStore<string[]>([]);

export { mutedSongs, setMutedSongs };
