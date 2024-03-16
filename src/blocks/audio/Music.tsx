import { styled } from "solid-styled-components";
import { Beats } from "./Beats";
import { map } from "lodash-es";
import { DEFAULT_GERNES, DEFAULT_SFX } from "./constants";
import { createSignal, onMount } from "solid-js";
import { getCustomSongs, removeCustomSong, saveCustomSong } from "./utils";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BeatsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

const CustomSongsInput = styled("input")`
  outline: none;
  padding: 4px;
  border: 1px solid var(--light);
  border-radius: 4px;
  background: var(--dark);
  color: var(--text);
  height: 30px;

  &::placeholder {
    color: var(--text);
  }
`;

export const Music = () => {
  const [customSongName, setCustomSongName] = createSignal("");
  const [customSongUrl, setCustomSongUrl] = createSignal("");
  const [customSongs, setCustomSongs] = createSignal([]);

  onMount(() => {
    setCustomSongs(getCustomSongs());
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
      <Title>Songs</Title>
      <BeatsContainer>
        {map(customSongs(), (song: { src: string; name: string }) => (
          <Beats
            src={song.src}
            name={song.name}
            onRemove={() => {
              const newSongs = removeCustomSong(song.name);
              setCustomSongs(newSongs as any);
            }}
          />
        ))}
      </BeatsContainer>
      <Title>Add Song</Title>
      <ButtonsContainer>
        <CustomSongsInput
          value={customSongName()}
          onInput={(event: any) => setCustomSongName(event.target.value)}
          placeholder="Name"
        />
        <CustomSongsInput
          value={customSongUrl()}
          onInput={(event: any) => setCustomSongUrl(event.target.value)}
          placeholder="Src"
        />
        <Button
          onClick={() => {
            if (customSongName() !== "" && customSongUrl() !== "") {
              const newSongs = saveCustomSong(customSongName(), customSongUrl());
              setCustomSongs(newSongs as any);
            }
            setCustomSongName("");
            setCustomSongUrl("");
          }}
        >
          Add
        </Button>
      </ButtonsContainer>
      <Title>Presets</Title>
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
          }}
        >
          Stop
        </Button>
      </ButtonsContainer>
    </Container>
  );
};
