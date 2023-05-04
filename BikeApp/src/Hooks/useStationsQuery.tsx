import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TStations } from "../types";

export const useStationsQuery = () =>
  useQuery<Array<TStations>>({
    queryKey: ["stations"],
    queryFn: async () =>
      await axios
        .get("https://localhost:7076/api/Stations")
        .then((res) => res.data)
        .catch((err) => err),
  });
