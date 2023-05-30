import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TJourney } from "../types";

export const useJourneysQuery = () =>
  useQuery<Array<TJourney>>({
    queryKey: ["journeys"],
    queryFn: async () =>
      await axios
        .get("https://localhost:7076/api/Journeys")
        .then((res) => res.data)
        .catch((err) => err),
  });
