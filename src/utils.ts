export const getWebsiteUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:4321"
    : "https://tihi321.github.io/astro-start-tab";
};
