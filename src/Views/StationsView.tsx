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
            <div key={value.Id}>
              <div>{value.Adress}</div>
              <div>{value.Osoite}</div>
              <div>{value.Kapasiteet}</div>
              <div>{value.Kaupunki}</div>
              <div>{value.Stad}</div>
              <div>{value.Name}</div>
              <div>{value.Namn}</div>
              <div>{value.Nimi}</div>
              <div>{value.Operaattor}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
