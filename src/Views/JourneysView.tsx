import styled from "@emotion/styled";
import { UploadJourneyForm } from "../Components/UploadJourneyForm";
import { useJourneysQuery } from "../Hooks/useJourneysQuery";
import { useStationsQuery } from "../Hooks/useStationsQuery";
import { TJourney } from "../types";
import { useState } from "react";
import { JourneyView } from "../Components/JourneyView";
import { Container } from "../StyledComponents/Container";
import { ListContainer } from "../StyledComponents/ListContainer";
import { ListItem } from "../StyledComponents/ListItem";
import { ListHead } from "../StyledComponents/ListHead";
import { AddButton } from "../StyledComponents/AddButton";

export const JourneysView = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [journey, setJourney] = useState<TJourney | undefined>(undefined);

  const { data, isLoading, isError } = useJourneysQuery();
  const {
    data: stationData,
    isError: stationError,
    isLoading: stationLoading,
  } = useStationsQuery();

  if (!data || !stationData) {
    return null;
  } else if (isError || stationError) {
    return <div>error</div>;
  } else if (isLoading || stationLoading) {
    return <div>loading...</div>;
  }

  const meterToKm = (distance: number) => {
    const km = (distance / 1000).toFixed(2);
    return km;
  };

  const durationToMinutes = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    return minutes;
  };

  const addButtonOnClick = () => {
    setFormOpen(true);
    setJourney(undefined);
  };

  const journeyOnClick = (id: string) => {
    const journey = data.find((journey) => journey.journeyId === id);
    setJourney(journey);
    setFormOpen(false);
  };

  return (
    <Container>
      <div>
        <ListHead>
          <div>Departure Station</div>
          <div>Return Station</div>
          <div>Distance(km)</div>
          <div>Duration(mins)</div>
        </ListHead>
        <ListContainer>
          {data.map((value: TJourney) => {
            return (
              <ListItem
                onClick={() => journeyOnClick(value.journeyId)}
                key={value.journeyId}
              >
                <div>{value.departureStationName}</div>
                <div>{value.returnStationName}</div>
                <div>{meterToKm(value.distance)}</div>
                <div>{durationToMinutes(value.duration)}</div>
              </ListItem>
            );
          })}
        </ListContainer>
        <FormDiv>
          {formOpen ? (
            <UploadJourneyForm data={stationData} setFormOpen={setFormOpen} />
          ) : (
            <AddButton children="Add new journey" onClick={addButtonOnClick} />
          )}
        </FormDiv>
        {journey && <JourneyView journey={journey} setJourney={setJourney} />}
      </div>
    </Container>
  );
};

const FormDiv = styled.div`
  margin-left: 1rem;
`;
