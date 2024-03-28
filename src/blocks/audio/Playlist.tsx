import { createSignal, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import { getCustomSongs, removeCustomSong, saveCustomSong } from "./utils";
import { map } from "lodash-es";

const Container = styled("div")`
  position: absolute;
  background-color: var(--backdrop);
  width: 100%;
  top: 100%;
  font-size: 14px;
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CustomSongsContainer = styled("div")`
  display: flex;
`;

const CustomSongsInput = styled("input")`
  outline: none;
  padding: 4px;
  border: 1px solid var(--light);
  border-radius: 4px;
  background: var(--backdrop);
  color: var(--text);
  font-size: 12px;
  width: 120px;

  &::placeholder {
    color: var(--text);
  }
`;

const AddButton = styled("button")`
  display: block;
  background: var(--primary);
  color: var(--light);
  cursor: pointer;
  font-size: 12px;
  background: var(--backdrop);
  padding: 4px;
  border: none;
  width: 50px;
`;

const Name = styled("div")`
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 4px;
  background: var(--backdrop);
  cursor: pointer;

  &:hover {
    button {
      opacity: 1;
    }
  }
`;

const RemoveButton = styled("button")`
  position: absolute;
  cursor: pointer;
  opacity: 0;
  top: 0;
  right: 0;
`;

export const Playlist = ({ onChange }: { onChange: (src: string, name: string) => void }) => {
  const [customSongs, setCustomSongs] = createSignal([]);
  const [customSongName, setCustomSongName] = createSignal("");
  const [customSongUrl, setCustomSongUrl] = createSignal("");

  onMount(() => {
    setCustomSongs(getCustomSongs());
  });

  return (
    <Container>
      <CustomSongsContainer>
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
        <AddButton
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
        </AddButton>
      </CustomSongsContainer>
      {map(customSongs(), (song: { name: string; src: string }) => (
        <Name onClick={() => onChange(song.src, song.name)}>
          {song.name}
          <RemoveButton
            onClick={() => {
              const newSongs = removeCustomSong(song.name);
              setCustomSongs(newSongs as any);
            }}
          >
            X
          </RemoveButton>
        </Name>
      ))}
    </Container>
  );
};
