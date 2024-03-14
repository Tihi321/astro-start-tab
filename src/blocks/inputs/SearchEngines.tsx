import { styled } from "solid-styled-components";
import { createSignal, onMount } from "solid-js";

const Select = styled("select")`
  padding: 8px;
  width: 100%;
`;

const Option = styled("option")`
  padding: 8px;
`;

export const SearchEngines = () => {
  const [selected, setSelected] = createSignal<string>("");

  onMount(() => {
    const searchEngine = localStorage.getItem("search-engine") || "phind";
    setSelected(searchEngine);
  });

  return (
    <Select
      onChange={(event) => {
        setSelected(event.currentTarget.value);
        localStorage.setItem("search-engine", event.currentTarget.value);
      }}
      value={selected()}
    >
      <Option value="phind">Phind</Option>
      <Option value="google">Google</Option>
      <Option value="bing">Bing</Option>
      <Option value="duckduckgo">DuckDuckGo</Option>
    </Select>
  );
};
