import { useStationsQuery } from "../Hooks/useStationsQuery";

export const StationsView = () => {
  const { data, isLoading, isError } = useStationsQuery();

  if (!data) {
    return null;
  } else if (isLoading) {
    return <div>loading...</div>;
  } else if (isError) {
    return <div>"error"</div>;
  }

  return (
    <div>
      <div>list of stations</div>
      <div>Add new journey</div>
      <div>list heads</div>
      <div>
        {data.map((value) => {
          return (
            <div key={value.id}>
              <div>{value.adress}</div>
              <div>{value.osoite}</div>
              <div>{value.kapasiteet}</div>
              <div>{value.kaupunki}</div>
              <div>{value.stad}</div>
              <div>{value.name}</div>
              <div>{value.namn}</div>
              <div>{value.nimi}</div>
              <div>{value.operaattor}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
