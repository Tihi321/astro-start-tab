import { createSignal, createEffect } from "solid-js";
import { styled } from "solid-styled-components";
import { formatDate } from "./utils";

const Container = styled("div")`
  margin: auto;
`;

export const DateTime = () => {
  const [time, setTime] = createSignal(formatDate(new Date()));

  createEffect(() => {
    const interval = setInterval(() => {
      setTime(formatDate(new Date()));
    }, 1000);

    return () => clearInterval(interval); // cleanup on component unmount
  });

  return <Container>{time()}</Container>;
};
