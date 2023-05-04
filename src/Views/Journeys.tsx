import { useJourneysQuery } from "../Hooks/useJourneysQuery";

export const Journeys = () => {
  const { data, isLoading, isError } = useJourneysQuery();

  return (
    <div>
      <div>list of journeys</div>
    </div>
  );
};
