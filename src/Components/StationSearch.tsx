import styled from "@emotion/styled";
import { ListItem } from "../StyledComponents";
import { TStation } from "../types";

interface TProps {
  data: Array<TStation>;
  searchQuery: string;
  stationOnClick: Function;
}

export const StationSearch = (props: TProps) => {
  const { data, searchQuery, stationOnClick } = props;

  const searchedData = data.filter((value) =>
    value.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  if (searchedData.length === 0) {
    return <div>nothing here</div>;
  }
  return (
    <div>
      {searchedData.map((value) => {
        return (
          <StyledListItem
            onClick={() => stationOnClick(value.id)}
            key={value.id}
          >
            <div>{value.adress}</div>
            <div>{value.osoite}</div>
            <div>{value.name}</div>
            <div>{value.namn}</div>
            <div>{value.nimi}</div>
            <div>{value.kapasiteet}</div>
          </StyledListItem>
        );
      })}
    </div>
  );
};

const StyledListItem = styled(ListItem)`
  & > * {
    width: 13rem;
  }
`;
