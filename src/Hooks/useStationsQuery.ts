import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TStation } from "../types";
import { stationUrl } from "../ApiUrls";

export const useStationsQuery = () =>
  useQuery<Array<TStation>>({
    queryKey: ["stations"],
    queryFn: async () =>
      await axios
        .get(stationUrl)
        .then((res) => res.data)
        .catch((err) => err),
  });
