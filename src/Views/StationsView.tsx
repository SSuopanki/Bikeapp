import { useState } from "react";
import { useStationsQuery } from "../Hooks/useStationsQuery";
import { TStation, TStationWithNums } from "../types";
import styled from "@emotion/styled";
import { UploadStationForm } from "../Components/UploadStationForm";
import {
  ListItem,
  AddButton,
  ListContainer,
  ListHead,
  Container,
} from "../StyledComponents";
import { StationView } from "../Components/StationView";
import { useJourneysQuery } from "../Hooks/useJourneysQuery";

export const StationsView = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [station, setStation] = useState<TStationWithNums | undefined>(
    undefined
  );

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
    const station: TStation = data.find((station) => station.id === id);

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
          {data.map((value) => {
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
        </StyledListContainer>
        <FormDiv>
          {formOpen ? (
            <UploadStationForm setFormOpen={setFormOpen} />
          ) : (
            <AddButton children="Add new station" onClick={addButtonOnClick} />
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

const StyledListItem = styled(ListItem)`
  & > * {
    width: 13rem;
  }
`;

const FormDiv = styled.div`
  margin-top: 1rem;
  margin-left: 1rem;
`;

const StationDiv = styled.div`
  margin-top: 1rem;
`;
