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

  onMount(() => {
    setAudioLevel(getAudioLevel());

    document.addEventListener("preset:update", () => {
      if (!audioElement.paused) {
        audioElement.volume = 5 / getAudioLevel();
      }
    });

    audioElement.addEventListener("ended", () => {
      const songs = getCustomSongs();
      const currentSongIndex = songs.findIndex((song: { src: string }) => song.src === songSRC());
      const nextSong = songs[currentSongIndex + 1] || songs[0];
      setSongName(nextSong.name);
      setSongSRC(nextSong.src);
      audioElement.src = nextSong.src;
      audioElement.volume = 5 / getAudioLevel();
      audioElement.play();
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
            document.dispatchEvent(new CustomEvent("preset:stop"));
            const songs = getCustomSongs();
            const currentSongIndex = songs.findIndex(
              (song: { src: string }) => song.src === songSRC()
            );
            const prevSong = songs[currentSongIndex - 1] || songs[songs.length - 1];
            setSongName(prevSong.name);
            setSongSRC(prevSong.src);
            audioElement.src = prevSong.src;
            audioElement.volume = 5 / audioLevel();
            audioElement.play();
          }}
        ></PrevButton>
        <StopButton
          onClick={() => {
            audioElement.pause();
          }}
        ></StopButton>
        <PlayButton
          onClick={() => {
            document.dispatchEvent(new CustomEvent("preset:stop"));
            const songs = getCustomSongs();
            const currentSongIndex = songs.findIndex(
              (song: { src: string }) => song.src === songSRC()
            );
            const nextSong = songs[currentSongIndex + 1] || songs[0];
            setSongName(nextSong.name);
            setSongSRC(nextSong.src);
            audioElement.src = nextSong.src;
            audioElement.volume = 5 / audioLevel();
            audioElement.play();
          }}
        ></PlayButton>
      </GroupContainer>
    </Container>
  );
};
