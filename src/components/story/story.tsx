import styled from "styled-components";
import useStore from "../../store";

export default function Story() {
  const story = useStore(s => s.story);

  return <Container>
    <Inner>
    {story.entries
      .map((entry, i) => ({index: i, entry: entry}))
      .reverse()
      .map(({index, entry}) => 
        <Entry key={index} isImportant={entry.isImportant}>{entry.text}</Entry>
      )}
    </Inner>
  </Container>;
}

const Container = styled.div`
  width: 180px;
  height: 100%;
  text-align: left;
  background-color: black;
  color: grey;
`;

const Inner = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Entry = styled.div<{isImportant: boolean}>`
  ${p => p.isImportant ? `
    color: #999;
    font-weight: bold;
  ` : null}
`;