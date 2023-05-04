import { useStationsQuery } from "../Hooks/useStationsQuery";

export const Stations = () => {
  const { data, isLoading, isError } = useStationsQuery();

  return (
    <div>
      <div>list of stations</div>
    </div>
  );
};
