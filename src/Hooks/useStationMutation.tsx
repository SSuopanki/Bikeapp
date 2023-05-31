import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TStation } from "../types";
import { stationUrl } from "../ApiUrls";

const postStation = async (data: TStation) => {
  const response = await axios
    .post(stationUrl, data)
    .then((res) => res.data)
    .catch((err) => err);

  return response.data;
};

export const useStationMutation = () => {
  const client = useQueryClient();
  const { mutate } = useMutation(postStation, {
    onSuccess: () => {
      client.invalidateQueries(["stations"]);
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });

  return { mutate };
};