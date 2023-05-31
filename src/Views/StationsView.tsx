import { useState } from "react";
import { useStationsQuery } from "../Hooks/useStationsQuery";
import { TStation, TStationWithNums } from "../types";
import styled from "@emotion/styled";
import { UploadStationForm } from "../Components/UploadStationForm";
import {
  AddButton,
  ListContainer,
  ListHead,
  Container,
} from "../StyledComponents";
import { StationView } from "../Components/StationView";
import { useJourneysQuery } from "../Hooks/useJourneysQuery";
import { StationSearch } from "../Components/StationSearch";

export const StationsView = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [station, setStation] = useState<TStationWithNums | undefined>(
    undefined
  );

  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useStationsQuery();
  const {
    data: journeys,
    isLoading: journeysIsLoading,
    isError: journeysIsError,
  } = useJourneysQuery();

  if (!data || !journeys) {
    return null;
  } else if (isLoading || journeysIsLoading) {
    return <div>loading...</div>;
  } else if (isError || journeysIsError) {
    return <div>"error"</div>;
  }

  const stationOnClick = (id: number) => {
    setFormOpen(false);
    const station: TStation | undefined = data.find(
      (station) => station.id === id
    );

    if (!station) {
      return;
    }
    //Find journeys that start from and end to clicked station
    const departJourneys = journeys.filter(
      (journey) => journey.departureStationId === station.id
    );

    const returnJourneys = journeys.filter(
      (journey) => journey.returnStationId === station.id
    );

    /*Calculate The average distance of a journey starting from the station
     *and ending to the station
     */
    var totalDistanceStart = 0;
    var totalDistanceEnd = 0;
    var journeyCountStart = 0;
    var journeyCountEnd = 0;

    departJourneys.forEach((value) => {
      journeyCountStart = journeyCountStart + 1;
      totalDistanceStart = totalDistanceStart + value.duration;
    });
    var averageDistanceStart = "0";
    if (totalDistanceStart !== 0 || journeyCountStart !== 0) {
      averageDistanceStart = (totalDistanceStart / journeyCountStart).toFixed(
        2
      );
    }

    returnJourneys.forEach((value) => {
      journeyCountEnd = journeyCountEnd + 1;
      totalDistanceEnd = totalDistanceEnd + value.duration;
    });
    var averageDistanceEnd = "0";

    if (totalDistanceEnd !== 0 || journeyCountEnd !== 0) {
      averageDistanceEnd = (totalDistanceEnd / journeyCountEnd).toFixed(2);
    }

    const departureNum = departJourneys.length;
    const returnNum = returnJourneys.length;
    const stationWithNums = {
      ...station,
      departureNum,
      returnNum,
      averageDistanceStart,
      averageDistanceEnd,
    };
    setStation(stationWithNums);
  };

  const addButtonOnClick = () => {
    setFormOpen(true);
    setStation(undefined);
  };

  return (
    <Container>
      <div>
        <StyledListHead>
          <div>Adress</div>
          <div>Osoite</div>
          <div>Name</div>
          <div>Namn</div>
          <div>Nimi</div>
          <div>Kapasiteet</div>
        </StyledListHead>
        <StyledListContainer>
          <StationSearch
            data={data}
            searchQuery={searchQuery}
            stationOnClick={stationOnClick}
          />
        </StyledListContainer>
        <FormDiv>
          {formOpen ? (
            <UploadStationForm setFormOpen={setFormOpen} />
          ) : (
            <SearchDiv>
              <AddButton
                children="Add new station"
                onClick={addButtonOnClick}
                placeholder="Search"
              />
              <input onChange={(event) => setSearchQuery(event.target.value)} />
            </SearchDiv>
          )}
        </FormDiv>

        {station && <StationView station={station} setStation={setStation} />}
      </div>
    </Container>
  );
};

const StyledListContainer = styled(ListContainer)`
  width: 77rem;
`;

const StyledListHead = styled(ListHead)`
  width: 75rem;
  & > * {
    width: 13rem;
  }
`;

const FormDiv = styled.div`
  margin-top: 1rem;
  margin-left: 1rem;
`;

const SearchDiv = styled.div`
  & > * {
    margin: 1rem;
  }
`;
