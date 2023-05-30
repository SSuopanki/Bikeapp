import { format, parseISO } from "date-fns";
import { TJourney } from "../types";

interface TProps {
  journey?: TJourney;
  setJourney: Function;
}

export const JourneyView = ({ journey, setJourney }: TProps) => {
  if (!journey) {
    return <div>No journey</div>;
  }
  const {
    departureDate,
    returnDate,
    departureStationName,
    distance,
    duration,
    returnStationName,
  } = journey;

  const closeJourneyView = () => {
    setJourney(undefined);
  };

  const dateAndTime = (dateTime: Date) => {
    const date = format(new Date(dateTime), " dd.MM.yyyy");
    const time = format(new Date(dateTime), "HH:mm");
    const string = date + " " + time;
    return string;
  };

  //Return duration in minutes and seconds
  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;

    const string = minutes + " minutes " + seconds + " seconds ";
    return string;
  };

  return (
    <div>
      <div>Journey Information</div>
      <div>
        This Journey departed from {departureStationName} on
        {dateAndTime(departureDate)} and returned to {returnStationName} on
        {dateAndTime(returnDate)}. Journey lasted {formatDuration(duration)}
        and distance travelled was {distance} meters.
      </div>

      <button children="close" onClick={closeJourneyView} />
    </div>
  );
};
