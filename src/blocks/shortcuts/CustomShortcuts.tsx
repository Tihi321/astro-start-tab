import { isEqual, map } from "lodash-es";
import { createSignal, onMount } from "solid-js";
import { styled } from "solid-styled-components";

const Container = styled("div")`
  position: relative;
  padding: 8px 0;
`;

const ShowContainer = styled("div")`
  height: 160px;
`;

const HiddenContainer = styled("div")`
  height: 40px;
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
  height: 20px;

  &.show {
    .inputs {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;

const ToggleButtons = styled("div")`
  display: flex;
  flex-direction: row;
  height: 20px;
  width: 100%;
`;

const ShowShortcutsButton = styled("button")`
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 20px;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  line-height: 1;
  border-radius: 4px;
  background: var(--dark);
  color: var(--text);
  border: 1px solid var(--light);
  cursor: pointer;
`;

const HideShortcutsButton = styled("button")`
  padding: 4px;
  flex: 1;
  line-height: 1;
  border-radius: 4px;
  background: var(--dark);
  color: var(--text);
  border: 1px solid var(--light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddButton = styled("button")`
  padding: 4px;
  flex: 1;
  line-height: 1;
  border-radius: 4px;
  background: var(--dark);
  color: var(--text);
  border: 1px solid var(--light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inputs = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
`;

const Input = styled("input")`
  outline: none;
  padding: 4px;
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
  const [showCustomShortcuts, setShowCustomShotcuts] = createSignal<boolean>(false);
  const [showInputs, setShowInputs] = createSignal<boolean>(false);
  const [name, setName] = createSignal<string>("");
  const [url, setUrl] = createSignal<string>("");

  onMount(() => {
    const showCustomShortcuts = localStorage.getItem("showcustomshortcuts") || "false";

    if (showCustomShortcuts === "true") {
      setShowCustomShotcuts(true);
    }

    const shortcuts = localStorage.getItem("shortcuts")
      ? JSON.parse(localStorage.getItem("shortcuts") || "")
      : [];
    setShortcuts(shortcuts);
  });

  return (
    <Container>
      {!showCustomShortcuts() && (
        <HiddenContainer>
          <ShowShortcutsButton
            onClick={() => {
              localStorage.setItem("showcustomshortcuts", "true");
              setShowCustomShotcuts(true);
            }}
          >
            {"show"}
          </ShowShortcutsButton>
        </HiddenContainer>
      )}
      {showCustomShortcuts() && (
        <ShowContainer>
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
          <AddContainer class={showInputs() ? "show" : ""}>
            <ToggleButtons>
              <AddButton onClick={() => setShowInputs(!showInputs())}>
                {showInputs() ? "-" : "+"}
              </AddButton>
              <HideShortcutsButton
                onClick={() => {
                  localStorage.setItem("showcustomshortcuts", "false");
                  setShowCustomShotcuts(false);
                }}
              >
                {"hide"}
              </HideShortcutsButton>
            </ToggleButtons>
            <Inputs class="inputs">
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
        </ShowContainer>
      )}
    </Container>
  );
};
