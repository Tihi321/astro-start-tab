export const formatDate = (date: Date) => {
  const day = date.toLocaleDateString("en-GB");
  const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return `${day} - ${time}`;
};
