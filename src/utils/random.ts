import { get } from "lodash-es";
import { extractLocalData, getSaveLocalData } from "./local";

export const getRandomQuote = async () => {
  const localState = JSON.parse(localStorage.getItem("randomquote") || "{}");
  const localData = extractLocalData(localState);
  if (localData) {
    return localData;
  } else {
    const response = await fetch("https://cdn.tihomir-selak.from.hr/api/random/quote-eng.json");
    const data = await response.json();
    const text = get(data, ["data", "text"], "");
    const author = get(data, ["data", "author"], "");

    localStorage.setItem("randomquote", JSON.stringify(getSaveLocalData({ text, author })));

    return { text, author };
  }
};

export const getRandomWord = async () => {
  const localState = JSON.parse(localStorage.getItem("randomword") || "{}");
  const localData = extractLocalData(localState);
  if (localData) {
    return localData;
  } else {
    const response = await fetch(
      "https://cdn.tihomir-selak.from.hr/api/random/vocabulary-word-eng.json"
    );
    const data = await response.json();
    const name = get(data, ["data", "name"], "");
    const meaning = get(data, ["data", "detail"], "");

    localStorage.setItem("randomword", JSON.stringify(getSaveLocalData({ name, meaning })));

    return { name, meaning };
  }
};
