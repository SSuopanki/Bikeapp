import styled from "@emotion/styled";
import { UploadForm } from "../Components/UploadForm";
import { useJourneysQuery } from "../Hooks/useJourneysQuery";
import { useStationsQuery } from "../Hooks/useStationsQuery";
import { TJourney } from "../types";
import { useState } from "react";
import { JourneyView } from "./JourneyView";

export const JourneysView = () => {
  const [formOpen, setFormOpen] = useState(false);

  const { data, isLoading, isError } = useJourneysQuery();
  const {
    data: stationData,
    isError: stationError,
    isLoading: stationLoading,
  } = useStationsQuery();
  const [journey, setJourney] = useState<TJourney | undefined>(undefined);

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
            // console.log(data);
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
      </div>
      <FormDiv>
        {formOpen ? (
          <UploadForm data={stationData} setFormOpen={setFormOpen} />
        ) : (
          <AddButton children="Add new journey" onClick={addButtonOnClick} />
        )}
      </FormDiv>
      {journey && <JourneyView journey={journey} setJourney={setJourney} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const ListContainer = styled.div`
  border: 1px solid black;
  max-height: 50rem;
  overflow-y: auto;
  width: 55rem;
`;

const ListItem = styled.div`
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

const ListHead = styled.div`
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

const FormDiv = styled.div`
  margin-left: 1rem;
`;

const AddButton = styled.button`
  height: 3rem;
  :hover {
    background-color: aliceblue;
  }
`;
