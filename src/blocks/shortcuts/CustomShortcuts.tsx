import { isEqual, map } from "lodash-es";
import { createSignal, onMount } from "solid-js";
import { styled } from "solid-styled-components";

const Container = styled("div")`
  position: relative;
  height: 160px;
  padding: 8px 0;
`;

const Shortcuts = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  height: fit-content;
  gap: 4px;
`;

const Shortcut = styled("div")`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  height: fit-content;
  gap: 4px;
  height: 100%;

  &:hover {
    button {
      opacity: 1;
    }
  }
`;

const Link = styled("a")`
  border: 1px solid var(--light);
  background: var(--dark);
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  min-width: 60px;
  height: 60px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  line-height: 1;
`;

const RemoveButton = styled("button")`
  position: absolute;
  opacity: 0;
  top: 0;
  right: 0;
  transition: opacity 0.2s;
`;

const AddContainer = styled("div")`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 100%;
`;

const AddButton = styled("button")`
  width: 100%;
  height: 20px;
  padding: 4px;
  line-height: 1;
  border-radius: 4px;
  background: var(--dark);
  color: var(--text);
  border: 1px solid var(--light);
  cursor: pointer;
`;

const Inputs = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;

  &.show {
    pointer-events: auto;
    opacity: 1;
  }
`;

const Input = styled("input")`
  outline: none;
  text-align: center;
  border: 1px solid var(--light);
  border-radius: 4px;
  background: var(--backdrop);
  color: var(--text);
  width: 100%;
  height: 40px;

  &::placeholder {
    color: var(--text);
  }
`;

const SaveButton = styled("button")`
  width: 100%;
  flex: 1;
  padding: 4px;
  border-radius: 4px;
  background: var(--backdrop);
  color: var(--text);
  border: 1px solid var(--light);
  cursor: pointer;
`;

export const CustomShortcuts = () => {
  const [shortcuts, setShortcuts] = createSignal<Array<{ name: string; url: string }>>([]);
  const [showInputs, setShowInputs] = createSignal<boolean>(false);
  const [name, setName] = createSignal<string>("");
  const [url, setUrl] = createSignal<string>("");

  onMount(() => {
    const shortcuts = localStorage.getItem("shortcuts")
      ? JSON.parse(localStorage.getItem("shortcuts") || "")
      : [];
    setShortcuts(shortcuts);
  });

  return (
    <Container>
      <Shortcuts>
        {map(shortcuts(), (values) => (
          <Shortcut>
            <Link href={values.url}>{values.name}</Link>
            <RemoveButton
              onClick={() => {
                const newShortcuts = shortcuts().filter(
                  (shortcut) => !isEqual(shortcut.name, values.name)
                );
                setShortcuts(newShortcuts);
                localStorage.setItem("shortcuts", JSON.stringify(newShortcuts));
              }}
            >
              -
            </RemoveButton>
          </Shortcut>
        ))}
      </Shortcuts>
      <AddContainer>
        <AddButton onClick={() => setShowInputs(!showInputs())}>
          {showInputs() ? "-" : "+"}
        </AddButton>
        <Inputs class={showInputs() ? "show" : ""}>
          <Input
            autocomplete="off"
            type="text"
            value={name()}
            onInput={(e: any) => setName(e.target.value)}
            placeholder="Name"
          />
          <Input
            autocomplete="off"
            type="text"
            value={url()}
            onInput={(e: any) => setUrl(e.target.value)}
            placeholder="URL"
          />
          <SaveButton
            onClick={() => {
              const newShortcuts = [...shortcuts(), { name: name(), url: url() }];
              setShortcuts(newShortcuts);
              localStorage.setItem("shortcuts", JSON.stringify(newShortcuts));
              setName("");
              setUrl("");
              setShowInputs(false);
            }}
          >
            Save
          </SaveButton>
        </Inputs>
      </AddContainer>
    </Container>
  );
};
