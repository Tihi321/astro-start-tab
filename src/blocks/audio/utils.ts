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

export const getCustomSongs = () => {
  const songs = localStorage.getItem("customsongs");
  return songs ? JSON.parse(songs) : [];
};

export const saveCustomSong = (name: string, src: string) => {
  const songs = [...getCustomSongs(), { name, src }];
  localStorage.setItem("customsongs", JSON.stringify(songs));

  return songs;
};

export const removeCustomSong = (name: string) => {
  const songs = getCustomSongs().filter((song: { name: string }) => song.name !== name);
  localStorage.setItem("customsongs", JSON.stringify(songs));

  return songs;
};

export const getAudioLevel = () => {
  const audioLevel = localStorage.getItem("audio-level");

  return Number(audioLevel) || 100;
};

export const setAudioLevel = (level: number) => {
  localStorage.setItem("audio-level", JSON.stringify(level));
};
