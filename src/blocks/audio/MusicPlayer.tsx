import { createSignal, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import { formatTime, getAudioLevel, getCustomSongs } from "./utils";

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
  border: 1px solid var(--dark);
  border-radius: 4px;
  padding: 2px;
`;

const TimeContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: 10px;
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

const Slider = styled("input")`
  width: 100%;
  height: 15px;
  border-radius: 5px;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  background: var(--dark);
  background-clip: content-box;
  padding: 4px 0;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: var(--light);
    margin-top: -2px;
  }
`;

const TimlineSlider = styled("input")`
  width: 100%;
  height: 15px;
  border-radius: 5px;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  background: var(--dark);
  background-clip: content-box;
  padding: 4px 0;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 8px;
    width: 8px;
    background: var(--light);
    margin-top: -2px;
  }
`;

export const MusicPlayer = () => {
  let audioElement: any;
  const [audioVolume, setAudioVolume] = createSignal<number>(5);
  const [duration, setDuration] = createSignal<number>(0);
  const [currentTime, setCurrentTime] = createSignal<number>(0);
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
    audioElement.volume = audioVolume() / audioLevel();
    audioElement.play();
  };

  const onChange = (event: any) => {
    if (audioElement) {
      const volume = Number(event.currentTarget.value);
      setAudioVolume(volume);
      localStorage.setItem("playlist-audio-volume", event.currentTarget.value);
      if (volume === 0) {
        audioElement.volume = 0;
        audioElement.pause();
      } else {
        audioElement.volume = audioVolume() / getAudioLevel();
        audioElement.play();
      }
    }
  };

  const onTimeSliderChange = (event: any) => {
    if (audioElement) {
      const currentTime = Number(event.currentTarget.value);
      audioElement.currentTime = currentTime;
      setCurrentTime(currentTime);
    }
  };

  onMount(() => {
    setAudioVolume(Number(localStorage.getItem("playlist-audio-volume") || "5"));
    setAudioLevel(getAudioLevel());

    document.addEventListener("music:update", () => {
      if (!audioElement.paused) {
        audioElement.volume = audioVolume() / getAudioLevel();
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

    audioElement.addEventListener("loadedmetadata", () => {
      setDuration(audioElement.duration);
    });

    audioElement.addEventListener("timeupdate", () => {
      setCurrentTime(audioElement.currentTime);
    });
  });

  return (
    <Container>
      <audio ref={audioElement}>
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
        <TimeContainer>
          {formatTime(currentTime())} / {formatTime(duration())}
        </TimeContainer>
        <TimlineSlider
          type="range"
          min="0"
          max={duration()}
          value={currentTime()}
          onChange={onTimeSliderChange}
        />
        <Slider type="range" min="0" max="10" step="1" value={audioVolume()} onChange={onChange} />
      </GroupContainer>
    </Container>
  );
};
