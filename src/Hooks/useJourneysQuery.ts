import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TJourney } from "../types";
import { journeyUrl } from "../ApiUrls";

export const useJourneysQuery = () =>
  useQuery<Array<TJourney>>({
    queryKey: ["journeys"],
    queryFn: async () =>
      await axios
        .get(journeyUrl)
        .then((res) => res.data)
        .catch((err) => err),
  });
