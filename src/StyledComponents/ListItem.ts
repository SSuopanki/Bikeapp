import styled from "@emotion/styled";

export const ListItem = styled.div`
  display: flex;
  padding: 0.5rem 0 0.5rem 1rem;
  border-bottom: 1px solid black;

  :hover {
    background-color: #d0f7f7;
  }
  & > * {
    width: 12rem;
  }
`;
