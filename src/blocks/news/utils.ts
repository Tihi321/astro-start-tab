import { map, get } from "lodash-es";
import { extractLocalData, getSaveLocalData } from "../../utils/local";

const setLocalNews = (name: string, data: any) => {
  const newsObject = JSON.parse(localStorage.getItem("rss") || "{}");
  const localData = getSaveLocalData(data);
  localStorage.setItem("rss", JSON.stringify({ ...newsObject, [name]: localData }));
};
const getLocalNews = (name: string) => {
  const newsObject = JSON.parse(localStorage.getItem("rss") || "{}");
  const currectNews = get(newsObject, name, {});

  return extractLocalData(currectNews);
};

export const getVergeList = async () => {
  const localData = getLocalNews("verge");
  if (localData) {
    return localData;
  } else {
    const response = await fetch("https://cdn.tihomir-selak.from.hr/rss/verge.xml");
    const text = await response.text();
    const data = new window.DOMParser().parseFromString(text, "text/xml");
    const items = data.querySelectorAll("entry");

    const news = map(Array.from(items), (item) => {
      const content = item.querySelector("content")?.textContent || "";
      return {
        url: item.querySelector("id")?.textContent || "",
        title: item.querySelector("title")?.textContent || "",
        content: content,
        src: "/images/icons/verge.png",
      };
    });

    setLocalNews("verge", news);

    return news;
  }
};

export const getBugList = async () => {
  const localData = getLocalNews("bug");
  if (localData) {
    return localData;
  } else {
    const response = await fetch("https://cdn.tihomir-selak.from.hr/rss/bug.xml");
    const text = await response.text();
    const data = new window.DOMParser().parseFromString(text, "text/xml");
    const items = data.querySelectorAll("item");

    const news = map(Array.from(items), (item) => {
      return {
        url: item.querySelector("link")?.textContent || "",
        title: item.querySelector("title")?.textContent || "",
        content: item.querySelector("description")?.textContent || "",
        src: item.querySelector("enclosure")?.getAttribute("url") || "",
      };
    });

    setLocalNews("bug", news);
    return news;
  }
};

export const getTechCrunch = async () => {
  const localData = getLocalNews("techcrunch");

  if (localData) {
    return localData;
  } else {
    const response = await fetch("https://cdn.tihomir-selak.from.hr/rss/techcrunch.xml");
    const text = await response.text();
    const data = new window.DOMParser().parseFromString(text, "text/xml");
    const items = data.querySelectorAll("item");

    const news = map(Array.from(items), (item) => {
      return {
        url: item.querySelector("link")?.textContent || "",
        title: item.querySelector("title")?.textContent || "",
        content: item.querySelector("description")?.textContent || "",
        src: "/images/icons/tc.webp",
      };
    });

    setLocalNews("techcrunch", news);

    return news;
  }
};
