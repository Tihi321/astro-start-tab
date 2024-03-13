import { styled } from "solid-styled-components";
import { createSignal } from "solid-js";

const Container = styled("div")`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const Input = styled("input")`
  flex: 1;
  padding: 8px;
  border: 1px solid var(--light);
  border-radius: 4px;
  background: var(--dark);
  color: var(--text);
`;

const Submit = styled("button")`
  padding: 8px;
  border: 1px solid var(--light);
  border-radius: 4px;
  cursor: pointer;
  color: var(--text);
  background: var(--dark);
`;

export const Search = () => {
  const [search, setSearch] = createSignal<string>("");

  const sendSearch = () => {
    if (search()) {
      window.open(
        `https://www.phind.com/search?q=${encodeURIComponent(search())}&ignoreSearchResults=false`
      );
    } else {
      window.open(`https://www.phind.com`);
    }

    setSearch("");
  };
  return (
    <Container>
      <Input
        onInput={(e) => {
          setSearch(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendSearch();
          }
        }}
        type="text"
        placeholder="Search"
        value={search()}
      />
      <Submit onClick={sendSearch}>Search</Submit>
    </Container>
  );
};
