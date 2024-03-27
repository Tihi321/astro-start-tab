import { createSignal, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import { getAudioLevel, getCustomSongs } from "./utils";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 60px;
`;

const GroupContainer = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const Title = styled("h2")`
  font-size: 12px;
  line-height: 1;
  width: 100%;
  color: var(--text);
  text-align: center;
  margin: 0;
  padding: 0;
  cursor: default;
`;

const StopButton = styled("button")`
  cursor: pointer;
  width: 14px;
  height: 14px;
  background-color: var(--light);
`;

const PlayButton = styled("button")`
  cursor: pointer;
  width: 10px;
  height: 10px;
  background-image: linear-gradient(to right, var(--light), var(--light));
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  transform: rotate(90deg);
`;

const PrevButton = styled(PlayButton)`
  transform: rotate(-90deg);
`;

export const MusicPlayer = () => {
  let audioElement: any;
  const [audioLevel, setAudioLevel] = createSignal<number>(0);
  const [songName, setSongName] = createSignal("");
  const [songSRC, setSongSRC] = createSignal("");

  const playPlaylist = (next = true) => {
    document.dispatchEvent(new CustomEvent("preset:stop"));
    const songs = getCustomSongs();
    const currentSongIndex = songs.findIndex((song: { src: string }) => song.src === songSRC());
    const nextSong = songs[currentSongIndex + 1] || songs[0];
    const prevSong = songs[currentSongIndex - 1] || songs[songs.length - 1];
    const usedSong = next ? nextSong : prevSong;
    setSongName(usedSong.name);
    setSongSRC(usedSong.src);
    audioElement.src = usedSong.src;
    audioElement.volume = 5 / audioLevel();
    audioElement.play();
  };

  onMount(() => {
    setAudioLevel(getAudioLevel());

    document.addEventListener("music:update", () => {
      if (!audioElement.paused) {
        audioElement.volume = 5 / getAudioLevel();
      }
    });

    document.addEventListener("playlist:stop", () => {
      audioElement.pause();
    });

    document.addEventListener("playlist:prev", () => {
      playPlaylist(false);
    });

    document.addEventListener("playlist:next", () => {
      playPlaylist();
    });

    audioElement.addEventListener("ended", () => {
      playPlaylist();
    });
  });

  return (
    <Container>
      <audio ref={audioElement} loop>
        <source type="audio/mpeg" />
      </audio>
      <GroupContainer>
        <Title>Presets</Title>
        <StopButton
          onClick={() => {
            document.dispatchEvent(new CustomEvent("preset:stop"));
          }}
        ></StopButton>
        <PlayButton
          onClick={() => {
            document.dispatchEvent(new CustomEvent("preset:load"));
          }}
        ></PlayButton>
      </GroupContainer>
      <GroupContainer>
        <Title>{songName() || "Playlist"}</Title>
        <PrevButton
          onClick={() => {
            playPlaylist(false);
          }}
        ></PrevButton>
        <StopButton
          onClick={() => {
            audioElement.pause();
          }}
        ></StopButton>
        <PlayButton
          onClick={() => {
            playPlaylist();
          }}
        ></PlayButton>
      </GroupContainer>
    </Container>
  );
};
