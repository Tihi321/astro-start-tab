import { toLower } from "lodash-es";
import { createEffect, createSignal, onMount } from "solid-js";
import { styled } from "solid-styled-components";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
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
    document.addEventListener("preset:play", () => {
      const beats = localStorage.getItem("beats");
      const beatsVolume = beats ? JSON.parse(beats) : {};
      const volume = beatsVolume[toLower(name)] || 0;
      if (volume !== 0 && audioElement) {
        audioElement.play();
        audioElement.volume = volume / 100;
        setAudioVolume(volume);
      }
    });
  });

  const onChange = (event: any) => {
    if (audioElement) {
      const volume = Number(event.currentTarget.value);
      const beats = localStorage.getItem("beats");
      const beatsVolume = beats ? JSON.parse(beats) : {};
      beatsVolume[toLower(name)] = volume;
      localStorage.setItem("beats", JSON.stringify(beatsVolume));

      setAudioVolume(volume);
      if (volume === 0) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      audioElement.volume = volume / 100;
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
