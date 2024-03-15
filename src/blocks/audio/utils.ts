import { toLower } from "lodash-es";

export const setLocalBeatsPreset = (name: string, volume: number) => {
  const beats = localStorage.getItem("beats");
  const beatsVolume = beats ? JSON.parse(beats) : {};
  beatsVolume[toLower(name)] = volume;
  localStorage.setItem("beats", JSON.stringify(beatsVolume));
};

export const getLocalBeatsPreset = (name: string) => {
  const beats = localStorage.getItem("beats");
  const beatsVolume = beats ? JSON.parse(beats) : {};
  return beatsVolume[toLower(name)] || 0;
};
