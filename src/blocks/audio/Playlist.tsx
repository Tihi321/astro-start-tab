import { createSignal, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import { getCustomSongs, removeCustomSong, saveCustomSong } from "./utils";
import { filter, includes, map } from "lodash-es";
import { mutedSongs, setMutedSongs } from "./store";

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

const SongContainer = styled("div")`
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

  &.muted {
    background: var(--dark);
  }
`;

const Button = styled("button")`
  position: absolute;
  cursor: pointer;
  opacity: 0;
  top: 0;
  bottom: 0;
  background: none;
  border: none;
  color: var(--text);
  font-weight: bold;
`;

const MuteButton = styled(Button)`
  left: 0;
`;

const RemoveButton = styled(Button)`
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
        <SongContainer
          onClick={() => {
            if (!includes(mutedSongs, song.src)) {
              onChange(song.src, song.name);
            }
          }}
          class={includes(mutedSongs, song.src) ? "muted" : ""}
        >
          <MuteButton
            onClick={(event: Event) => {
              event.stopPropagation();
              let muted = [];
              if (includes(mutedSongs, song.src)) {
                muted = filter(mutedSongs, (value) => value !== song.src);
              } else {
                muted = [...mutedSongs, song.src];
              }
              setMutedSongs(muted);
              localStorage.setItem("playlist-muted-songs", JSON.stringify(muted));
            }}
          >
            M
          </MuteButton>
          {song.name}
          <RemoveButton
            onClick={(event: Event) => {
              event.stopPropagation();
              if (includes(mutedSongs, song.src)) {
                const muted = filter(mutedSongs, (value) => value !== song.src);
                setMutedSongs(muted);
                localStorage.setItem("playlist-muted-songs", JSON.stringify(muted));
              }

              const newSongs = removeCustomSong(song.name);
              setCustomSongs(newSongs as any);
            }}
          >
            X
          </RemoveButton>
        </SongContainer>
      ))}
    </Container>
  );
};
