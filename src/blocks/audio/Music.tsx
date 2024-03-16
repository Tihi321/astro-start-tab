import { styled } from "solid-styled-components";
import { Beats } from "./Beats";

const Container = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Music = () => {
  return (
    <Container>
      <Beats src={`/audio/just-relax.mp3`} name="Relax" />
      <Beats src={`/audio/lofi-beats.mp3`} name="Lofy" />
      <Beats src={`/audio/forest.mp3`} name="Forest" />
      <Beats src={`/audio/rain.mp3`} name="Rain" />
      <Beats src={`/audio/waves.mp3`} name="Waves" />
      <Beats src={`/audio/campfire.mp3`} name="Campfire" />
    </Container>
  );
};
