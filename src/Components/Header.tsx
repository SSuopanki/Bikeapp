import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <Title>Helsinki city bike app</Title>
      <HeaderDiv>
        <Heading to="Journeys">Journeys</Heading>
        <Heading to="Stations">Stations</Heading>
      </HeaderDiv>
    </>
  );
};

const HeaderDiv = styled.div`
  display: flex;
`;

const Heading = styled(Link)`
  width: 100px;
  font-size: 30px;
  text-decoration: none;
  margin-left: 2rem;
  &:active {
    color: "red";
  }
  &:hover {
    color: "pink";
  }
`;

const Title = styled.div`
  font-size: 2rem;
  color: #4b49a1;
`;
