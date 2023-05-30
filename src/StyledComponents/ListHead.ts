import styled from "@emotion/styled";

export const ListHead = styled.div`
  border: 1px solid black;
  background-color: aqua;
  width: 53rem;
  display: flex;
  padding: 0.4rem 1rem;
  border-bottom: 2px solid blue;
  & > * {
    width: 12rem;
  }
`;
