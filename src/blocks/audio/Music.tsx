import { styled } from "solid-styled-components";
import { Beats } from "./Beats";
import { map } from "lodash-es";
import { DEFAULT_GERNES, DEFAULT_SFX } from "./constants";
import { createSignal, onMount } from "solid-js";
import { getAudioLevel, setAudioLevel } from "./utils";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BeatsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const Title = styled("h2")`
  font-size: 16px;
  margin: 0;
`;

const ButtonsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const Button = styled("button")`
  display: block;
  background: var(--primary);
  color: var(--light);
  cursor: pointer;
  font-size: 12px;
  background: var(--dark);
  border-radius: 8px;
  padding: 8px;
  border: none;
  min-width: 100px;
`;

export const Music = () => {
  const [localAudioLevel, setLocalAudioLevel] = createSignal();

  onMount(() => {
    setLocalAudioLevel(getAudioLevel());
  });

  return (
    <Container>
      <Title>SFX</Title>
      <BeatsContainer>
        {map(DEFAULT_SFX, (beat) => (
          <Beats src={beat.src} name={beat.name} />
        ))}
      </BeatsContainer>
      <Title>Genre</Title>
      <BeatsContainer>
        {map(DEFAULT_GERNES, (song) => (
          <Beats src={song.src} name={song.name} />
        ))}
      </BeatsContainer>
      <Title>Options</Title>
      <ButtonsContainer>
        <Button
          onClick={() => {
            document.dispatchEvent(new CustomEvent("preset:save"));
          }}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            document.dispatchEvent(new CustomEvent("preset:clear"));
          }}
        >
          Clear
        </Button>
        <Button
          onClick={() => {
            document.dispatchEvent(new CustomEvent("preset:load"));
          }}
        >
          Load
        </Button>
        <Button
          onClick={() => {
            document.dispatchEvent(new CustomEvent("preset:stop"));
            document.dispatchEvent(new CustomEvent("playlist:stop"));
          }}
        >
          Stop
        </Button>
        <Button
          onClick={() => {
            const level = localAudioLevel() === 100 ? 10 : 100;
            setLocalAudioLevel(level);
            setAudioLevel(level);
            document.dispatchEvent(new CustomEvent("music:update"));
          }}
        >
          {localAudioLevel() === 100 ? "Low" : "High"}
        </Button>
      </ButtonsContainer>
    </Container>
  );
};
