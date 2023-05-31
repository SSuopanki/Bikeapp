import { TStationWithNums } from "../types";

interface TProps {
  station: TStationWithNums;
  setStation: Function;
}
export const StationView = (props: TProps) => {
  const { station, setStation } = props;

  if (!station) {
    return <div>No station</div>;
  }

  const closeStationView = () => {
    setStation(undefined);
  };

  const {
    osoite,
    nimi,
    departureNum,
    returnNum,
    averageDistanceEnd,
    averageDistanceStart,
  } = station;

  return (
    <div>
      <div>Station Information</div>
      <div>
        <div>Name of station: {nimi}</div>
        <div>Station address: {osoite}</div>
        <div>Departuring journey count: {departureNum}</div>
        <div>Returning journey count: {returnNum}</div>
        <div>
          Average of journeys starting from this station:
          {Number(averageDistanceStart)}
        </div>
        <div>
          Average of journeys ending to this station:
          {Number(averageDistanceEnd)}
        </div>
      </div>

      <button children="close" onClick={closeStationView} />
    </div>
  );
};
