import { useJourneysQuery } from "../Hooks/useJourneysQuery";

export const JourneysView = () => {
  const { data, isLoading, isError } = useJourneysQuery();

  if (!data) {
    return null;
  } else if (isError) {
    return <div>error</div>;
  } else if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>list of journeys</div>
      <div>Add new journey</div>
      <div>list heads</div>
      <div>
        {data.map((value) => {
          console.log(data);
          return (
            <div key={value.journeyId}>
              <div>{value.returnDate.toString()}</div>
              <div>{value.departureDate.toString()}</div>
              <div>{value.departureStationName}</div>
              <div>{value.returnStationName}</div>
              <div>{value.distance}(m)</div>
              <div>{value.duration}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
