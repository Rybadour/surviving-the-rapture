import styled from "styled-components";
import useStore from "../../store";

export default function Story() {
  const story = useStore(s => s.story);

  return <Container>
    {story.entries
      .map((entry, i) => [i, entry])
      .reverse()
      .map(([i, entry]) => 
        <div key={i}>{entry}</div>
      )}
  </Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 100%;
  text-align: left;
  background-color: black;
  color: grey;
  gap: 5px;
  padding: 10px 5px 10px 10px;
`;