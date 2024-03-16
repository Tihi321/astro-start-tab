import { createEffect, createSignal, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import { getLocalBeatsPreset, setLocalBeatsPreset } from "./utils";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  max-width: 250px;
  width: 100%;
`;

const AudioControls = styled("div")`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  width: 100%;
`;

const Name = styled("div")`
  width: 100%;
  text-align: center;
  font-size: 14px;
  padding: 4px;
  border-radius: 4px;
  background: var(--dark);
`;

const Input = styled("input")`
  width: 30px;
  height: 30px;
  outline: none;
  text-align: center;
  border: 1px solid var(--light);
  border-radius: 4px;
  background: var(--dark);
  color: var(--text);

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Slider = styled("input")`
  width: 100%;
  height: 15px;
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
`;

export const Beats = ({ src, name }: { name: string; src: string }) => {
  const [audioVolume, setAudioVolume] = createSignal<number>(0);
  let audioElement: any;

  createEffect(() => {
    if (audioElement) {
      audioElement.volume = 0;
      audioElement.loop = true;
    }
  });

  onMount(() => {
    document.addEventListener("preset:load", () => {
      const volume = getLocalBeatsPreset(name);
      if (audioElement) {
        if (audioElement.paused) {
          setAudioVolume(volume);
          audioElement.volume = audioVolume() / 100;
          audioElement.play();
        } else {
          if (volume === 0) {
            setAudioVolume(0);
            audioElement.volume = 0;
            audioElement.pause();
          } else {
            setAudioVolume(volume);
            audioElement.volume = audioVolume() / 100;
            audioElement.play();
          }
        }
      }
    });
    document.addEventListener("preset:stop", () => {
      if (audioElement) {
        setAudioVolume(0);
        audioElement.volume = 0;
        audioElement.pause();
      }
    });
    document.addEventListener("preset:save", () => {
      if (audioElement) {
        setLocalBeatsPreset(name, audioVolume());
      }
    });
    document.addEventListener("preset:toggle", () => {
      if (audioElement) {
        if (audioElement.paused) {
          const volume = getLocalBeatsPreset(name);
          setAudioVolume(volume);
          audioElement.volume = audioVolume() / 100;
          audioElement.play();
        } else {
          setAudioVolume(0);
          audioElement.volume = 0;
          audioElement.pause();
        }
      }
    });
    document.addEventListener("preset:clear", () => {
      if (audioElement) {
        setLocalBeatsPreset(name, 0);
        setAudioVolume(0);
        audioElement.volume = 0;
        audioElement.pause();
      }
    });
  });

  const onChange = (event: any) => {
    if (audioElement) {
      const volume = Number(event.currentTarget.value);
      setAudioVolume(volume);
      if (volume === 0) {
        audioElement.volume = 0;
        audioElement.pause();
      } else {
        audioElement.volume = audioVolume() / 100;
        audioElement.play();
      }
    }
  };

  return (
    <Container>
      <audio ref={audioElement}>
        <source src={src} type="audio/mpeg" />
      </audio>
      <Name>{name}</Name>
      <AudioControls>
        <Slider type="range" min="0" max="10" step="1" value={audioVolume()} onChange={onChange} />
        <Input type="number" min="0" max="10" step="1" value={audioVolume()} onChange={onChange} />
      </AudioControls>
    </Container>
  );
};
