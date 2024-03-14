import { get, map } from "lodash-es";

const vergeImageRegex = /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/i;

export const getVergeList = async () => {
  const response = await fetch("https://www.theverge.com/rss/index.xml");
  const text = await response.text();
  const data = new window.DOMParser().parseFromString(text, "text/xml");
  const items = data.querySelectorAll("entry");

  return map(Array.from(items), (item) => {
    const content = item.querySelector("content")?.textContent || "";
    return {
      url: item.querySelector("id")?.textContent || "",
      title: item.querySelector("title")?.textContent || "",
      content: content,
      src: get(content.match(vergeImageRegex), [1], ""),
    };
  });
};

export const getBugList = async () => {
  const response = await fetch("https://cdn.tihomir-selak.from.hr/rss/bug.xml");
  const text = await response.text();
  const data = new window.DOMParser().parseFromString(text, "text/xml");
  const items = data.querySelectorAll("item");

  return map(Array.from(items), (item) => {
    return {
      url: item.querySelector("link")?.textContent || "",
      title: item.querySelector("title")?.textContent || "",
      content: item.querySelector("description")?.textContent || "",
      src: item.querySelector("enclosure")?.getAttribute("url") || "",
    };
  });
};

export const getTechCrunch = async () => {
  const response = await fetch("https://cdn.tihomir-selak.from.hr/rss/techcrunch.xml");
  const text = await response.text();
  const data = new window.DOMParser().parseFromString(text, "text/xml");
  const items = data.querySelectorAll("item");

  return map(Array.from(items), (item) => {
    return {
      url: item.querySelector("link")?.textContent || "",
      title: item.querySelector("title")?.textContent || "",
      content: item.querySelector("description")?.textContent || "",
      src: "/images/icons/tc.webp",
    };
  });
};
